import {
  _convertBeatDurationStrIntoTempoStr,
  _convertTempoStrIntoBeatDurationStr,
  _validateTempoStr,
  _validateBeatDurationStr
} from '../fieldValuesReducer';

describe('_convertBeatDurationStrIntoTempoStr', function () {

  it('converts an empty string into an empty string', () => {
    expect(_convertBeatDurationStrIntoTempoStr("")).toEqual("");
  });

  it('converts a period into an empty string', () => {
    expect(_convertBeatDurationStrIntoTempoStr(".")).toEqual("");
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