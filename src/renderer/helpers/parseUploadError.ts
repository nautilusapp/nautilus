const parseUploadError = (errorText: Error) => {
  //split string into an array from line breaks
  const splitErrorMessage = errorText.message.split('\n');
  //find the index where there is no information so we only parts of the error message we want
  let startIndex = splitErrorMessage.findIndex((line: string) => {
    return line.includes('is invalid because');
  });

  if (startIndex === -1) {
    startIndex = splitErrorMessage.findIndex((line: string) => {
      return line.includes('Command failed');
    });
  }

  console.log(splitErrorMessage);
  startIndex += 1;
  console.log(startIndex);

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
