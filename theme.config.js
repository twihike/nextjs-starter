// eslint-disable-next-line import/no-extraneous-dependencies
const { Theme, ThemeBuilder } = require('tailwindcss-theming');

const commonColors = {
  transparent: 'transparent',
  white: '#ffffff',
  black: '#000000',
  lighten: '#ffffff',
  darken: '#000000',
};

const colors = {
  gray: {
    '100': '#f5f5f5',
    '200': '#eeeeee',
    '300': '#e0e0e0',
    '400': '#bdbdbd',
    '500': '#9e9e9e',
    '600': '#757575',
    '700': '#616161',
    '800': '#424242',
    '900': '#212121',
  },
};

const palette = Object.keys(colors).reduce(
  (acc, color) =>
    Object.keys(colors[color]).reduce(
      (shades, shade) => ({
        ...shades,
        [`${color}-${shade}`]: colors[color][shade],
      }),
      acc,
    ),
  {},
);

const withOpacityVarinat = (theme) => {
  theme
    .opacityVariant('state-hovered', 0.24)
    .opacityVariant('state-focused', 0.32)
    .opacityVariant('state-pressed', 0.48)
    .opacityVariant('state-enabled', 0.16)
    .opacityVariant('state-disabled', 0.08)
    .opacityVariant('text-high-emphasis', 0.87)
    .opacityVariant('text-medium-emphasis', 0.6)
    .opacityVariant('text-disabled', 0.38)
    .opacityVariant('container', 0.12)
    .opacityVariant('border', 0.24)
    .opacityVariant('01dp', 0.05)
    .opacityVariant('02dp', 0.07)
    .opacityVariant('03dp', 0.08)
    .opacityVariant('04dp', 0.09)
    .opacityVariant('06dp', 0.11)
    .opacityVariant('08dp', 0.12)
    .opacityVariant('12dp', 0.14)
    .opacityVariant('16dp', 0.15)
    .opacityVariant('24dp', 0.16)
    .opacityVariant('10', 0.1)
    .opacityVariant('20', 0.2)
    .opacityVariant('30', 0.3)
    .opacityVariant('40', 0.4)
    .opacityVariant('50', 0.5)
    .opacityVariant('60', 0.6)
    .opacityVariant('70', 0.7)
    .opacityVariant('80', 0.8)
    .opacityVariant('90', 0.9);
};

const lightTheme = new Theme()
  .name('light')
  .default()
  .assignable()
  .colors({
    ...commonColors,
    ...palette,

    primary: '#1565c0',
    'primary-variant': '#2196f3',
    'primary-light': '#5e92f3',
    'primary-dark': '#003c8f',
    background: '#f5f5f5',
    'background-light': '#ffffff',
    'background-dark': '#c2c2c2',
    surface: '#fafafa',
    'surface-light': '#ffffff',
    'surface-dark': '#c7c7c7',

    'on-primary': '#ffffff',
    'on-background': '#212121',
    'on-background-light': '#484848',
    'on-background-dark': '#484848',
    'on-surface': '#313131',
    'on-surface-light': '#5a5a5a',
    'on-surface-dark': '#080808',

    error: '#b00020',
    'on-error': '#ffffff',
    success: '#3ab577',
    'on-success': '#ffffff',
    warning: '#e65100',
    'on-warning': '#ffffff',
    info: '#2481ea',
    'on-info': '#ffffff',
  });

const darkTheme = new Theme().name('dark').colors({
  ...commonColors,
  ...palette,

  primary: '#90caf9',
  'primary-variant': '#1976d2',
  'primary-light': '#c3fdff',
  'primary-dark': '#5d99c6',
  background: '#303030',
  'background-light': '#595959',
  'background-dark': '#070707',
  surface: '#121212',
  'surface-light': '#383838',
  'surface-dark': '#000000',

  'on-primary': '#121212',
  'on-background': '#e7e7e7',
  'on-background-light': '#ffffff',
  'on-background-dark': '#b5b5b5',
  'on-surface': '#f5f5f5',
  'on-surface-light': '#ffffff',
  'on-surface-dark': '#c2c2c2',

  error: '#e67388',
  'on-error': '#ffffff',
  success: '#3ab577',
  'on-success': '#ffffff',
  warning: '#ffa777',
  'on-warning': '#ffffff',
  info: '#83bdff',
  'on-info': '#ffffff',
});

withOpacityVarinat(lightTheme);
withOpacityVarinat(darkTheme);

module.exports = new ThemeBuilder()
  .asClass()
  .default(lightTheme)
  .dark(darkTheme);
