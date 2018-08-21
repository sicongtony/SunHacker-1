window.onload = function(){
  initApp();
};
function initApp(){
  // firebase.auth().onAuthStateChanged(function(user){
  //   if(user){
  //     alert(user.email)
  //     window.location = 'mainpage.html';
  //   }
  // });
  if(firebase.auth().currentUser){
    firebase.auth().signOut();
  }
}