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


// handleSignUp occurs after the "sign up" button is pressed. It creates a new user in our user database with values provided.
// the Firebase API takes care of all the value checking for us! All we need to do is provide how to show the user the error.
// In our example, we use an alert box, but you can also use change the innerHTML of some div to show a message. :)

 function handleSignUp() {
	 // Get the email and password values from the textboxes in the html file
	 var email = document.getElementById('email').value;
	 var password = document.getElementById('password').value;
	 var password2 = document.getElementById('password_confirmation').value;

	 if (password != password2) {
		 var errorMessage = 'Your passwords do not match!';
		 document.getElementById('message-box').innerHTML = errorMessage;
		 return;
	 }


	 // Call the createUserWithEmailAndPassword functions as instructed by the API

	 firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		 // START ERROR HANDLING CODE
		 var errorCode = error.code;
		 var errorMessage = error.message;

		 document.getElementById('message-box').innerHTML = errorMessage;
		 console.log(error);
		 // END ERROR HANDLING CODE
	});
}

function authStatusListener() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in. In our context, it means that they have successfully signed up.
			var message = "Sign up successful!";
			document.getElementById('message-box').innerHTML = message;
			location.href = "logini.html";

		} else {
		}
	});
}

window.onload = function() { authStatusListener(); };
