import firebase from 'firebase';

export default function getImage(img, callback) {
    firebase.storage().ref().child(img).getDownloadURL()
        .then((url) => {

            // var xhr = new XMLHttpRequest();
            // xhr.responseType = 'blob';
            // xhr.onload = (event) => {   
            //     var blob = xhr.response;
            // };
            // xhr.open('GET', url);
            // xhr.send();

            callback(url);
        })
        .catch((error) => {

        });
}


export function getListImage(pathImg, callback) {
    
    var listRef = firebase.storage().ref().child(`images/${pathImg}`);
 
    listRef.listAll()
        .then((res) => {
            console.log("LEN : ", res.items.length);
            res.items.forEach((itemRef) => {
                getImage(itemRef._delegate._location.path_, url => callback(url, res.items.length))
            });
        }).catch((error) => {
           
        });
}