var currentUser;

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userNeighbourhood = userDoc.data().neighbourhood;
                    var userCity = userDoc.data().city;
                    var userPhone = userDoc.data().phone;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userNeighbourhood != null) {
                        document.getElementById("neighbourhoodInput").value = userNeighbourhood;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userCity != null) {
                        document.getElementById("phoneInput").value = userPhone;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {

    //get the values from the form fields
    var name = document.getElementById("nameInput").value;
    var neighbourhood = document.getElementById("neighbourhoodInput").value;
    var city = document.getElementById("cityInput").value;
    var phone = document.getElementById("phoneInput").value;

    //update the user document with the new data
    currentUser.update({
        name: name,
        neighbourhood: neighbourhood,
        city: city,
        phone: phone
    })

    //Disable the form fields
    document.getElementById('personalInfoFields').disabled = true;
}

function editItems() {

}


function getItems() {

// To get the selected items into the profile page

import { collection, query, where, getDocs } from "resources";

for (var i = 0; i = "resource".docs.length - 1; i++) {


const q = query(collection(db, "resource"), where("doc", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  document.getElementById("user-item-list").appendChild(doc.data());

});

}}

getItems()