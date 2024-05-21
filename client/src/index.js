import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import configureStore from './redux/configureStore'

const reduxStore = configureStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store={reduxStore} />
  </React.StrictMode>
);
