import {connect} from 'react-redux';

import {raiseCopiedFlag, updateFieldValue} from '../action-creators';
import CopyableField from '../components/CopyableField';

const mapStateToProps = (state) => ({
  copiedFlags: state.copiedFlags,
  fieldValues: state.fieldValues,
});

const mapDispatchToProps = {
  raiseCopiedFlag,
  updateFieldValue
};

const CopyableFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CopyableField);

export default CopyableFieldContainer;