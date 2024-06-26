import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import configureStore from './redux/configureStore'
import { GoogleOAuthProvider } from '@react-oauth/google';


const reduxStore = configureStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="229681321725-f8g57sj290gtun494q2uifbs0adoburc.apps.googleusercontent.com">
    <React.StrictMode>
      <App store={reduxStore}/>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
