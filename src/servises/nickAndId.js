import firebase from 'firebase';

export default function nickAndId({id, nick}, callback) {

    // firebase.database().ref(`users/userId/${id}`).set({nick: nick}, () => {
    //     callback(true, {id, nick});
    // });

    var postListRef = firebase.database().ref(`users/userId/${id}`);
    var newPostRef = postListRef.push();
    newPostRef.set({ nick: nick }, () => {
        callback(true, {id, nick});
    });
}