/**
 * ************************************
 *
 * @module  colorSchemeIndex.tsx
 * @author Aris
 * @date 3/20/20
 * @description color function for volumes utilizing closure
 * ************************************
 */

const colorSchemeIndex = () => {
  // keeps track of what colors have been used
  let currentIndex = 0;
  // keeping track of hue and lightness from hsl by volume name key
  const cachedColorObj: {
    [key: string]: { color: number; light: number };
  } = {};

  // returned function with closure values
  return (str: string | undefined) => {
    if (typeof str !== 'string')
      throw Error('Must pass string to colorSchemeIndex Closure');

    // initialize color variables
    let currentColor: number;
    let currentLightness: number = 60;

    // if volume has already been assigned a color, return that colors
    if (cachedColorObj[str] !== undefined) {
      currentColor = cachedColorObj[str].color;
      currentLightness = cachedColorObj[str].light;
      return `hsl(${currentColor},80%,${currentLightness}%)`;
    }

    // if volume has not been assigned a color yet
    // calculate a new color hue (changes based on currentIndex)
    // by nine to keep good distance between colors
    // up to 360, which is max hue value
    currentColor = (40 * currentIndex + Math.floor(currentIndex / 9)) % 360;

    // first 9, lightness will be 60
    // third 9, lightness will be 30
    if (currentIndex >= 18 && currentIndex <= 27) {
      currentLightness = 30;
      // second 9, lightness will be 80
    } else if (currentIndex >= 9) {
      currentLightness = 80;
    }

    // increase the current index so next volume has a different color
    currentIndex++;

    // cache color assoicated with volume
    cachedColorObj[str] = {
      color: currentColor,
      light: currentLightness,
    };

    // return the color
    return `hsl(${currentColor},80%,${currentLightness}%)`;
  };
};

export default colorSchemeIndex;
