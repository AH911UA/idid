import firebase from 'firebase'

export default function sendNotes(userId, note, callback)
{
    firebase.database().ref(`/notes/${userId}/${note.id}/`).set(note, callback);
}