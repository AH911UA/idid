import firebase from 'firebase';

export default function getImage(img, callback)
{
    firebase.storage().ref().child(`images/${img}.jpg`).getDownloadURL()
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