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
                postsRef.add({
                    name: userName,
                    uid: user.uid,
                    message: message
                })

                // front-end submitted message goes here
                //check if the user is posting a info message or a seek help request
                if (document.getElementById("info_radio").checked) {
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
                    );
                } else if (document.getElementById("seekHelp_radio").checked) {
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
                    );
                }

                console.log(userName, message);
                // above is the front-end submitted message template
                
            })

        }

    })

}



const setup = () => {
    console.log("Hello World!")

}

$(document).ready(setup)