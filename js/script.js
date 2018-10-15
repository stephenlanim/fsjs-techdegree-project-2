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
const showSinglePage = (listItem, itemsPerPage, page) => {

  // Loop through each of the list items
  listItem.each( function(i) {

    // If the list item is outside the desired range...
    if (listItem.index(this) < (itemsPerPage * (page - 1)) || listItem.index(this) >= (itemsPerPage * page)) {

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

// Function to get number of pages needed based on selected array of list items and selected number of items per page
const pageQty = (listItems, itemsPerPage) => {
  return Math.ceil(listItems.length / itemsPerPage);
};

// console.log(pageQty($studentItems, 10));

// Create and append the pagination links - Creating a function that can do this is a good approach
// Function to dynamically create pagination links
const createPaginationLinks = (listItems, itemsPerPage) => {
  // Create div in which to place ul of pagination links
  let $paginDIV = $('<div></div>');
  // Add class .pagination to div
  $paginDIV.attr('class', 'pagination');
  // Create ul for pagination links
  let $paginUL = $('<ul></ul>');

  // Create a pagination link for each group of list items
  for (let i = 0; i < pageQty(listItems, itemsPerPage); i++) {
    // Create new pagination link
    const $paginLink = $(`<a href="#">${i + 1}</a>`);
    // Create new LI and append pagination link to it
    const $paginLI = $('<li></li>').append($($paginLink));
    // Append Li to UL
    $paginUL.append($paginLI);

  } // end of for loop


  // Append UL of pagination links to DIV
  $paginDIV.append($paginUL);

  // Insert pagination DIV after list of students
  $paginDIV.insertAfter($studentList);

  // Add class .active to first pagination link
  $('.pagination a').eq(0).attr('class', 'active');

}; // End of paginate()

// Call function
createPaginationLinks($studentItems, 10);



// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here

// Strategy: Maybe I need to place students into arrays in batches by ten (or indicated quantity) and then place each batch-array into another array. Each batch-array will be selected to show by clicking the appropriate page button.

const selectPage = (page) => {
  // Note: Use Math.round() and divide or multiply by 10 as needed.


};



// const qtyToShow = [];
