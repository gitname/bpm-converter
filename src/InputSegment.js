import React from 'react';
import PropTypes from 'prop-types';
import {Header, Icon, Input, Label, Segment} from 'semantic-ui-react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import './InputSegment.css';

const InputSegment = (props) => {
  const {
    accentColor,
    changeHandler,
    header,
    onCopy,
    placeholder,
    subHeader,
    value,
    valueCopied
  } = props;

  return (
    <Segment color={accentColor} padded>
      <Header>
        {header}
        <Header.Subheader>
          {subHeader}
        </Header.Subheader>
      </Header>
      <Input
        fluid
        icon={valueCopied ? <Icon name="check" color={accentColor}/> : null}
        onChange={changeHandler}
        placeholder={placeholder}
        size="large"
        value={value}
        type="text"
      />
      <CopyToClipboard onCopy={onCopy} text={value}>
        <Label as="a" attached="top right" color={accentColor} className="InputSegment__Corner-Label">
          <Icon name="copy"/>
          Copy
        </Label>
      </CopyToClipboard>
    </Segment>
  )
};

InputSegment.propTypes = {
  accentColor: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  onCopy: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  subHeader: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  valueCopied: PropTypes.bool.isRequired
};

export default InputSegment;