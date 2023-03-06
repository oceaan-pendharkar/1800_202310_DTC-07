//A function to submit a message to the database (Oceaan & Grace)
function submitMessage() {
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

                // just a placeholder until we know what to do here
                let message = document.getElementById("message").value;

                if (document.getElementById("inlineRadio1").checked) {
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
                } else if (document.getElementById("inlineRadio2").checked) {
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
            })
        }
    })

    
    console.log(username, message);


}











// const setup = () => {
//     console.log("Hello World!")

// }

// $(document).ready(setup)