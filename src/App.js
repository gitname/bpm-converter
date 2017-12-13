import React, { Component } from 'react';
import { Container, Form, Header, Icon, Input, Segment } from 'semantic-ui-react';

import './App.css';

class App extends Component {
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
            Enter the <strong>beats per minute</strong> or the <strong>milliseconds</strong> between each beat.
            The other field will update in real-time to show an equivalent value, which you can
            then <strong>copy</strong> to your clipboard.
          </p>

          <Form>
            <Form.Group widths="equal">
              <Form.Field
                action={{color: "teal", labelPosition: "right", icon: "copy", content: "Copy"}}
                id="form-input-control-bpm"
                control={Input}
                label="Beats per minute"
                placeholder="Beats per minute"
                size="huge"
              />
              <Form.Field
                action={{color: "purple", labelPosition: "right", icon: "copy", content: "Copy"}}
                id="form-input-control-ms"
                control={Input}
                label="Milliseconds between each beat"
                placeholder="Milliseconds between each beat"
                size="huge"
              />
            </Form.Group>
          </Form>

        </Container>
      </Segment>
    );
  }
}

export default App;
