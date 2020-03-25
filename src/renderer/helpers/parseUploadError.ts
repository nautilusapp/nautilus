const parseUploadError = (errorText: Error) => {
  //split string into an array from line breaks
  const splitErrorMessage = errorText.message.split('\n');
  //find the index where there is no information so we only parts of the error message we want
  const startIndex =
    splitErrorMessage.findIndex((line: string) => {
      return line.includes('is invalid because');
    }) + 1;
  const paragraphIndex = splitErrorMessage.findIndex((line: string) => {
    return line === '';
  });
  const displayedErrorMessage = splitErrorMessage.slice(
    startIndex,
    paragraphIndex,
  );
  return displayedErrorMessage;
};
export default parseUploadError;
