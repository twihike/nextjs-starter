import { NextPage } from 'next';

import Mui from '../components/mui/pages/Users';
import Tw from '../components/tailwindcss/pages/Users';
import withApollo from '../lib/next-with-apollo';

const ui = process.env.APP_UI ? process.env.APP_UI : '';
const pages: { [key: string]: NextPage } = {
  mui: Mui,
  tailwindcss: Tw,
};
const MyPage = withApollo(pages[ui], {
  setAuthToken: process.env.APP_ENV !== 'test',
  useMock: process.env.USE_GRAPHQL_MOCK === 'true',
});

export default MyPage;
