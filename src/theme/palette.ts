import { PaletteColorOptions, PaletteOptions } from '@mui/material';
import { green, grey, orange, red, silver, turquoise } from './colors';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    neutral?: PaletteColorOptions;
    white?: PaletteColorOptions;
    dark?: PaletteColorOptions;
    transparent?: PaletteColorOptions;
    black?: PaletteColorOptions;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
    state?: string;
  }
  interface Palette {
    neutral: PaletteColor;
    dark: PaletteColor;
    transparent: PaletteColor;
  }

  interface PaletteColor {
    lighter: string;
    darker: string;
    state: string;
  }
}

const palette: PaletteOptions = {
  action: {
    active: grey[500],
    hover: grey[100],
    selected: grey[200],
    disabled: 'white',
    disabledBackground: grey[600],
    focus: grey[400],
  },
  background: {
    paper: grey[50],
    default: grey[100],
  },
  text: {
    primary: grey[900],
    secondary: grey[700],
    disabled: grey[300],
  },

  dark: {
    main: grey[800],
  },
  transparent: {
    main: 'transparent',
  },
  neutral: {
    main: silver[500],
  },
  primary: {
    lighter: '#f0e5c7', // Um tom bem claro para contrastar suavemente com o dourado
    light: '#dcd0a5', // Um tom mais suave, mantendo a harmonia com o dourado
    main: '#c2b067', // Cor principal (dourado amarelado)
    dark: '#a3904d', // Um tom mais escuro, para dar profundidade
    darker: '#7a6933',
  },
  secondary: {
    lighter: '#f0e5c7', // Um tom bem claro para contrastar suavemente com o dourado
    light: '#dcd0a5', // Um tom mais suave, mantendo a harmonia com o dourado
    main: '#c2b067', // Cor principal (dourado amarelado)
    dark: '#a3904d', // Um tom mais escuro, para dar profundidade
    darker: '#7a6933',
  },
  error: {
    lighter: red[50],
    light: red[100],
    main: red[600],
    dark: red[500],
    darker: red[900],
  },
  warning: {
    lighter: orange[50],
    light: orange[100],
    main: orange[500],
    dark: orange[700],
    darker: orange[900],
    contrastText: '#ffffff',
  },
  success: {
    lighter: green[50],
    light: green[100],
    main: green[600],
    dark: green[700],
    darker: green[900],
  },
  info: {
    lighter: turquoise[50],
    light: turquoise[300],
    main: turquoise[500],
    dark: turquoise[700],
    darker: turquoise[900],
    contrastText: '#ffffff',
  },

  grey: { ...grey },
};

export default palette;
