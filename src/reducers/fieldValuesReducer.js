// A regular expression representing a floating-point number in one of several formats.
const floatRegExp = /(?:^\d+$)|(?:^\.\d+$)|(?:^\d+\.$)|(?:^\d+\.\d+$)/;

const MILLISECONDS_PER_MINUTE = 60 * 1000;

const initialTempoStr = "120";

/**
 * Rounds the incoming floating-point number to the specified number of decimal places, then trims off any trailing 0s.
 * Then, if a trailing period exists, trims that off also. Returns the resulting floating-point number.
 *
 * If the incoming floating-point number is 1e+21 or greater, returns null.
 *
 * @param inputFloat
 * @param numDecimalPlaces
 * @return {*}
 * @private
 */
export const _roundAndTrimFloat = (inputFloat, numDecimalPlaces) => {
  return (inputFloat < 1e+21) ? parseFloat(inputFloat.toFixed(numDecimalPlaces)) : null;
};

/**
 * Returns a tempo string equivalent to the beat duration string passed in. If the beat duration string is an empty string,
 * a period, or--when parsed as a float--is equal to 0; returns an empty string.
 *
 * @param beatDurationStr
 * @return {string}
 * @private
 */
export const _convertBeatDurationStrIntoTempoStr = (beatDurationStr) => {
  return (beatDurationStr === "" || beatDurationStr === "." || parseFloat(beatDurationStr) === 0) ? "" : _roundAndTrimFloat((MILLISECONDS_PER_MINUTE / parseFloat(beatDurationStr)), 2).toString();
};

/**
 * Returns a beat duration string equivalent to the tempo string passed in. If the tempo string is an empty string,
 * a period, or--when parsed as a float--is equal to 0; returns an empty string.
 *
 * @param tempoStr
 * @return {string}
 * @private
 */
export const _convertTempoStrIntoBeatDurationStr = (tempoStr) => {
  return (tempoStr === "" || tempoStr === "." || parseFloat(tempoStr) === 0) ? "" : _roundAndTrimFloat((MILLISECONDS_PER_MINUTE / parseFloat(tempoStr)), 2).toString();
};

/**
 * Returns true if the string passed in is an empty string, a period, or a floating-point number in one of several formats.
 *
 * @param tempoStr
 * @return {boolean}
 * @private
 */
export const _validateTempoStr = (tempoStr) => {
  return (tempoStr === "" || tempoStr === "." || floatRegExp.test(tempoStr));
};

/**
 * Returns true if the string passed in is an empty string, a period, or a floating-point number in one of several formats.
 *
 * @param beatDurationStr
 * @return {boolean}
 * @private
 */
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