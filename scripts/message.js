//A function to submit a message to the database (Oceaan)
function submitMessage() {
    // just a placeholder until we know what to do here
    let username = document.getElementById("username").value;
    let message = document.getElementById("message").value;
    $("#message-board").prepend(`
    <div class="message container">
        <div class="row">
            <div class="col-2">
                    <img width="100%" height="auto" src="./images/userplaceholder.jpeg">
            </div>
            <div class="col-10">
                 <div class="row">
                    <div class="col-12">
                        <h5>${username}</h5>
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
    console.log(username, message);
}

// const setup = () => {
//     console.log("Hello World!")

// }

// $(document).ready(setup)