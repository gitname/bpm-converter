import {combineReducers} from 'redux';
import fieldValuesReducer from './fieldValuesReducer';
import copiedFlagsReducer from './copiedFlagsReducer';

const rootReducer = combineReducers({
  copiedFlags: copiedFlagsReducer,
  fieldValues: fieldValuesReducer
});

export default rootReducer;