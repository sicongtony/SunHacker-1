function initApp(){
	var user = firebase.auth().currentUser
	if(user){
		var email = user.email;
		document.getElementById('username').textContent = 'email';
	}
	else{
		window.location = 'index.html';
	}

	var sign_out = document.getElementById('signout');
	sign_out.onclick = signout;
}

function signout(){
	if(firebase.auth().currentUser){
		alert('successful log out')
		firebase.auth().signOut();
		window.location = 'index.html';
	}
}

window.onload = function(){
	initApp();
};