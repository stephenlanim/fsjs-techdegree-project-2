/*jshint esversion: 6 */
// ============================================
//   Functions to Call On Page Load
// ============================================
$( document ).ready( function () {

  // Set initial page of list items
  showSinglePage($studentItems, 10, 1);

  // Create initial pagination links
  createPaginationLinks($studentItems, 10);

  // Create search feature items
  createSearch();

  // Initialize event listeners
  selectPage($studentItems);
  searchOnBtnClick($studentItems);
  searchOnEnter($studentItems);
  cancelSearch($studentItems);
  // webkitCancel($studentItems);

});


// ============================================
//   Pagination Scripts
// ============================================

// Global Variables
const $studentList = $('.student-list');
const $studentItems = $('.student-item');

// Function to show a single page of items according to the indicated number of items per page and the page number
const showSinglePage = (listItems, itemsPerPage, page) => {

  // Loop through each of the list items
  listItems.each( function(i) {

    // If the list item is outside the desired range...
    if (listItems.index(this) < (itemsPerPage * (page - 1)) || listItems.index(this) >= (itemsPerPage * page)) {

      // Hide the list item
      $(this).fadeOut(300);
    }
    // Otherwise...
    else {
      // Show the list item
      $(this).delay(300).fadeIn(300);
    }

  }); // end of each loop
}; // end of showSinglePage()


// Function to get number of pages needed based on selected array of list items and selected number of items per page
const pageQty = (listItems, itemsPerPage) => {
  return Math.ceil(listItems.length / itemsPerPage);
};


// Function to dynamically create pagination links
const createPaginationLinks = (listItems, itemsPerPage) => {
  // Create div in which to place UL of pagination links
  const $paginDIV = $('<div></div>')
    // Add class "pagination" to DIV to apply CSS and specify node
    .addClass('pagination');

  // Create UL for pagination links
  const $paginUL = $('<ul></ul>');

  // Create a pagination link for each group of list items
  for (let i = 0; i < pageQty(listItems, itemsPerPage); i++) {
    // Create new pagination link
    const $paginLink = $(`<a href="#">${i + 1}</a>`);

    // Create new LI and append pagination link to it
    const $paginLI = $('<li></li>').append($($paginLink));

    // Append LI to UL
    $paginUL.append($paginLI);

  } // end of for loop

  // Append UL of pagination links to DIV
  $paginDIV.append($paginUL);

  // Insert pagination DIV after list of students
  $paginDIV.insertAfter($studentList);

  // Add class "active" to first pagination link
  $('.pagination a').eq(0).attr('class', 'active');

}; // end of paginate()

// Function to select the right batch of list items when user clicks pagination buttons
const selectPage = (listItems) => {
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
    showSinglePage(listItems, 10, pageNumber);

  }); // end of click event handler

}; // end of selectPage()

// ============================================
//   Filter Scripts
// ============================================

// Global Variables
const $pageHeader = $('.page-header');

// Function to dynamically add search bar
const createSearch = () => {
  // Create search bar DIV
  const $searchArea = $('<div></div>')
    // Add class "student-search" to apply CSS and specify node
    .addClass('student-search');

  // Create search field w/ appropriate type and placeholder
  const $searchField = $('<input>').attr('id', 'userInput').attr('type', 'search').attr('placeholder', 'Search for students...');

  // Remove Webkit default styles for search input
  $searchField.css('-webkit-appearance', 'unset');

  // Append search field to search area
  $searchArea.append($searchField);

  // Create search button w/ appropriate type and ID and then add text "Search" inside
  const $searchBtn = $('<button></button>').attr('type', 'button').attr('id', 'searchBtn').text('Search');

  // Append search button to inside search area
  $searchArea.append($searchBtn);

  // Append search area to page header
  $pageHeader.append($searchArea);

}; // end of createSearch()

// When user clicks on search button...
const searchOnBtnClick = (listItems) => {
  // Get search button
  const $searchBtn = $('#searchBtn');

  // When search button is clicked...
  $searchBtn.on('click', function (e) {

    filterList(listItems);

  }); // end of click handler

};

