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
                    if (userPhone != null) {
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

// THIS IS THE FUNCTION FOR PROFILE PIC SAVING BUT IT DOESN'T WORK YET
// function saveUserInfo() {
//     firebase.auth().onAuthStateChanged(function (user) {
//         var storageRef = storage.ref("images/" + user.uid + ".jpg");

//         //Asynch call to put File Object (global variable ImageFile) onto Cloud
//         storageRef.put(ImageFile)
//             .then(function () {
//                 console.log('Uploaded to Cloud Storage.');

//                 //Asynch call to get URL from Cloud
//                 storageRef.getDownloadURL()
//                     .then(function (url) { // Get "url" of the uploaded file
//                         console.log("Got the download URL.");
//                         //get values from the from
//                         userName = document.getElementById('nameInput').value;
//                         userNeighbourhood = document.getElementById('neighbourhoodInput').value;
//                         userCity = document.getElementById('cityInput').value;
//                         userPhone = document.getElementById('phoneInput').value;

//                         //Asynch call to save the form fields into Firestore.
//                         db.collection("users").doc(user.uid).update({
//                             name: userName,
//                             neighbourhood: userNeighbourhood,
//                             city: userCity,
//                             phone: userPhone,
//                             profilePic: url // Save the URL into users collection
//                         })
//                             .then(function () {
//                                 console.log('Added Profile Pic URL to Firestore.');
//                                 console.log('Saved use profile info');
//                                 document.getElementById('personalInfoFields').disabled = true;
//                             })
//                     })
//             })
//     })
// }

var ImageFile;      //global variable to store the File Object reference

function chooseFileListener() {
    const fileInput = document.getElementById("profile-pic-input");   // pointer #1
    const image = document.getElementById("profile-pic-goes-here");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function (e) {

        //the change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}
chooseFileListener();





function getItems() {

    // To get the selected items into the profile page





}

getItems()