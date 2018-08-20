// Initialize Firebase
 var config = {
   apiKey: "AIzaSyDsa_0PtHE_qpPbGzUGJTMvVYniM1h3j7k",
   authDomain: "instainspo-13892.firebaseapp.com",
   databaseURL: "https://instainspo-13892.firebaseio.com",
   projectId: "instainspo-13892",
   storageBucket: "instainspo-13892.appspot.com",
   messagingSenderId: "19848924782"
 };

// Initialize Firebase
firebase.initializeApp(config);


// handleLogIn gets called when the button is pressed
function handleLogIn() {

  // get what the user typed
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // call API function
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    document.getElementById('message-box').innerHTML = errorMessage;

    console.log(error);
 });
}

// waits for authentication status changes
function authStatusListener() {
 firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
     document.getElementById('log-in-form').innerHTML='';
     document.getElementById('message-box').innerHTML = "You're signed in!";
     location.href = "livnyc.html";
   } else {
     // No user is signed in.
   }
 });
}

// the function that gets called when the page first loads
function init() {
 authStatusListener();
}

// tells the browser to call init when the page first loads
window.onload = init();
