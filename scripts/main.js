function getNameFromAuth() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user.uid); // let me to know who is the user that logged in to get the UID
      currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
      currentUser.get().then(userDoc => {
        //get the user name
        var userName = userDoc.data().name;

        //$("#name-goes-here").text(userName); //jquery
        document.getElementById("name-goes-here").innerText = userName;
      })
    }
  })
}
getNameFromAuth(); //run the function

const time = new Date().getHours();
let greeting;
if (time < 12) {
  greeting = "morning,";
} else if (time < 18) {
  greeting = "afternoon,";
} else {
  greeting = "evening,";
}
document.getElementById("time-of-day").innerHTML = greeting;


document.getElementById("iNeed-button").addEventListener("click", function () {
  window.location.href = "ineed.html";
});
document.getElementById("iHave-button").addEventListener("click", function () {
  window.location.href = "ihave.html";
});
document.getElementById("message-button").addEventListener("click", function () {
  window.location.href = "messageboard.html";
});
