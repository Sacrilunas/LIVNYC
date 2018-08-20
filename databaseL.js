// config contains the logins you need to use the Firebase API
var config = {
  apiKey: "AIzaSyBcf-ljP-cQWuhAHDo9mP_aWmNzGz7onyQ",
  authDomain: "webpage-log-in.firebaseapp.com",
  databaseURL: "https://webpage-log-in.firebaseio.com",
  projectId: "webpage-log-in",
  storageBucket: "webpage-log-in.appspot.com",
  messagingSenderId: "388817267792"
};
// Initialize Firebase
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function test() {

  var name = document.getElementById('name-box');
	var comment = document.getElementById('comment-box');
  showAll();
  alert("worked");
}

// Handles the submit button being clicked based on user id
function changePrefs(){
	var user = firebase.auth().currentUser;
	var name = document.getElementById('name-box').value;
	var comment = document.getElementById('comment-box').value;

	if (user) {
		var uid = user.uid;
		setPref(uid, name, comment);

    showAll();
	}
}





function showAll(){
  var user = firebase.auth().currentUser;
  // builds the location of the data
  var ref = database.ref('/user_prefs/' + user.uid);

  // gets the data
  return ref.once('value').then(function(snapshot){
    var my_pref = snapshot.val();
    var my_html = '';
    for (var key in my_pref) {
      var comment_name_pair = my_pref[key];
      // alert(comment_color_pair.name + " " + comment_color_pair.comment);
      my_html += "<br></br> Your name: " + comment_name_pair.name + "<br> Your comment: " + comment_name_pair.comment;


      }

      document.getElementById('print').innerHTML = my_html;
  });
}

function setPref(uid, name, comment){
	var prefs = {
		name: name,
		comment: comment,
	};

	var ref = database.ref('/user_prefs/' + uid);


  // Get a key for a new Post.
  var newPostKey = ref.push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/' + newPostKey]  = prefs;

	ref.update(updates);
}

// Gets favourite name and comment based on user id (uid)
function getPref(uid){
	// builds the location of the data
	var ref = database.ref('/user_prefs/' + uid);

	// gets the data
	return ref.once('value').then(function(snapshot){
		// when it's successful, get the value JSON
		var my_pref = snapshot.val();

		// get the values in the JSON
		var name = my_pref.name;
		var comment = my_pref.comment;

		// if there are no values for this entry in the database, change the variables
		if(!name) {
			name = 'Nothing in database!';
		}
		if(!comment) {
			comment = 'Nothing to database!';
		}

		// change the display
		document.getElementById('name').innerHTML = my_pref.name;
		document.getElementById('comment').innerHTML = my_pref.comment;
	});
}

function authStatusListener() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			getPref(user.uid);

		} else {
			// User not signed in, get rid of the form and display a message
			document.getElementById('pref-form').innerHTML = '';
			document.getElementById('message-box').innerHTML = 'You are not logged in!';
		}
	});
}


function clearButton(){
  document.getElementById('name-box').value = '';
  document.getElementById('comment-box').value = '';
}
window.onload = function() { authStatusListener(); };
