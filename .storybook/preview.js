import { addDecorator, addParameters } from '@storybook/react';
import { withScreenshot } from 'storycap';

addDecorator(withScreenshot);
addParameters({
  screenshot: {},
});
