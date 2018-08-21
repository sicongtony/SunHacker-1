//Handle the sign in button

function toggleSignIn(){
	if (firebase.auth().currentUser){
		//[Start signout]
		firebase.auth().signOut();
	}
	else{
		var email = document.getElementById('email1').value;
		var password = document.getElementById('password1').value;
		if(email.length < 4){
			alert('Please enter an email address.');
			return;
		}
		if(password.length < 6){
			alert('Password should be 6 digit!');
			return;
		}
		//Sign in with email and pass
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
			//handle error
			var errorCode = error.code;
			var errorMessage = error.message;
			
			if(errorCode === 'auth/wrong-password'){
				alert('Wrong password.');
			}else{
				alert(errorMessage);
			}
			console.log(error);
		});
	}
}

//Update UI while logged in
function initApp(){
	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			alert('Successful log in')
			window.location = 'mainpage.html';
		}
	})

	document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
}

window.onload = function(){
	initApp();
};