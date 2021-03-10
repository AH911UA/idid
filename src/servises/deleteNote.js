import firebase from 'firebase';

export default function deleteNote(userId, id, callback) {
    firebase.database().ref(`/notes/${userId}/${id}`).set(null, callback);
}