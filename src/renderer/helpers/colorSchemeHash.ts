/**
 * ************************************
 *
 * @module  common.tsx
 * @author Aris
 * @date 3/20/20
 * @description color hash function for volumes
 * ************************************
 */
//color hash function - with passing down props
export const colorSchemeIndex = () => {
  let currentIndex: number = 0;
  const cachedColorObj: { [key: string]: number } = {};

  return (str: string | undefined) => {
    let currentColor: number;
    if (str !== undefined && cachedColorObj[str] !== undefined) {
      currentColor = cachedColorObj[str];
      return `hsl(${currentColor},80%,60%)`;
    }
    currentColor = (40 * currentIndex + Math.floor(currentIndex / 9)) % 360;
    currentIndex++;
    if (str !== undefined) {
      cachedColorObj[str] = currentColor;
    }

    return `hsl(${currentColor},80%,60%)`;
  };
};
//color hash function - w/o passing down props
export const colorSchemeHash = (str: string) => {
  const cachedColorObj: { [key: string]: number } = {};

  const getColor = (string: string) => {
    if (cachedColorObj[string]) {
      return cachedColorObj[string];
    } else {
      let hash = 0;
      for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }
      cachedColorObj[string] = hash;
      return `hsl(${cachedColorObj[string] % 360},80%,60%)`; //change saturation (80%) and lightness (60%) manually
    }
  };
  return getColor(str);
};
