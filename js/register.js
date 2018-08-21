//hand sign up
function handleSignUp(){
	if(firebase.auth().currentUser){
		firebase.auth().sighOut();
	}
	var email = document.getElementById('email1').value;
	var password = document.getElementById('password1').value;
	var confirmPassword = document.getElementById('password2').value;
	if(email.length < 4){
		alert('Please enter an email address.');
		return;
	}
	if(password.length < 4){
		alert('password need at least 4 digits');
		return;
	}
	if(password !== confirmPassword){
		alert('Confirm password is different.');
		return;
	}

	//sign in with email and pass

	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
		var errorCode = error.code;
		var errorMessage = error.message;

		if(errorCode == 'auth/weak-password'){
			alert('The password is too weak');
		}else{
			alert(errorMessage);
		}
		console.log(error);
	});
}

function initApp(){
	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			alert('Successful registered')
			window.location = 'mainpage.html';
		}
	});

	document.getElementById('signup').addEventListener('click', handleSignUp, false);
}

window.onload = function(){
	initApp();
};