import {
  _roundAndTrimFloat,
  _convertBeatDurationStrIntoTempoStr,
  _convertTempoStrIntoBeatDurationStr,
  _validateTempoStr,
  _validateBeatDurationStr
} from '../fieldValuesReducer';

describe('_roundAndTrimFloat', function () {

  it('converts 1e+21 to null', () => {
    expect(_roundAndTrimFloat(1e+21, 2)).toBeNull();
  });

  it('considers only the immediately-following decimal place when rounding (does not "trickle-round")', () => {
    expect(_roundAndTrimFloat(12.3449, 3)).toBe(12.345);
    expect(_roundAndTrimFloat(12.3449, 2)).toBe(12.34); // Not 12.35
  });

  it('rounds to a specified decimal place', () => {
    expect(_roundAndTrimFloat(12.344, 2)).toBe(12.34);
    expect(_roundAndTrimFloat(12.345, 2)).toBe(12.35);
  });

  it('eliminates trailing 0s', () => {
    expect(_roundAndTrimFloat(12.30, 2)).toBe(12.3);
    expect(_roundAndTrimFloat(12.300, 2)).toBe(12.3);
  });

  it('eliminates extraneous decimal point', () => {
    expect(_roundAndTrimFloat(12.0, 2)).toBe(12);
    expect(_roundAndTrimFloat(12., 2)).toBe(12);
  });

});

describe('_convertBeatDurationStrIntoTempoStr', function () {

  it('converts an empty string into an empty string', () => {
    expect(_convertBeatDurationStrIntoTempoStr("")).toEqual("");
  });

  it('converts a period into an empty string', () => {
    expect(_convertBeatDurationStrIntoTempoStr(".")).toEqual("");
  });

  it('converts various string forms of 0 into an empty string', () => {
    expect(_convertTempoStrIntoBeatDurationStr("0")).toEqual("");
    expect(_convertTempoStrIntoBeatDurationStr("0.")).toEqual("");
    expect(_convertTempoStrIntoBeatDurationStr(".0")).toEqual("");
    expect(_convertTempoStrIntoBeatDurationStr("0.0")).toEqual("");
  });

  it('converts "60" into "1000"', () => {
    expect(_convertBeatDurationStrIntoTempoStr("60")).toEqual("1000");
  });

  it('converts "100000" into "0.6"', () => {
    expect(_convertBeatDurationStrIntoTempoStr("100000")).toEqual("0.6");
  });

});

describe('_convertTempoStrIntoBeatDurationStr', function () {

  it('converts an empty string into an empty string', () => {
    expect(_convertTempoStrIntoBeatDurationStr("")).toEqual("");
  });

  it('converts a period into an empty string', () => {
    expect(_convertTempoStrIntoBeatDurationStr(".")).toEqual("");
  });

  it('converts various string forms of 0 into an empty string', () => {
    expect(_convertTempoStrIntoBeatDurationStr("0")).toEqual("");
    expect(_convertTempoStrIntoBeatDurationStr("0.")).toEqual("");
    expect(_convertTempoStrIntoBeatDurationStr(".0")).toEqual("");
    expect(_convertTempoStrIntoBeatDurationStr("0.0")).toEqual("");
  });

  it('converts "60" into "1000"', () => {
    expect(_convertTempoStrIntoBeatDurationStr("60")).toEqual("1000");
  });

  it('converts "100000" into "0.6"', () => {
    expect(_convertTempoStrIntoBeatDurationStr("100000")).toEqual("0.6");
  });

});

describe('_validateTempoStr', function () {

  it('reports an empty string as valid', () => {
    expect(_validateTempoStr("")).toBe(true);
  });

  it('reports a period as valid', () => {
    expect(_validateTempoStr(".")).toBe(true);
  });

  it('reports 1.23 as valid', () => {
    expect(_validateTempoStr("1.23")).toBe(true);
  });

  it('reports a negative number as invalid', () => {
    expect(_validateTempoStr("-1")).toBe(false);
    expect(_validateTempoStr("-1.")).toBe(false);
    expect(_validateTempoStr("-1.23")).toBe(false);
    expect(_validateTempoStr("-.23")).toBe(false);
  });

  it('reports a letter as invalid', () => {
    expect(_validateTempoStr("a")).toBe(false);
  });

});

describe('_validateBeatDurationStr', function () {

  it('reports an empty string as valid', () => {
    expect(_validateBeatDurationStr("")).toBe(true);
  });

  it('reports a period as valid', () => {
    expect(_validateBeatDurationStr(".")).toBe(true);
  });

  it('reports 1.23 as valid', () => {
    expect(_validateBeatDurationStr("1.23")).toBe(true);
  });

  it('reports a negative number as invalid', () => {
    expect(_validateBeatDurationStr("-1")).toBe(false);
    expect(_validateBeatDurationStr("-1.")).toBe(false);
    expect(_validateBeatDurationStr("-1.23")).toBe(false);
    expect(_validateBeatDurationStr("-.23")).toBe(false);
  });

  it('reports a letter as invalid', () => {
    expect(_validateBeatDurationStr("a")).toBe(false);
  });

});