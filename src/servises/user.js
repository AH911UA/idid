import firebase from 'firebase';

export function addUser(user, callback) {

    firebase.database().ref('users/niknames').set(user, callback());
}