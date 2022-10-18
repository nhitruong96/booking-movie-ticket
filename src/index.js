import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';

//antd
import 'antd/dist/antd.css';

//reactslick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Configure realtime(Websocket with signalR)
import * as signalR from '@aspnet/signalr'

import { DOMAIN } from './util/settings/config';

// Code connect to server listen event from server
export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();

const root = ReactDOM.createRoot(document.getElementById('root'));

connection.start().then(() => {
  root.render(
    // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    /* </React.StrictMode> */
  );
}).catch(errors => {
  console.log(errors)
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
