// A regular expression representing a floating point number in one of several formats.
const floatRegExp = /(?:^\d+$)|(?:^\.\d+$)|(?:^\d+\.$)|(?:^\d+\.\d+$)/;

const MILLISECONDS_PER_MINUTE = 60 * 1000;

const initialTempoStr = "120";

export const _convertBeatDurationStrIntoTempoStr = (beatDurationStr) => {
  return (beatDurationStr === "" || beatDurationStr === ".") ? "" : (MILLISECONDS_PER_MINUTE / beatDurationStr).toString();
};

export const _convertTempoStrIntoBeatDurationStr = (tempoStr) => {
  return (tempoStr === "" || tempoStr === ".") ? "" : (MILLISECONDS_PER_MINUTE / tempoStr).toString()
};

export const _validateTempoStr = (tempoStr) => {
  return (tempoStr === "" || tempoStr === "." || floatRegExp.test(tempoStr));
};

export const _validateBeatDurationStr = (beatDurationStr) => {
  return (beatDurationStr === "" || beatDurationStr === "." || floatRegExp.test(beatDurationStr));
};

export const _initialFieldValues = {
  tempoStr: initialTempoStr,
  beatDurationStr: _convertTempoStrIntoBeatDurationStr(initialTempoStr)
};

const fieldValuesReducer = (fieldValues = _initialFieldValues, action) => {
  let nextFieldValues;

  switch (action.type) {
    case "UPDATE_FIELD_VALUE":
      const {fieldName, fieldValue} = action.payload;
      if (fieldName === "tempoStr" && _validateTempoStr(fieldValue)) {
        nextFieldValues = {
          tempoStr: fieldValue,
          beatDurationStr: _convertTempoStrIntoBeatDurationStr(fieldValue)
        };
      } else if (fieldName === "beatDurationStr" && _validateBeatDurationStr(fieldValue)) {
        nextFieldValues = {
          tempoStr: _convertBeatDurationStrIntoTempoStr(fieldValue),
          beatDurationStr: fieldValue
        };
      } else {
        nextFieldValues = fieldValues;
      }
      break;
    default:
      nextFieldValues = fieldValues;
      break;
  }

  return nextFieldValues;
};

export default fieldValuesReducer;