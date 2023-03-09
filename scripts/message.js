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
userMessageInfo()




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

                //push message to firestore
                if (message != "") {
                    postsRef.add({
                        name: userName,
                        uid: user.uid,
                        message: message
                    })
                } 
                $("#message").val(""); //clear the message box

                // front-end submitted message goes here
                //check if the user is posting a info message or a seek help request
                if (document.getElementById("info_radio").checked) {
                    if (message != "") {
                        $("#messageposts").prepend(
                            `<div class="message container">
                                <div class="row">
                                    <div class="col-2">
                                            <img width="100%" height="auto" src="./images/userplaceholder.jpeg">
                                    </div>
                                    <div class="col-10">
                                        <div class="row">
                                            <div class="col-12">
                                                <h5>${userName}</h5>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <p>${message}</p>
                                                <a class="link">Contact User</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>        
                            </div>`
                        )} else {
                            alert("Please enter a message");
                        };
                } else if (document.getElementById("seekHelp_radio").checked) {
                    if (message != "") {
                        $("#messageposts").prepend(
                            `<div class="message container">
                                <div class="row">
                                    <div class="col-2">
                                            <img width="100%" height="auto" src="./images/userplaceholder.jpeg">
                                    </div>
                                    <div class="col-10">
                                            <div class="row">
                                            <div class="col-12">
                                                <h5><span><img height="30" src="./images/sos.png" alt=""></span> ${userName}</h5>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <p>${message}</p>
                                                <a class="link">Contact User</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>        
                            </div>`
                        )} else {
                            alert("Please enter a message");
                        };
                } else if (message == "") {
                    alert("Please select the category and enter a message");
                };

                console.log(userName, message);
                // above is the front-end submitted message template
                
            })

        }

    })

}

function renderPosts(posts) {
    let cardTemplate = document.getElementById("messageCardTemplate");

    for (var i = startIndex; i <= endIndex; i++) {
        var doc = allPosts.docs[i];
        var name = doc.data().name;       // get value of the "name" key
        var message = doc.data().message;  // get value of the "messages" key
        // var docID = doc.id; USE THIS TO LINK BACK TO PROFILE OF PERSON WHO POSTED MESSAGE
        let newcard = cardTemplate.content.cloneNode(true);

        //update title and text and image
        newcard.querySelector('.card-title').innerHTML = name;
        newcard.querySelector('.card-text').innerHTML = message;
        // newcard.querySelector('a').href = "eachHike.html?docID="+docID; USE THIS TO LINK BACK TO PROFILE OF PERSON WHO POSTED MESSAGE

        //attach to gallery,//
        document.getElementById("previous-messages").appendChild(newcard);

    }
}


 // for the previous messages //
const cardsPerPage = 3;
var startIndex = 0;
var endIndex = cardsPerPage - 1;
var allPosts;

function displayCardsDynamically(posts) {
    db.collection(posts).get()   
        .then(res=> {
            allPosts = res;
            renderPosts("posts");
        })
}

displayCardsDynamically("posts");  //input param is the name of the collection


var prevButton = document.getElementById("prev-msg-btn");
var nextButton = document.getElementById("next-msg-btn");


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
    if (endIndex < allHikes.docs.length - 1) {
        startIndex += cardsPerPage;
        endIndex += cardsPerPage;
        renderPosts();
    }
}

// Add event listeners to the prev/next buttons
prev-msg-btn.addEventListener("click", handlePrevClick);
next-msg-btn.addEventListener("click", handleNextClick);



$(document).ready(setup)