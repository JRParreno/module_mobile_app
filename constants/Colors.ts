const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const DefaultColor = {
  main: '#B6B9FF',
  secondary: '#E7FFA8',
  white: '#fff',
  black: '#000',
  dark: '#707070',
  grey: '#E7E9EA',
  danger: '#F7645E',
  lightGreen: '#C5E0B4',
  yellow: "#FFFF00",
  pink: "#FFC0CB",
  brown: "#DFB072",
  custom: "#ECFF8F"

}

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
