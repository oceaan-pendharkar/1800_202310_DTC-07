

$(document).ready(function () {
  $(".button-other").click(function () {
    alert(Hello);
  });
});


$(".close-btn").click(function () {
  $("#edit-items").modal('hide');
});


/// make checkboxes from database
function generateCheckboxes() {
  const resourcesRef = firebase.firestore().collection('resources');
  const checkboxesContainer = document.getElementById('checkboxes');

  resourcesRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const docData = doc.data();

      // Loop through the fields of the document
      Object.keys(docData).sort().forEach((key) => {
        // Check if the field is a string
        if (typeof docData[key] === 'string') {
          // Create a checkbox element
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.name = key;
          checkbox.id = key;
          checkbox.value = docData[key];

          // Create a label element
          const label = document.createElement('label');
          label.textContent = key

          // Create a div element to wrap the checkbox and label
          const div = document.createElement('div');
          div.style.display = 'block';
          div.appendChild(checkbox);
          div.appendChild(label);

          // Add the div element to the checkboxes container
          checkboxesContainer.appendChild(div);

          firebase.auth().onAuthStateChanged(user => {
            // Check if user is signed in:
            if (user) {

              //go to the correct user document by referencing to the user uid
              currentUser = db.collection("users").doc(user.uid)
              currentUser.get().then(userDoc => {
                //get the user name
                var items = userDoc.data().items;
                if (items != null) {
                  for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var checkbox = document.getElementById(item);
                    checkbox.checked = true;
                  }
                }
              })
            }
          })

        }
      });
    });
  });
}

//append items not in the resources list
appendOtherItems();
// Call the generateCheckboxes function
generateCheckboxes();



/// To save selected checkboxes to Firestore in user's document
function saveResourceUpdate() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const IHaveList = [];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      IHaveList.push(checkbox.value);
    }
  });
  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {

      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid)
      return currentUser.update({
        items: IHaveList
      })
        .then(() => {
          console.log("Resource update saved successfully!");
          location.replace("thanksresourcesupdate.html")
        })
        .catch((error) => {
          console.error("Error saving resources: ", error);
        });

    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });

}



function saveResourceInput() {
  newItem = document.getElementById('itemName').value;



  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {

      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid)
      return currentUser.update({
        items: firebase.firestore.FieldValue.arrayUnion(newItem)
      }, { merge: true })
        .then(() => {
          console.log("Resource update saved successfully!");
          location.replace("thanksresourcesupdate.html")
        })
        .catch((error) => {
          console.error("Error saving resources: ", error);
        });

    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });




}

//appends items that user self-selected to list of other items so they can edit
function appendOtherItems() {
  // get user's list of items
  const checkboxesContainer = document.getElementById('checkboxes');
  const resourcesRef = ['Backpack',
    'Batteries',
    'Blanket',
    'Boxes',
    'Bungee cords',
    'Can opener',
    'Duct tape',
    'Electrolytes',
    'Face masks',
    'Flashlight',
    'Food(general)',
    'Food(gluten free)',
    'Food(halal)',
    'Food(vegetarian / vegan)',
    'Gloves(medical)',
    'Gloves(warm)',
    'Heater',
    'Portable stove',
    'Power pack',
    'Rope',
    'Shovel(general)',
    'Shovel(snow)',
    'Soap (dish)',
    'Soap (hand)',
    'Toilet Paper',
    'Water',
    'Wifi hotspot',
    'Women\'s hygiene products '];

  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid)
      currentUser.get().then(userDoc => {
        //get the user name
        var items = userDoc.data().items;
        if (items != null) {
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var checkbox = document.getElementById(item);

            if (resourcesRef.includes(item) == false) {
              var checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.name = item;
              checkbox.id = item;
              checkbox.value = item;

              // Create a label element
              const label = document.createElement('label');
              label.textContent = item

              // Create a div element to wrap the checkbox and label
              const div = document.createElement('div');
              div.style.display = 'block';
              div.appendChild(checkbox);
              div.appendChild(label);

              checkboxesContainer.appendChild(div);
            }


            checkbox.checked = true;
          }
        }
      })
    }
  })

}
