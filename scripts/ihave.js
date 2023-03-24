

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
      Object.keys(docData).forEach((key) => {
        // Check if the field is a string
        if (typeof docData[key] === 'string') {
          // Create a checkbox element
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.name = key;
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
        }
      });
    });
  });
}

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
  firebase.auth().onAuthStateChanged( user => {
              // Check if user is signed in:
              if ( user ) {
      
                  //go to the correct user document by referencing to the user uid
                  currentUser = db.collection( "users" ).doc( user.uid )
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
                  console.log( "No user is signed in" );
              }
          } );
  

  /// allow user to input their unique item
  
}



function saveResourceInput() {
  newItem = document.getElementById('itemName').value;


  
  firebase.auth().onAuthStateChanged( user => {
              // Check if user is signed in:
              if ( user ) {
      
                  //go to the correct user document by referencing to the user uid
                  currentUser = db.collection( "users" ).doc( user.uid )
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
                  console.log( "No user is signed in" );
              }
          } );
  
  




}