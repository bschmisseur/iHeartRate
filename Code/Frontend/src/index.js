import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyAWV1pG0_B5EcWSGb9hj94ke2m3fvA1xuA",
  authDomain: "iheartrate-fa4b2.firebaseapp.com",
  projectId: "iheartrate-fa4b2",
  storageBucket: "iheartrate-fa4b2.appspot.com",
  messagingSenderId: "388291773959",
  appId: "1:388291773959:web:2531f5a167da4f44274ca2",
  measurementId: "G-E04TFGDELB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);