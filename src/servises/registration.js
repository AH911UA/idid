import firebase from 'firebase';

export default function registration ({email, password, nick}, callback){
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;

            var postListRef = firebase.database().ref('users/nicknames/');
            var newPostRef = postListRef.push();
            newPostRef.set(nick, () => {
                user.nick = nick;
                callback(true, user, null, true);
            });
            
        })
        .catch((error) => {
            callback(false, null, error.message);
        });
}
