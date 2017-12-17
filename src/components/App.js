import React from 'react';
import {Container, Grid, Header, Segment} from 'semantic-ui-react';

import CopyableFieldContainer from '../containers/CopyableFieldContainer';

const App = (props) => {
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
            <CopyableFieldContainer
              header={"Tempo"}
              subHeader={"Beats per minute (BPM)"}
              placeholder={"Enter a tempo"}
              accentColor={"teal"}
              fieldName={"tempoStr"}
            />
          </Grid.Column>

          <Grid.Column>
            <CopyableFieldContainer
              header={"Beat Duration"}
              subHeader={"Milliseconds (ms)"}
              placeholder={"Enter a beat duration"}
              accentColor={"purple"}
              fieldName={"beatDurationStr"}
            />
          </Grid.Column>
        </Grid>

      </Container>
    </Segment>
  );
};

export default App;
