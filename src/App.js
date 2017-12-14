import React, {Component} from 'react';
import {Button, Container, Form, Header, Icon, Input, Segment} from 'semantic-ui-react';
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
      copied: false,
      millisecondsPerBeat: App.calculateMillisecondsPerBeat(initialBeatsPerMinute)
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
      copied: false,
      millisecondsPerBeat: App.calculateMillisecondsPerBeat(data.value)
    });
  }

  onMspbChange(event, data) {
    this.setState({
      beatsPerMinute: App.calculateBeatsPerMinute(data.value),
      copied: false,
      millisecondsPerBeat: data.value
    });
  }

  copyHandler() {
    this.setState({
      copied: true
    });
  };

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
            Enter the <strong>beats per minute</strong> or the <strong>milliseconds per beat</strong>.
            The other field will update in real-time to show an equivalent value, which you can
            <strong>copy</strong> to your clipboard.
          </p>

          <Form>
            <Form.Group widths="equal">
              <Form.Field
                action={
                  <CopyToClipboard onCopy={this.copyHandler.bind(this)} text={this.state.beatsPerMinute}>
                    <Button color="teal" icon labelPosition="right"><Icon name="copy"/> Copy</Button>
                  </CopyToClipboard>
                }
                control={Input}
                label="Beats per minute"
                onChange={this.onBpmChange.bind(this)}
                placeholder="Beats per minute"
                size="huge"
                value={this.state.beatsPerMinute}
              />
              <Form.Field
                action={
                  <CopyToClipboard onCopy={this.copyHandler.bind(this)} text={this.state.millisecondsPerBeat}>
                    <Button color="purple" icon labelPosition="right"><Icon name="copy"/> Copy</Button>
                  </CopyToClipboard>
                }
                control={Input}
                label="Milliseconds per beat"
                onChange={this.onMspbChange.bind(this)}
                placeholder="Milliseconds per beat"
                size="huge"
                value={this.state.millisecondsPerBeat}
              />
            </Form.Group>
          </Form>

          {this.state.copied ? <span style={{color: "red"}}>Copied.</span> : null}

        </Container>
      </Segment>
    );
  }
}

export default App;
