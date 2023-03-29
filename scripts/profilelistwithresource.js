

/// find the item selected that was saved in local storage
var itemDocID = localStorage.getItem("itemDocID");    //visible to all functions on this page

// getItemName(itemDocID);

//replace search item with item name
$('#search-item').html(itemDocID);

db.collection("users").where("items", "array-contains", itemDocID).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const userProfile = doc.data();
            const userName = userProfile.name;
            const userProfilePicture = userProfile.profilePic;

            const profileCard = document.createElement("div");
            profileCard.className = "card";
            profileCard.id = "profileCardTemplate";

            const profilePic = document.createElement("img");
            profilePic.className = "card-img-top";
            profilePic.src = userProfilePicture;
            profilePic.alt = "Profile Picture";
            profileCard.appendChild(profilePic);

            const profileCardBody = document.createElement("div");
            profileCardBody.className = "card-body bg-light text-dark";
            profileCard.appendChild(profileCardBody);

            const profileCardTitle = document.createElement("h5");
            profileCardTitle.className = "name card-title";
            profileCardTitle.innerHTML = userName;
            profileCardBody.appendChild(profileCardTitle);

            const profileCardText = document.createElement("p");
            profileCardText.className = "card-text";
            profileCardText.innerHTML = `I have ${itemDocID}!`;
            profileCardBody.appendChild(profileCardText);

            const profileCardLink = document.createElement("a");
            profileCardLink.className = "btn btn-primary";
            profileCardLink.href = "public_profile.html?docID=" + doc.id;
            profileCardLink.innerHTML = "View Profile";
            profileCardBody.appendChild(profileCardLink);

            document.getElementById("profileCardGroup").appendChild(profileCard);

        });
    })

// save username for button clicked
