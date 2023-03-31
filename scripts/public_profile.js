const queryString = window.location.search;  // passing post ID from messageboard to public profile page thru the URL
console.log(queryString);

const urlParams = new URLSearchParams(queryString);  // create a new URLSearchParams object
const postID = urlParams.get('docID');  // Web API method to get the value of a specified query string parameter
console.log(postID);

function publishedUserInfo(id) {
    console.log(id);
    var thisPost = db.collection("posts").doc(id);

    thisPost.get().then(postdoc => {
        var userID = postdoc.data().uid
        console.log(userID)

        db.collection("users").doc(userID).get().then(userDoc => {
            var userName = userDoc.data().name;
            var userNeighbourhood = userDoc.data().neighbourhood;
            var userCity = userDoc.data().city;
            var userPhone = userDoc.data().phone;
            var picUrl = userDoc.data().profilePic;

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
            if (profilePic != null) {
                // console.log(picUrl);
                document.getElementById("profilePic").src = picUrl;
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
                    var picUrl = userDoc.data().profilePic;
                    var userItems = userDoc.data().items;

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
                        // console.log(picUrl);
                        document.getElementById("profilePic").src = picUrl;
                    }
                    
                    if (userItems != null) {
                        for (var i = 0; i < userItems.length; i++) {
                            var item = userItems[i];
                            var itemDiv = document.createElement("div");
                            itemDiv.className = "item";
                            itemDiv.innerHTML = item;
                            document.getElementById("itemsPublic").appendChild(itemDiv);

                        }
                 
        }
                    
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}
populateUserInfoFromSearchForItems();


/// User items




$(document).ready() 