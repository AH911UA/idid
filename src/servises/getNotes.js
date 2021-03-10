import firebase from 'firebase'

export default function getNotes(userId, callback) 
{
    var starCountRef = firebase.database().ref(`notes/${userId}/`);
    starCountRef.on('value', (snapshot) => {
        const data = snapshot.val();
        callback(data)
    });
}