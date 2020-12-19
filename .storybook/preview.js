import { addDecorator, addParameters } from '@storybook/react';
import { withScreenshot } from 'storycap';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import Router from 'next/router';

addDecorator((storyFn) => (
  <RouterContext.Provider value={Router}>
    {storyFn()}
  </RouterContext.Provider>
));
addDecorator(withScreenshot);
addParameters({
  screenshot: {},
});
