import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom"
import { Provider } from 'react-redux';
import './index.css';
import "semantic-ui-css/semantic.min.css"
import App from './components/App';
import store from './redux/store';
import history from "./history"
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

