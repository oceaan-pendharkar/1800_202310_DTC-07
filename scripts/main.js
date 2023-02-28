function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            user_Name = user.displayName;

            //method #1:  insert with JS
            //document.getElementById("name-goes-here").innerText = userName;    
            // method #2:  insert using jquery
            $("#name-goes-here").text(userName); //using jquery
            //method #3:  insert using querySelector
            //document.querySelector("#name-goes-here").innerText = userName

        } else {
            // No user is signed in.
        }
    });
}
getNameFromAuth(); //run the function

const time = new Date().getHours();
let greeting;
if (time < 12) {
  greeting = "Good morning!";
} else if (time < 18) {
  greeting = "Good afternoon@";
} else {
  greeting = "Good evening!";
}
document.getElementById("time-of-day").innerHTML = greeting;