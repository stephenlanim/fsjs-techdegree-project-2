/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Variables
// Add variables that store DOM elements you will need to reference and/or manipulate
const $pageHeader = $('.page-header');
const $studentList = $('.student-list');
const $studentItems = $('.student-item');


// Create a function to hide all of the items in the list except for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four
const showSinglePage = (listItem, qty, page) => {

  // Loop through each of the list items
  listItem.each( function(i) {

    // If the list item is outside the desired range...
    if (listItem.index(this) < (qty * (page - 1)) || listItem.index(this) >= (qty * page)) {

      // Hide the list item
      $(this).hide();
    }
    // Otherwise...
    else {
      // Show the list item
      $(this).show();
    }

  }); // End of each loop
}; // End of showSinglePage()

showSinglePage($studentItems, 10, 6);

// Function to count number of pages needed
const qtyOfPages = (listItem) => {
  const qtyOfListItems = () => {
    listItem
  };

};
  // Note: Use Math.round() and divide or multiply by 10 as needed.

// qtyOfPages($studentItems);

// Create and append the pagination links - Creating a function that can do this is a good approach
// Function to dynamically create pagination links
const paginate = () => {



}



// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here

// Strategy: Maybe I need to place students into arrays in batches by ten (or indicated quantity) and then place each batch-array into another array. Each batch-array will be selected to show by clicking the appropriate page button.

const selectPage = (page) => {
  // Note: Use Math.round() and divide or multiply by 10 as needed.


};



// const qtyToShow = [];
