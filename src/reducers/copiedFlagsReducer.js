export const _initialCopiedFlags = {
  tempoStr: false,
  beatDurationStr: false
};

const copiedFlagsReducer = (copiedFlags = _initialCopiedFlags, action) => {
  let nextCopiedFlags;

  switch (action.type) {
    case "COPIED_TEXT":
      let {textDescriptor, text} = action.payload;
      nextCopiedFlags = {
        tempoStr: (textDescriptor === "tempoStr"),
        beatDurationStr: (textDescriptor === "beatDurationStr")
      };
      console.log(`Copied ${text} to clipboard.`);
      break;
    case "UPDATE_FIELD_VALUE":
      nextCopiedFlags = _initialCopiedFlags;
      break;
    default:
      nextCopiedFlags = copiedFlags;
      break;
  }

  return nextCopiedFlags;
};

export default copiedFlagsReducer;