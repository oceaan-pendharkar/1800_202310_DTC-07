var currentUser;
var ImageFile;      //global variable to store the File Object reference

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
                    let picUrl = userDoc.data().profilePic;

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
                    if (picUrl != null) {
                        console.log(picUrl);
                        document.getElementById("profile-pic").src = picUrl;
                    }
                    else
                        console.log("picURL is null");
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
    //enable name field
    document.getElementById("nameInput").disabled = false;
    //enable neighbourhood field
    document.getElementById("neighbourhoodInput").disabled = false;
    //enable city field
    document.getElementById("cityInput").disabled = false;
    //enable phone field
    document.getElementById("phoneInput").disabled = false;
}

function editPhoto() {
    //disable photo input
    document.getElementById("profile-pic-input").disabled = false;
}

//use editUserInfo() to enable the form fields when you click edit
document.getElementById("edit-profile").addEventListener("click", editUserInfo);

//use editPhoto() to enable the form field when you click edit
document.getElementById("edit-photo").addEventListener("click", editPhoto);

function saveUserInfo() {
    //save items from input fields
    var name = document.getElementById("nameInput").value;
    var neighbourhood = document.getElementById("neighbourhoodInput").value;
    var city = document.getElementById("cityInput").value;
    var phone = document.getElementById("phoneInput").value;

    //disable name field
    document.getElementById("nameInput").disabled = true;
    //disable neighbourhood field
    document.getElementById("neighbourhoodInput").disabled = true;
    //disable city field
    document.getElementById("cityInput").disabled = true;
    //disable phone field
    document.getElementById("phoneInput").disabled = true;

    //save the data to the database
    currentUser.update({
        name: name,
        neighbourhood: neighbourhood,
        city: city,
        phone: phone
    }).then(function () {
        console.log('Saved use profile info');
        window.location.href = "/html/profile.html";  // redirect to profile page
    })

}

function savePhoto() {
    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");


        //Asynch call to put File Object (global variable ImageFile) onto Cloud
        storageRef.put(ImageFile)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');

                //Asynch call to get URL from Cloud
                storageRef.getDownloadURL()
                    .then(function (url) { // Get "url" of the uploaded file
                        console.log("Got the download " + url);

                        db.collection("users").doc(user.uid).update({
                            profilePic: url
                        }).then(function () {
                            console.log('Added Profile Pic URL to Firestore.');
                            console.log('Saved use profile info');
                            document.getElementById('profile-pic-input').disabled = true;
                            window.location.href = "/html/profile.html";  // redirect to profile page
                        })
                    })
            })
    })
}

//use saveUserInfo() to save the form fields when you click save
document.getElementById("save-profile-info").addEventListener("click", saveUserInfo);

//use savePhoto() to save the form fields when you click save
document.getElementById("save-photo").addEventListener("click", savePhoto);

function chooseFileListener() {
    const fileInput = document.getElementById("profile-pic-input");   // pointer #1
    const image = document.getElementById("profile-pic");   // pointer #2

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


/// User items

function populateUserItems() {

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)

            ///get the items for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userItems = userDoc.data().items;

                    if (userItems != null) {
                        for (var i = 0; i < userItems.length; i++) {
                            var item = userItems[i];
                            var itemDiv = document.createElement("div");
                            itemDiv.className = "item";
                            itemDiv.innerHTML = item;
                            document.getElementById("listOfItems").appendChild(itemDiv);

                        }
                    }
                })
        }
    })
}

populateUserItems()
