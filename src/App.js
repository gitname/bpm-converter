import React, {Component} from 'react';
import {Container, Grid, Header, Icon, Input, Label, Segment} from 'semantic-ui-react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import './App.css';

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;

class App extends Component {
  constructor(props) {
    super(props);

    // A regular expression representing a floating point number in one of several formats.
    this.floatRegExp = /(?:^\d+$)|(?:^\.\d+$)|(?:^\d+\.$)|(?:^\d+\.\d+$)/;

    // The number to which the BPM input value will be initialized.
    const initialBeatsPerMinute = 120;

    this.state = {
      beatsPerMinute: initialBeatsPerMinute,
      millisecondsPerBeat: App.calculateMillisecondsPerBeat(initialBeatsPerMinute),
      bpmCopied: false,
      mspbCopied: false
    };
  }

  static calculateMillisecondsPerBeat(beatsPerMinute, numDecimalPlaces) {
    let millisecondsPerBeat = MILLISECONDS_PER_MINUTE / beatsPerMinute;
    if (numDecimalPlaces != null) {
      // Round the Number (producing a String), then convert the String back into a Number (eliminating trailing 0s).
      millisecondsPerBeat = parseFloat(millisecondsPerBeat.toFixed(numDecimalPlaces));
    }
    return millisecondsPerBeat;
  }

  static calculateBeatsPerMinute(millisecondsPerBeat, numDecimalPlaces) {
    let beatsPerMinute = MILLISECONDS_PER_MINUTE / millisecondsPerBeat;
    if (numDecimalPlaces != null) {
      // Round the Number (producing a String), then convert the String back into a Number (eliminating trailing 0s).
      beatsPerMinute = parseFloat(beatsPerMinute.toFixed(numDecimalPlaces));
    }
    return beatsPerMinute;
  }

  onBpmChange(event, data) {
    const numBeatsStr = data.value;

    if (this.floatRegExp.test(numBeatsStr)) {
      this.setState({
        beatsPerMinute: numBeatsStr,
        millisecondsPerBeat: App.calculateMillisecondsPerBeat(Number.parseFloat(numBeatsStr), 2)
      });
    } else if (numBeatsStr === "" || numBeatsStr === ".") {
      this.setState({
        beatsPerMinute: numBeatsStr,
        millisecondsPerBeat: ""
      });
    } else {
      // TODO: Display an error message or instructions.
    }

    this.setState({
      bpmCopied: false,
      mspbCopied: false
    });
  }

  onMspbChange(event, data) {
    const millisecondsStr = data.value;

    if (this.floatRegExp.test(millisecondsStr)) {
      this.setState({
        beatsPerMinute: App.calculateBeatsPerMinute(Number.parseFloat(millisecondsStr), 2),
        millisecondsPerBeat: millisecondsStr
      });
    } else if (millisecondsStr === "" || millisecondsStr === ".") {
      this.setState({
        beatsPerMinute: "",
        millisecondsPerBeat: millisecondsStr
      });
    } else {
      // TODO: Display an error message or instructions.
    }

    this.setState({
      bpmCopied: false,
      mspbCopied: false
    });
  }

  onCopyBpm(text, result) {
    if (result === true) {
      console.info(`Copied ${text} to clipboard.`);
      this.setState({
        bpmCopied: true,
        mspbCopied: false
      });
    }
  }

  onCopyMspb(text, result) {
    if (result === true) {
      console.info(`Copied ${text} to clipboard.`);
      this.setState({
        bpmCopied: false,
        mspbCopied: true
      });
    }
  }

  render() {
    return (
      <Segment basic>
        <Container>

          <Header as="h1" textAlign="center">
            <Icon name="music" color="teal"/>
            <Header.Content>
              BPM Converter
            </Header.Content>
            <Icon name="clock" color="purple"/>
          </Header>

          <p>
            Enter either a tempo or a beat interval length. The other field will automatically show its corresponding
            value, which you can copy to your clipboard.
          </p>

          <Grid columns={2} stackable>
            <Grid.Column>
              <Segment color="teal" padded>
                <Header>
                  Tempo
                  <Header.Subheader>
                    Beats per minute
                  </Header.Subheader>
                </Header>
                <Input
                  fluid
                  icon={this.state.bpmCopied ? <Icon name="check" color="teal"/> : null}
                  onChange={this.onBpmChange.bind(this)}
                  placeholder="Beats per minute"
                  size="large"
                  value={this.state.beatsPerMinute}
                  type="number"
                />
                <CopyToClipboard onCopy={this.onCopyBpm.bind(this)} text={this.state.beatsPerMinute}>
                  <Label as="a" attached="top right" color="teal" className="App__Segment-Label">
                    <Icon name="copy"/>
                    Copy
                  </Label>
                </CopyToClipboard>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment color="purple" padded>
                <Header>
                  Beat Interval Length
                  <Header.Subheader>
                    Milliseconds per beat
                  </Header.Subheader>
                </Header>
                <Input
                  fluid
                  icon={this.state.mspbCopied ? <Icon name="check" color="purple"/> : null}
                  onChange={this.onMspbChange.bind(this)}
                  placeholder="Milliseconds per beat"
                  size="large"
                  value={this.state.millisecondsPerBeat}
                  type="number"
                />
                <CopyToClipboard onCopy={this.onCopyMspb.bind(this)} text={this.state.millisecondsPerBeat}>
                  <Label as="a" attached="top right" color="purple" className="App__Segment-Label">
                    <Icon name="copy"/>
                    Copy
                  </Label>
                </CopyToClipboard>
              </Segment>
            </Grid.Column>
          </Grid>

        </Container>
      </Segment>
    );
  }
}

export default App;
