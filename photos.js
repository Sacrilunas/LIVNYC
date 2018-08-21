/*var config = {
  apiKey: "AIzaSyBcf-ljP-cQWuhAHDo9mP_aWmNzGz7onyQ",
  authDomain: "webpage-log-in.firebaseapp.com",
  databaseURL: "https://webpage-log-in.firebaseio.com",
  projectId: "webpage-log-in",
  storageBucket: "webpage-log-in.appspot.com",
  messagingSenderId: "388817267792"
};
// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();


// Points to the root reference
var storageRef = firebase.storage().ref();

// Points to 'images'
var imagesRef = storageRef.child('images');

// Points to 'images/space.jpg'
// Note that you can use variables to create child values
var fileName = 'space.jpg';
var spaceRef = imagesRef.child(fileName);

// File path is 'images/space.jpg'
var path = spaceRef.fullPath

// File name is 'space.jpg'
var name = spaceRef.name

// Points to 'images'
var imagesRef = spaceRef.parent;


// File or Blob named mountains.jpg
var file = ...

// Create the file metadata
var metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    ...

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
  });
});




// Create a reference to the file we want to download
var starsRef = storageRef.child('images/stars.jpg');

// Get the download URL
starsRef.getDownloadURL().then(function(url) {
  // Insert url into an <img> tag to "download"
}).catch(function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/object_not_found':
      // File doesn't exist
      break;

    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    ...

    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      break;
  }
});
*/


/*
import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Constants, ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import * as firebase from 'firebase';

console.disableYellowBox = true;

const url =
  'https://firebasestorage.googleapis.com/v0/b/blobtest-36ff6.appspot.com/o/Obsidian.jar?alt=media&token=93154b97-8bd9-46e3-a51f-67be47a4628a';

const firebaseConfig = {
    apiKey: "AIzaSyBcf-ljP-cQWuhAHDo9mP_aWmNzGz7onyQ",
    authDomain: "webpage-log-in.firebaseapp.com",
    databaseURL: "https://webpage-log-in.firebaseio.com",
    projectId: "webpage-log-in",
    storageBucket: "webpage-log-in.appspot.com",
    messagingSenderId: "388817267792"
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image ? null : (
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: 'center',
              marginHorizontal: 15,
            }}>
            Example: Upload ImagePicker result
          </Text>
        )}

        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />

        <Button onPress={this._takePhoto} title="Take a photo" />

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());

  const snapshot = await ref.put(blob);
  return snapshot.downloadURL;
}
*/

/*//Initialize Firebase
var config = {
  apiKey: "AIzaSyBcf-ljP-cQWuhAHDo9mP_aWmNzGz7onyQ",
  authDomain: "webpage-log-in.firebaseapp.com",
  databaseURL: "https://webpage-log-in.firebaseio.com",
  projectId: "webpage-log-in",
  storageBucket: "webpage-log-in.appspot.com",
  messagingSenderId: "388817267792"
};

firebase.initializeApp(config);

//function to save file
function previewFile(){
  var storage = firebase.storage();

  var file = document.getElementById("files").files[0];
    console.log(file);

  var storageRef = firebase.storage().ref();

  //dynamically set reference to the file name
  var thisRef = storageRef.child(file.name);

  //put request upload file to firebase storage
  thisRef.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
  ref.update(thisref)
});

  //get request to get URL for uploaded file
  thisRef.getDownloadURL().then(function(url) {
  console.log(url);

  })

  }
*/
/*
var config = {
  apiKey: "AIzaSyBcf-ljP-cQWuhAHDo9mP_aWmNzGz7onyQ",
  authDomain: "webpage-log-in.firebaseapp.com",
  databaseURL: "https://webpage-log-in.firebaseio.com",
  projectId: "webpage-log-in",
  storageBucket: "webpage-log-in.appspot.com",
  messagingSenderId: "388817267792"
};
// Get a reference to the storage service, which is used to create references in your storage bucket
firebase.initializeApp(config);

const storageService = firebase.storage();
const storageRef = storageService.ref();



let selectedFile;
function handleFileUploadChange(e)
{
  selectedFile = e.target.files[0].name;
}
function handleFileUploadSubmit(e)
 {

  const uploadTask = storageRef.child("/images/" + selectedFile.name ).put(selectedFile); //create a child directory called images, and place the file inside this directory
  uploadTask.on('state_changed', (snapshot) => {

  // Observe state change events such as progress, pause, and resume
  }, (error) => {
    // Handle unsuccessful uploads
    console.log(error);
  }, () => {
     // Do something once upload is complete
     console.log('success');
  });
}
//document.querySelector("Select").addEventListener('change', handleFileUploadChange());
//document.querySelector("Submit").addEventListener('click', handleFileUploadSubmit());
*/
var config = {
  apiKey: "AIzaSyBcf-ljP-cQWuhAHDo9mP_aWmNzGz7onyQ",
  authDomain: "webpage-log-in.firebaseapp.com",
  databaseURL: "https://webpage-log-in.firebaseio.com",
  projectId: "webpage-log-in",
  storageBucket: "webpage-log-in.appspot.com",
  messagingSenderId: "388817267792"
};
// Get a reference to the storage service, which is used to create references in your storage bucket
firebase.initializeApp(config);

const storage = firebase.storage()
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('change', (e)=>{
  let file = e.target.files[0];
  let locationRef = storage.ref('/cats/' + file.name)
  locationRef.put(file)
  alert("done");
})


 /*
 function showimage() {

     var storageRef = firebase.storage().ref();
     var spaceRef = storageRef.child('cat1.jpg');
     storageRef.child('cat1.jpg').getDownloadURL().then(function(url) {
         var test = url;
         alert(url);
         document.querySelector('img').src = test;

     }).catch(function(error) {

     });


 }
 */

//var storage    = firebase.storage();
var storageRef = storage.ref();
var spaceRef = storageRef.child('cats/cat1.jpg');

storageRef.child('cats/cat1.jpg').getDownloadURL().then(function(url) {


  var test = url;
//  add this line here:
  document.querySelector('img').src = test;

}).catch(function(error) {

});

var test = 'firebase_url';

document.querySelector('img').src = test;
