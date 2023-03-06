function insertProfileInfo() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // let me to know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc => {
                //get the user name
                var userName = userDoc.data().name;
                var email = userDoc.data().email;
                var phone = userDoc.data().phone;
                var neighbourhood = userDoc.data().neighbourhood;
                var items = userDoc.data().items;
                console.log(userName);
                //$("#name-goes-here").text(userName); //jquery
                document.getElementById("name-goes-here").innerText = userName;
                document.getElementById("email-goes-here").innerText = email;
                document.getElementById("phone-goes-here").innerText = phone;
                document.getElementById("neighbourhood-goes-here").innerText = neighbourhood;
                document.getElementById("items-go-here").innerText = items;
            })
        }
    })
}
insertProfileInfo()



function editProfile() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // let me to know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc => {
                //get the user name
                var username = document.getElementById("username").value;
                var photo = document.getElementById("profile-image").value;
                var email = document.getElementById("email").value;
                var phone = document.getElementById("phone").value;
                var neighbourhood = document.getElementById("neighbourhood").value;

                //change photo
                document.getElementById("photo-goes-here").src = photo;

                //change values in database
                currentUser.update({
                    name: username,
                    photo: photo,
                    email: email,
                    phone: phone,
                    neighbourhood: neighbourhood
                })

            })
        }
    })

}



$("#edit-profile").click(function () {
    $("#profile").hide();
    $("#profile-editing").show();
});

$("#submit-changes").click(function () {
    editProfile();
    $("#profile").show();
    $("#profile-editing").hide();
});

const setup = () => {
    console.log("Hello World!")
    $("#profile-editing").hide();
}

$(document).ready(setup)