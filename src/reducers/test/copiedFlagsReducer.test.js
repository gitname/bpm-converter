import copiedFlagsReducer, {_initialCopiedFlags} from '../copiedFlagsReducer';

describe('copiedFlagsReducer', function () {

  it('sets a single flag and clears all others', () => {
    const action = {
      type: "COPIED_TEXT",
      payload: {
        textDescriptor: "tempoStr"
      }
    };
    const expectedNextCopiedFlags = {
      tempoStr: true,
      beatDurationStr: false
    };
    expect(copiedFlagsReducer(_initialCopiedFlags, action)).toEqual(expectedNextCopiedFlags);
  });

});