import firebase from 'firebase';

export default function checkNick(nick, callback) {

    //   firebase.database().ref('users/').set({
    //       nicknames: ['admin']
    //   });
    firebase.database().ref('users/nicknames')
        .on('value', (snapshot) => {
            const data = snapshot.val();

            for (const key in data) {
                if (data[key] === nick) {
                    callback(false);
                    return;
                }
            }
            callback(true);
        });
}