// Get references to the button and search bar
const searchButton = document.getElementById('searchButton');
const searchBar = document.getElementById('searchBar');

// Add click event listener to the button
searchButton.addEventListener('click', function() {
  // Toggle the display property of the search bar
  if (searchBar.style.display === 'none' || searchBar.style.display === '') {
    searchBar.style.display = 'block';
  } else {
    searchBar.style.display = 'none';
  }
});
