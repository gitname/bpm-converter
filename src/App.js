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

    const initialBeatsPerMinute = 72;

    this.state = {
      beatsPerMinute: initialBeatsPerMinute,
      millisecondsPerBeat: App.calculateMillisecondsPerBeat(initialBeatsPerMinute),
      bpmCopied: false,
      mspbCopied: false
    };
  }

  // TODO: Consider rounding the result to the nearest integer, and displaying a label that says whether we rounded it.

  static calculateMillisecondsPerBeat(beatsPerMinute) {
    return MILLISECONDS_PER_MINUTE / beatsPerMinute;
  }

  static calculateBeatsPerMinute(millisecondsPerBeat) {
    return MILLISECONDS_PER_MINUTE / millisecondsPerBeat;
  }

  // TODO: Validate input data (e.g. accept positive integers only)

  onBpmChange(event, data) {
    this.setState({
      beatsPerMinute: data.value,
      bpmCopied: false,
      mspbCopied: false,
      millisecondsPerBeat: App.calculateMillisecondsPerBeat(data.value)
    });
  }

  onMspbChange(event, data) {
    this.setState({
      beatsPerMinute: App.calculateBeatsPerMinute(data.value),
      millisecondsPerBeat: data.value,
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
                  onChange={this.onBpmChange.bind(this)}
                  placeholder="Milliseconds per beat"
                  size="large"
                  value={this.state.millisecondsPerBeat}
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
