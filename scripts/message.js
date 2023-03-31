//Preset user info on the message post section
function userMessageInfo() {
    // to check if the user is logged in:
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
userMessageInfo();


function submitMessage() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {

        if (user) {
            console.log(user.uid); // let me to know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will go to the firestore and go to the document of the user
            postsRef = db.collection("posts")
            currentUser.get().then(messageDoc => {
                //get the user name
                var userName = messageDoc.data().name;
                console.log(userName);
                //get the message
                var message = document.getElementById("message").value;
                console.log(message);
                var time = new Date().toLocaleString();
                var picUrl = messageDoc.data().profilePic;

                //push message to firestore
                if (message != "") {
                    postsRef.add({
                        profilePic: picUrl,
                        name: userName,
                        uid: user.uid,
                        message: message,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                        .then(function (docRef) {
                            console.log("Document written with ID: ", docRef.id);
                            window.location.href = "messageboard.html";
                        })
                } else {
                    $("#submit-message-fail").css("display", "block").delay(1000).fadeOut(2000);
                }

                console.log(userName, message);
                // above is the front-end submitted message template

            })

        }

    })

}


function renderPosts() {
    let cardTemplate = document.getElementById("messageCardTemplate");
    if (startIndex == 0) {
        prevButton.disabled = true;
    }
    else {
        prevButton.disabled = false;
    }
    if (startIndex != allPosts.docs.length - cardsPerPage) {
        nextButton.disabled = false;
    }
    let orderedPosts = allPosts.docs.sort((a, b) => b.data().timestamp - a.data().timestamp);
    if (startIndex == orderedPosts.length - cardsPerPage - 1) {
        nextButton.disabled = true;
    }

    for (var i = startIndex; i <= Math.min(endIndex, allPosts.docs.length - 1); i++) {
        var doc = orderedPosts[i];
        var name = doc.data().name;       // get value of the "name" key
        var message = doc.data().message;  // get value of the "messages" key
        var docID = doc.id; //USE THIS TO LINK BACK TO PROFILE OF PERSON WHO POSTED MESSAGE
        var picUrl = doc.data().profilePic;
        var time = doc.data().timestamp.toDate().toLocaleString();
        let newcard = cardTemplate.content.cloneNode(true);

        //update title and text and image
        newcard.querySelector('.card-image').src = picUrl;
        newcard.querySelector('.card-title').innerHTML = name;
        newcard.querySelector('.card-time').innerHTML = time;
        newcard.querySelector('.card-text').innerHTML = message;
        newcard.querySelector('.profile-link').href = "public_profile.html?docID=" + docID;
        newcard.querySelector('i').id = docID;
        // console.log("in populating", docID);
        // newcard.querySelector('i').onclick = () => deletePost(docID);
        //USE THIS TO LINK BACK TO PROFILE OF PERSON WHO POSTED MESSAGE
        // newcard.querySelector('.profile-link').onclick = () => publishedUserInfo(docID);
        //attach to gallery,//
        document.getElementById("previous-messages").appendChild(newcard);
        showDeleteButton(docID)
    }

}

//check if the the uid under postID is the same as the current user
//if it is the same, then show the delete button
//if it is not the same, then hide the delete button

function showDeleteButton(docID) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // console.log(user.uid);
            var postRef = db.collection("posts").doc(docID);
            postRef.get().then(postDoc => {
                var postUID = postDoc.data().uid;
                if (postUID == user.uid) {
                    // console.log("I am the post owner! show delete button");
                    console.log("postID is - " + docID);
                    var delIcon = document.getElementById(docID);
                    delIcon.style.display = "block";
                    delIcon.onclick = () => deletePost(docID);
                } else {
                    console.log("hide delete button");
                    var delIcon = document.getElementById(docID);
                    delIcon.style.display = "none";
                }
            })
        }
    })
}


function deletePost(docID) {
    console.log("in delete", docID);
    var result = confirm("Want to delete?");
    if (result) {
        console.log(docID);
        //Logic to delete the item
        db.collection("posts").doc(docID)
            .delete()
            .then(() => {
                window.location.href = "messageboard.html";
                console.log("1. Document deleted from Posts collection");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
    }
    console.log(docID + " deleted ");
}



// for the previous messages //
const cardsPerPage = 5;
var startIndex = 0;
var endIndex = cardsPerPage - 1;
var allPosts;

function displayCardsDynamically(posts) {
    db.collection(posts).get()
        .then(res => {
            allPosts = res;
            renderPosts();
        })
}

displayCardsDynamically("posts");  //input param is the name of the collection


var prevButton = document.getElementById("prev-btn");
var nextButton = document.getElementById("next-btn");


// Define a function to handle clicks on the prev button
function handlePrevClick() {
    document.getElementById("previous-messages").innerHTML = '';
    if (startIndex > 0) {
        startIndex -= cardsPerPage;
        endIndex -= cardsPerPage;
        renderPosts();
    }
}

// Define a function to handle clicks on the next button
function handleNextClick() {
    document.getElementById("previous-messages").innerHTML = '';
    if (endIndex < allPosts.docs.length - 1) {
        startIndex += cardsPerPage;
        endIndex += cardsPerPage;
        renderPosts();
    }
}


// Add event listeners to the prev/next buttons
prevButton.addEventListener("click", handlePrevClick);
nextButton.addEventListener("click", handleNextClick);



$(document).ready() 