// Function to filter page list
const filterList = (listItems) => {

    // Remove any message present on screen
    removeScreenMessages();

    // If user input is empty...
    if ($('#userInput').val().toLowerCase() === '') {

      resetPage(listItems);

    } // and of "if user input is empty" statement


    // Otherwise... perform appropriate tasks
    else {

      // For each list item...
      listItems.each( function (){
        // Get student name
        const $studentName = $(this).find('h3').text().toLowerCase();
        // Get user search input
        const $userInput = $('#userInput').val().toLowerCase();

        // If list item text contains text from user input...
        if ($studentName.includes($userInput)) {
          // Show list item
          $(this).show();
        }
        // Otherwise...
        else {
          // Hide list item
          $(this).hide();
        }
      }); // end of each loop

      // Initialize array of search results
      const searchResults = [];

      // If search input is NOT empty...
      if ($('#userInput').val().toLowerCase() !== '') {

        // For each list item...
        listItems.each( function () {
          // If this list item is among the search results (is shown)...
          if (this.style.display !== 'none') {
            // Add it to the search results array
            searchResults.push(this);
          }
        }); // end of each loop

        // If there are no search results...
        if (searchResults.length === 0) {
          insertNoResultsMessage();

          // Remove current pagination links
          $('.pagination').remove();
        }
        // Otherwise,if there are search results
        else {
          resetPage($(searchResults));
        }

      } // end of "if search input is NOT empty" statement

    } // end of major else statement

}; // end of filterList()


// Function to display "no results" message
const insertNoResultsMessage = () => {
  // Get user search input
  const $userInput = $('#userInput').val();
    // Create message
    const noResultsMessage = `<div class="message"><p>Sorry. No results were found for "${$userInput}." Please try another name.</p></div>`;
    // Insert message after page header
    $(noResultsMessage).insertAfter($pageHeader);
}; // end of insertNoResultsMessage()

const removeScreenMessages = () => {
  $('.message').remove();
}; // end of removeScreenMessages()


// Function to reset page main content and pagination links
const resetPage = (listItems) => {
  // Display full list of items with original pagination
  showSinglePage(listItems, 10, 1);

  // Remove current pagination links
  $('.pagination').remove();

  // Remove any message present on screen
  removeScreenMessages();

  // Recreate default pagination links
  createPaginationLinks(listItems, 10);

  // Reactivate click listener for pagination links
  selectPage(listItems);
}; // end of resetPage()

// Function to activate search feature when user hits Enter key
const searchOnEnter = (listItems) => {
  $('#userInput').on('keyup', function (e) {

    // If user input is empty...
    if (e.key === 'Enter') {

      filterList(listItems);

    } // and of "if user input is empty" statement
  });
}; // end of searchOnEnter()

// Function to reset page if user empties the search field
const cancelSearch = (listItems) => {
  $('#userInput').on('keyup', function (e) {

    // If user input is empty...
    if ($('#userInput').val().toLowerCase() === '') {

      resetPage(listItems);

    } // and of "if user input is empty" statement
  });
}; // end of cancelSearch()


// Function to reset pages when user cancels search in a webkit browser
const webkitCancel = (listItems) => {
  // Get "x" cancel button in webkit browser
  const $pseudoCancelBtn = $('[pseudo=-webkit-search-cancel-button]');
  // When user clicks cancel button...
  $pseudoCancelBtn.on('click', () => {
    console.log(this);
    // resetPage(listItems);
  });
}; // end of webkitCancel()
// Cancel button inside search field = <div pseudo="-webkit-search-cancel-button" aria-label="cancel" role="button"></div> in Safari

// 10-15-2018: I ultimately could not get this webkitCancel() function to work because the element I want to select was generated by the User Agent in the Shadow DOM and is therefore closed (cannot be accessed, let alone manipulated). I can only access Shadow DOM elements that I create. Disappointing, but I've covered every other uer interaction I can think of.
