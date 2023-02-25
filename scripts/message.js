//A function to submit a message to the database (Oceaan)
function submitMessage() {
    // just a placeholder until we know what to do here
    let username = document.getElementById("username").value;
    let message = document.getElementById("message").value;
    $("#message-board").append(`
    <div class="message container">
        <div class="row">
            <div class="col-2">
                    <img width="80px" height="80px" src="./images/userplaceholder.jpeg">
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
                    </div>
                </div>
            </div>
        </div>
            <a class="link">Contact User</a>
    </div>`
    );
    console.log(username, message);
}

// const setup = () => {
//     console.log("Hello World!")

// }

// $(document).ready(setup)