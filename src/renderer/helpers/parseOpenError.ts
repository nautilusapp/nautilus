/**
 * ************************
 * @name parseOpenError
 * @input errorText: Error object
 * @output array of strings of error descriptions
 * ************************
 */

const parseOpenError = (errorText: Error) => {
  //split string into an array from line breaks
  const splitErrorMessage = errorText.message.split('\n');
  //find the index where there is no information so we only get parts of the error message we want
  let startIndex = splitErrorMessage.findIndex((line: string) => {
    return line.includes('is invalid because');
  });

  if (startIndex === -1) {
    startIndex = splitErrorMessage.findIndex((line: string) => {
      return line.includes('Command failed');
    });
  }
  startIndex += 1;
  const paragraphIndex = splitErrorMessage.findIndex((line: string) => {
    return line === '';
  });
  const displayedErrorMessage = splitErrorMessage.slice(
    startIndex,
    paragraphIndex,
  );
  return displayedErrorMessage;
};

export default parseOpenError;
