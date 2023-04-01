

/// find the item selected that was saved in local storage
var itemDocID = localStorage.getItem("itemDocID");    //visible to all functions on this page

// getItemName(itemDocID);

//replace search item with item name
$('#search-item').html(itemDocID);

//append user's info as a new DOM element
db.collection("users").where("items", "array-contains", itemDocID).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const userProfile = doc.data();
            const userName = userProfile.name;
            const userProfilePicture = userProfile.profilePic;

            //create the div
            const profileCard = document.createElement("div");
            profileCard.className = "card";
            profileCard.style = "width: 20rem; margin: 10px;";
            profileCard.id = "profileCardTemplate";

            //populate profile pic
            const profilePic = document.createElement("img");
            profilePic.className = "rounded-circle card-img-top";
            profilePic.style = "width: 180px; height: 180px; object-fit: cover; margin: 0 auto; padding: 10px;";
            profilePic.src = userProfilePicture;
            profilePic.alt = "Profile Picture";
            profileCard.appendChild(profilePic);

            //create div for textx
            const profileCardBody = document.createElement("div");
            profileCardBody.className = "card-body bg-light text-dark";
            profileCard.appendChild(profileCardBody);

            //populate username
            const profileCardTitle = document.createElement("h5");
            profileCardTitle.className = "name card-title";
            profileCardTitle.innerHTML = userName;
            profileCardBody.appendChild(profileCardTitle);

            //add a note to show that person has the item searched for
            const profileCardText = document.createElement("p");
            profileCardText.className = "card-text";
            profileCardText.innerHTML = `I have ${itemDocID}!`;
            profileCardBody.appendChild(profileCardText);

            //add a button to view this person's profile
            const profileCardLink = document.createElement("a");
            profileCardLink.className = "btn btn-primary";
            profileCardLink.href = "public_profile.html?docID=" + doc.id;
            profileCardLink.innerHTML = "View Profile";
            //append info to the profile card div
            profileCardBody.appendChild(profileCardLink);

            //append whole card so it is visible
            document.getElementById("profileCardGroup").appendChild(profileCard);

        });
    })

// save username for button clicked
