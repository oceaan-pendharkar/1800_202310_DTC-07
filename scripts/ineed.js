function populateDropdown() {
    // Fetch the documents from the collection
    resourcesRef.get().then((querySnapshot) => {
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
  
      // Populate the dropdown with the values
      values.forEach((value) => {
        const option = document.createElement("option");
        option.text = value;
        my-dropdown.add(option);
      });
    });
  }
  
  // Call the populateDropdown function to start populating the dropdown
  populateDropdown();