$(document).ready(function () {
  $(".button-other").click(function () {
    alert(Hello);
  });
});

$(".close-btn").click(function () {
  $("#edit-items").modal('hide');
});


function generateCheckboxes() {
  const resourcesRef = firebase.firestore().collection('resources');
  const checkboxesContainer = document.getElementById('my-checkboxes');
  
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
          label.textContent = key + ': ' + docData[key];
          
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