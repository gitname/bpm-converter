import React from 'react';
import PropTypes from 'prop-types';
import {Header, Icon, Input, Label, Segment} from 'semantic-ui-react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import './CopyableField.css';

const CopyableField = (props) => {
  const {
    accentColor,
    copiedFlags,
    header,
    placeholder,
    subHeader,
    fieldValues,
    updateFieldValue,
    raiseCopiedFlag,
    fieldName
  } = props;

  const fieldValue = fieldValues[fieldName];

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
        icon={copiedFlags[fieldName] ? <Icon name="check" color={accentColor}/> : null}
        onChange={(event, data) => updateFieldValue(fieldName, data.value)}
        placeholder={placeholder}
        size="large"
        value={fieldValue}
        type="text"
      />
      <CopyToClipboard onCopy={(text, result) => result && text !== "" && raiseCopiedFlag(fieldName, text)} text={fieldValue}>
        <Label as="a" attached="top right" color={accentColor} className="CopyableField__Corner-Label">
          <Icon name="copy"/>
          Copy
        </Label>
      </CopyToClipboard>
    </Segment>
  )
};

CopyableField.propTypes = {
  accentColor: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  subHeader: PropTypes.string.isRequired,
  copiedFlags: PropTypes.object.isRequired,
  fieldValues: PropTypes.object.isRequired,
  updateFieldValue: PropTypes.func.isRequired,
  raiseCopiedFlag: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired
};

export default CopyableField;