import Mui from '../components/mui/Document';
import Tw from '../components/tailwindcss/Document';

const ui = process.env.APP_UI ? process.env.APP_UI : '';
const docs: { [key: string]: unknown } = {
  mui: Mui,
  tailwindcss: Tw,
};
const MyDocument = docs[ui];

export default MyDocument;
