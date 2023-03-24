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
        userID = doc.data().uid;

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



$(document).ready() 