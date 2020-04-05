import { NextPage } from 'next';

import Mui from '../components/mui/pages/Index';
import Tw from '../components/tailwindcss/pages/Index';

const ui = process.env.APP_UI ? process.env.APP_UI : '';
const pages: { [key: string]: NextPage } = {
  mui: Mui,
  tailwindcss: Tw,
};
const MyPage = pages[ui];

export default MyPage;
