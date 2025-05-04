import ReactDOM from 'react-dom/client';
import App from './App';

import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css' //make sure MRT styles were imported in your app root (once)

import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
