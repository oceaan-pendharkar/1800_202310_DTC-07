const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);
const postID = urlParams.get('docID');
console.log(postID);

function publishedUserInfo(id) {
    console.log(id);
    var thisPost = db.collection("posts").doc(id);
    var userID;

    thisPost.get().then(doc => {
        userID = doc.data().uid;

        db.collection("users").doc(userID).get().then(userDoc => {
            var userName = userDoc.data().name;
            console.log(userName);
            var userNeighbourhood = userDoc.data().neighbourhood;
            var userCity = userDoc.data().city;
            var userPhone = userDoc.data().phone;
            console.log(userName);

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