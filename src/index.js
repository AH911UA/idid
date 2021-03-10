import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/app';
import { BrowserRouter } from "react-router-dom";
import AlertContextProvider from './contexts/alert-context'
import TrobberContextProvider from './contexts/trobber-context'
import UserContextProvider from './contexts/user-context';
import BoardContextProvider from './contexts/board-context';
import NotesContextProvider from './contexts/notes-context'
// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyCrvcjNTgo2bdyg7cmByFzh8At8J27jysE",
    authDomain: "idid-8caa0.firebaseapp.com",
    databaseURL: "https://idid-8caa0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "idid-8caa0",
    storageBucket: "idid-8caa0.appspot.com",
    messagingSenderId: "955821529568",
    appId: "1:955821529568:web:ff9dbbc1616be7dee43385"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



ReactDOM.render(
    <React.StrictMode>
        <TrobberContextProvider>
            <UserContextProvider>
                <BoardContextProvider>
                    <AlertContextProvider>
                        <NotesContextProvider>
                            <BrowserRouter>
                                <App />
                            </BrowserRouter>
                        </NotesContextProvider>
                    </AlertContextProvider>
                </BoardContextProvider>
            </UserContextProvider>
        </TrobberContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

