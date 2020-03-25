const parseUploadError = (errorText: Error) => {
  //split string into an array from line breaks
  const splitErrorMessage = errorText.message.split('\n');
  //find the index where there is no information so we only parts of the error message we want
  const paragraphIndex = splitErrorMessage.findIndex((line: string) => {
    return line === '';
  });
  const displayedErrorMessage = splitErrorMessage.slice(2, paragraphIndex);
  return displayedErrorMessage;
};
export default parseUploadError;
