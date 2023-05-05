import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Context, { FirebaseContext } from '../src/store/Context'
import firebase from '../src/firebase/firebase'
import { BrowserRouter } from 'react-router-dom';
import ChatContextProvider from './store/ChatContext';
import 'react-tooltip/dist/react-tooltip.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <FirebaseContext.Provider value={firebase}>
      <Context>
        <ChatContextProvider>
          <App />
        </ChatContextProvider>
      </Context>
    </FirebaseContext.Provider>
  </BrowserRouter>

);
