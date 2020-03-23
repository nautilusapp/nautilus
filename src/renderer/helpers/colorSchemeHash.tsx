/**
 * ************************************
 *
 * @module  common.tsx
 * @author Aris
 * @date 3/20/20
 * @description color hash function for volumes
 * ************************************
 */

export const colorSchemeHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return `hsl(${hash % 360},80%,60%)`; //change saturation (80%) and lightness (60%) manually
};
