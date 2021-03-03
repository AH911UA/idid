import firebase from 'firebase';

export default function login ({ email, password }, callback){
    
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            getNick(user, nick => callback(true, { ...user, nick: nick }))
        })
        .catch((error) => {
             callback(false, null, error.message, false);
        });
}

function getNick(user, callback) {

    firebase.database().ref(`users/userId/${user.uid}`)
        .on('value', (snapshot) => {
            const data = snapshot.val();
           
            for (const key in data) {
                if (data[key]['nick']) {
                    callback(data[key]['nick']);
                    return;
                }
            }            
        });
}
