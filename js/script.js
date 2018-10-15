// ============================================
//   Pagination Scripts
// ============================================

// Global Variables
const $pageHeader = $('.page-header');
const $studentList = $('.student-list');
const $studentItems = $('.student-item');

// Function to show a single page of items according to the indicated number of items per page and the page number
const showSinglePage = (listItem, itemsPerPage, page) => {

  // Loop through each of the list items
  listItem.each( function(i) {

    // If the list item is outside the desired range...
    if (listItem.index(this) < (itemsPerPage * (page - 1)) || listItem.index(this) >= (itemsPerPage * page)) {

      // Hide the list item
      $(this).fadeOut(300);
    }
    // Otherwise...
    else {
      // Show the list item
      $(this).delay(300).fadeIn(300);
    }

  }); // End of each loop
}; // End of showSinglePage()

// Set initial page of list items
showSinglePage($studentItems, 10, 1);


// Function to get number of pages needed based on selected array of list items and selected number of items per page
const pageQty = (listItems, itemsPerPage) => {
  return Math.ceil(listItems.length / itemsPerPage);
};


// Function to dynamically create pagination links
const createPaginationLinks = (listItems, itemsPerPage) => {
  // Create div in which to place ul of pagination links
  let $paginDIV = $('<div></div>');
  // Add class "pagination" to div
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

  // Add class "active" to first pagination link
  $('.pagination a').eq(0).attr('class', 'active');

}; // End of paginate()

// Call function
createPaginationLinks($studentItems, 10);


// Function to select the right batch of list items when user clicks pagination buttons
const selectPage = () => {
  // Get pagination links
  const $pLinks = $('.pagination a');

  // When a pagination link is clicked...
  $pLinks.on('click', (e) => {
    // Get page number
    const pageNumber = e.target.textContent;

    // Prevent default behavior
    e.preventDefault();

    // Remove class "active" from all links
    $pLinks.removeClass('active');

    // Add class "active" to clicked link
    $(e.target).addClass('active');

    // Show the appropriate page of items
    showSinglePage($studentItems, 10, pageNumber);

  }); // end of click event handler

}; // end of selectPage()

// Call above function
selectPage();
