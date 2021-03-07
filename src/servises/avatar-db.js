import firebase from 'firebase';

export function sendAvatar(user, url, callback) {

    firebase.database().ref(`users/avatar/${user.id}`).set(url, callback());
}

export function getAvatar(id, callback) {
    firebase.database().ref(`users/avatar/${id}`)
        .on('value', (snapshot) => {
            const data = snapshot.val();
            callback(data);
        });
}