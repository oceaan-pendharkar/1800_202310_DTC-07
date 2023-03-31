// Get a reference to the HTML dropdown element where we will display the values
const dropdown = document.getElementById("my-dropdown");

// Get the collection reference for the desired collection
const collectionRef = db.collection("resources");


function populateDropdown() {
  // Fetch the documents from the collection
  collectionRef.get().then((querySnapshot) => {
    // Loop through each document and get its string fields
    const values = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      for (const key in data) {
        if (typeof data[key] === "string") {
          values.push(data[key]);
        }
      }
    });

    values.sort();


    // Populate the dropdown with the values
    values.forEach((value) => {
      const option = document.createElement("option");
      option.text = value;
      dropdown.add(option);
    });
    option = document.createElement("option");
    option.text = "";
    option.selected = true;
    dropdown.add(option);
  });
}

// Call the populateDropdown function to start populating the dropdown
populateDropdown();

function saveItemDocumentIDAndRedirect() {
  let params = new URL(window.location.href) //get the url from the search bar
  let ID = $('#my-dropdown').val(); //get the value of the dropdown
  console.log("dropdown:", ID)
  localStorage.setItem('itemDocID', ID);
  window.location.href = 'profilelistwithresource.html';
  console.log(window.location.href)
}