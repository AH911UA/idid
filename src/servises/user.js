import firebase from 'firebase';

export function addUser(user) {

    firebase.database().ref('users/niknames').set(user);
}