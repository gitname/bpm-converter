export const raiseCopiedFlag = (textDescriptor, text) => {
  return {
    type: "COPIED_TEXT",
    payload: {
      textDescriptor,
      text
    }
  };
};

export const updateFieldValue = (fieldName, fieldValue) => {
  return {
    type: "UPDATE_FIELD_VALUE",
    payload: {
      fieldName,
      fieldValue
    }
  }
};