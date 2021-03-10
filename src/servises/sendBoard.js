import firebase from 'firebase'

export default function sendBoard(userId, board, callback)
{
   
    firebase.database().ref(`/boards/${userId}/${board.id}/`).set(board, callback);
}


