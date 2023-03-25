var itemDocID = localStorage.getItem("itemDocID");    //visible to all functions on this page

/// find the item selected that was saved in local storage

function getItemName(id) {
    db.collection("resources")
      .doc(id)
      .get()
      .then((thisItem) => {
        var itemName = thisItem.data().name;
        document.getElementById("ItemName").innerHTML = itemName;
          });
}

/// populate list of profile names that have this item

getItemName(itemDocID);

function populateProfiles() {
    let profileCardTemplate = document.getElementById("profileCardTemplate");
    let profileCardGroup = document.getElementById("profileCardGroup");

    let params = new URL(window.location.href) //get the url from the searbar
    let itemID = params.searchParams.get("docID")
    
    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("resources").where( "itemDocID", "==", itemID).get()
        .then(allItems => {
            reviews=allItems.docs;
            console.log(items);
            items.forEach(doc => {
                var name = doc.data().name; //gets the name field
                var profilePicture = doc.data().level; //gets the unique ID field
                console.log(time)

                let profileCard = profileCardTemplate.content.cloneNode(true);
                reviewCard.querySelector('.name').innerHTML = profilePicture;     //equiv getElementByClassName
                reviewCard.querySelector('.profilePicture').innerHTML = profilePicture;     //equiv getElementByClassName
                itemCardGroup.appendChild(itemCard);
            })
        })
}
populateProfiles();