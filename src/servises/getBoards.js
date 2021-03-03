import firebase from 'firebase'

export default function getBoards(userId, callback) {
    var starCountRef = firebase.database().ref(`boards/${userId}/`);
    starCountRef.on('value', (snapshot) => {
        const data = snapshot.val();
        callback(data)
    });
}

export function getBoard(userId, boardId, callback) {
    var starCountRef = firebase.database().ref(`boards/${userId}/${boardId}`);
    starCountRef.on('value', (snapshot) => {
        const data = snapshot.val();
        callback(data)
    });
}