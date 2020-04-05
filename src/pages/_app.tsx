import '../styles/index.css';

import Mui from '../components/mui/App';
import Tw from '../components/tailwindcss/App';

const ui = process.env.APP_UI ? process.env.APP_UI : '';
const apps: { [key: string]: object } = {
  mui: Mui,
  tailwindcss: Tw,
};
const MyApp = apps[ui];

export default MyApp;
