const queryString = window.location.search;  // passing post ID from messageboard to public profile page thru the URL
console.log(queryString);

const urlParams = new URLSearchParams(queryString);  // create a new URLSearchParams object
const postID = urlParams.get('docID');  // Web API method to get the value of a specified query string parameter
console.log(postID);

function publishedUserInfo(id) {
    console.log(id);
    var thisPost = db.collection("posts").doc(id);
    var userID;

    thisPost.get().then(doc => {

        db.collection("users").doc(userID).get().then(userDoc => {
            var userName = userDoc.data().name;
            var userNeighbourhood = userDoc.data().neighbourhood;
            var userCity = userDoc.data().city;
            var userPhone = userDoc.data().phone;

            // if the data fields are not empty, then write them in to the form.
            if (userName != null) {
                document.getElementById("userName").innerText = userName;
            }
            if (userNeighbourhood != null) {
                document.getElementById("neighbourhoodPublic").innerText = userNeighbourhood;
            }
            if (userCity != null) {
                document.getElementById("userCity").innerText = userCity;
            }
            if (userPhone != null) {
                document.getElementById("phonePublic").innerText = userPhone;
            }
        })

    })

}

publishedUserInfo(postID);

function populateUserInfoFromSearchForItems() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(postID)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userNeighbourhood = userDoc.data().neighbourhood;
                    var userCity = userDoc.data().city;
                    var userPhone = userDoc.data().phone;
                    var profilePic = userDoc.data().profilePic;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("userName").innerText = userName;
                    }
                    if (userNeighbourhood != null) {
                        document.getElementById("neighbourhoodPublic").innerText = userNeighbourhood;
                    }
                    if (userCity != null) {
                        document.getElementById("userCity").innerText = userCity;
                    }
                    if (userPhone != null) {
                        document.getElementById("phonePublic").innerText = userPhone;
                    }
                    if (profilePic != null) {
                        console.log(profilePic);
                        document.getElementById("profilePic").src = profilePic;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}
populateUserInfoFromSearchForItems();



$(document).ready() 