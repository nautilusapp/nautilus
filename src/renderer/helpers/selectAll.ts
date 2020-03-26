import { State } from '../App.d';

export const firstThree = (state: State): boolean => {
  const optionValues = Object.values(state.options).slice(0, 2);
  let selected = 0;
  optionValues.forEach(val => {
    if (val === true) {
      selected += 1;
    }
  });
  if (selected === 2) return true;
  return false;
};
