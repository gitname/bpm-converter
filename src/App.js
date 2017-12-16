import React, {Component} from 'react';
import {Container, Grid, Header, Segment} from 'semantic-ui-react';

import InputSegment from './InputSegment';

import './App.css';

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;

class App extends Component {
  constructor(props) {
    super(props);

    // A regular expression representing a floating point number in one of several formats.
    this.floatRegExp = /(?:^\d+$)|(?:^\.\d+$)|(?:^\d+\.$)|(?:^\d+\.\d+$)/;

    // The number to which the tempo will be initialized.
    const initialTempo = 120;

    this.state = {

      // Floating-point number representing the tempo (in beats per minute).
      tempo: initialTempo,

      // Floating-point number representing the duration of a beat (in milliseconds).
      beatDuration: App.calculateBeatDuration(initialTempo),

      // Boolean representing whether the tempo has been copied to the clipboard.
      tempoCopied: false,

      // Boolean representing whether the beat duration has been copied to the clipboard.
      beatDurationCopied: false
    };
  }

  /**
   * Calculates the duration of one beat, based on the tempo passed in.
   * If a precision is passed in, rounds the result to that number of decimal places, then eliminates trailing 0s.
   *
   * @param tempo - the tempo (in beats per minute)
   * @param precision - the number of decimal places to which you want the result rounded
   * @return {number} - the duration of one beat (in milliseconds)
   */
  static calculateBeatDuration(tempo, precision) {
    // Calculate the beat duration (in milliseconds).
    let beatDuration = MILLISECONDS_PER_MINUTE / tempo;

    // If a precision is defined, round the result to that number of decimal places (eliminating trailing 0s).
    if (precision != null) {
      beatDuration = parseFloat(beatDuration.toFixed(precision));
    }
    return beatDuration;
  }

  /**
   * Calculates the tempo, based on the beat duration passed in.
   * If a precision is passed in, rounds the results to that number of decimal places, then eliminates trailing 0s.
   *
   * @param beatDuration - the duration of one beat (in milliseconds)
   * @param precision - the number of decimal places to which you want the result rounded
   * @return {number} - the tempo (in beats per minute)
   */
  static calculateTempo(beatDuration, precision) {
    // Calculate the tempo (in beats per minute).
    let tempo = MILLISECONDS_PER_MINUTE / beatDuration;

    // If a precision is defined, round the result to that number of decimal places (eliminating trailing 0s).
    if (precision != null) {
      tempo = parseFloat(tempo.toFixed(precision));
    }
    return tempo;
  }

  /**
   * Updates the component's state with a new tempo, if that new tempo is valid.
   *
   * @param event
   * @param data
   */
  onTempoChange(event, data) {
    const submittedTempo = data.value;

    if (this.floatRegExp.test(submittedTempo)) {
      this.setState({
        tempo: submittedTempo,
        beatDuration: App.calculateBeatDuration(parseFloat(submittedTempo), 2)
      });
    } else if (submittedTempo === "" || submittedTempo === ".") {
      this.setState({
        tempo: submittedTempo,
        beatDuration: ""
      });
    } else {
      // TODO: Display an error message or instructions.
    }

    this.setState({
      tempoCopied: false,
      beatDurationCopied: false
    });
  }

  /**
   * Updates the component's state with a new beat duration, if that new beat duration is valid.
   *
   * @param event
   * @param data
   */
  onBeatDurationChange(event, data) {
    const submittedBeatDuration = data.value;

    if (this.floatRegExp.test(submittedBeatDuration)) {
      this.setState({
        tempo: App.calculateTempo(parseFloat(submittedBeatDuration), 2),
        beatDuration: submittedBeatDuration
      });
    } else if (submittedBeatDuration === "" || submittedBeatDuration === ".") {
      this.setState({
        tempo: "",
        beatDuration: submittedBeatDuration
      });
    } else {
      // TODO: Display an error message or instructions.
    }

    this.setState({
      tempoCopied: false,
      beatDurationCopied: false
    });
  }

  /**
   * Sets the "tempo copied" flag in the component's state, if the tempo was copied.
   *
   * @param text
   * @param result
   */
  onCopyTempo(text, result) {
    if (result === true) {
      console.info(`Copied ${text} to clipboard.`);
      this.setState({
        tempoCopied: true,
        beatDurationCopied: false
      });
    }
  }

  /**
   * Sets the "beat duration copied" flag in the component's state, if the beat duration was copied.
   *
   * @param text
   * @param result
   */
  onCopyBeatDuration(text, result) {
    if (result === true) {
      console.info(`Copied ${text} to clipboard.`);
      this.setState({
        tempoCopied: false,
        beatDurationCopied: true
      });
    }
  }

  render() {
    return (
      <Segment basic>
        <Container>

          <Header as="h1">
            <Header.Content>
              BPM Converter
              <Header.Subheader>
                A Beats Per Minute Converter
              </Header.Subheader>
            </Header.Content>
          </Header>

          <p>
            Enter a tempo or a beat duration.
            The other field will show an equivalent value, which you can copy to your clipboard.
          </p>

          <Grid columns={2} stackable>
            <Grid.Column>
              <InputSegment
                header={"Tempo"}
                subHeader={"Beats per minute (BPM)"}
                placeholder={"Enter a tempo"}
                accentColor={"teal"}
                changeHandler={this.onTempoChange.bind(this)}
                onCopy={this.onCopyTempo.bind(this)}
                value={this.state.tempo}
                valueCopied={this.state.tempoCopied}
              />
            </Grid.Column>

            <Grid.Column>
              <InputSegment
                header={"Beat Duration"}
                subHeader={"Milliseconds (ms)"}
                placeholder={"Enter a beat duration"}
                accentColor={"purple"}
                changeHandler={this.onBeatDurationChange.bind(this)}
                onCopy={this.onCopyBeatDuration.bind(this)}
                value={this.state.beatDuration}
                valueCopied={this.state.beatDurationCopied}
              />
            </Grid.Column>
          </Grid>

        </Container>
      </Segment>
    );
  }
}

export default App;
