import '../src/styles/scss/global.scss';
import colors from '../src/styles/scss/colors.module.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'padded',
  backgrounds: {
    default: 'backgroundMain',
    values: [
      {
        name: 'backgroundMain',
        value: colors.backgroundMain,
      },
      {
        name: 'backgroundMainDark',
        value: colors.backgroundMainDark,
      },
      {
        name: 'backgroundMainLight',
        value: colors.backgroundMainLight,
      },
    ],
  },
};
