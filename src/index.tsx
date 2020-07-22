import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';

import App from './App';
import FirebaseApp from './FireBaseApp';
import firebaseConfig from './firebase-config';
import * as serviceWorker from './serviceWorker';

import './index.css';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <FirebaseApp>
    <App />
  </FirebaseApp>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();