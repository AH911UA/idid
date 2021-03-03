import firebase from 'firebase';

export default function deleteBoard(userId, idBoard, callback) {
    firebase.database().ref(`/boards/${userId}/${idBoard}`).set(null, callback);
}