import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/app';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(<App />);
