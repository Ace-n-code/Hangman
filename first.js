const itemsArray = ['Hangman', 'Subway Surfers', 'Mario', 'Sonic', 'Chess', 'Checkers', 'Fire Boy Water Girl', 'Temple Run', 'Dino','Red Ball','Blocky Blast','block Busters'];
const containerDivs = document.querySelectorAll('#container div');

// Add event listener to the submit button
document.getElementById('submit').addEventListener('click', function() {
  const query = document.getElementById('search').value.toLowerCase(); // Get the value from the search input

  // Show all divs if query is empty
  if (query === "") {
    containerDivs.forEach(div => div.classList.remove('hidden'));
    return;
  }

  // Filter items based on the query
  const filteredItems = itemsArray.filter(item => item.toLowerCase().includes(query));

  // Check if there are matching items, otherwise hide all divs
  if (filteredItems.length > 0) {
    containerDivs.forEach(div => {
      const divClassName = div.className.toLowerCase();

      // Check if the div class matches any filtered items
      const isMatch = filteredItems.some(item => divClassName.includes(item.toLowerCase()));

      // Show or hide the div based on the match
      if (isMatch) {
        div.classList.remove('hidden'); // Show matching divs
      } else {
        div.classList.add('hidden'); // Hide non-matching divs
      }
    });
  } else {
    // If no matches are found, hide all divs
    containerDivs.forEach(div => div.classList.add('hidden'));
  }
});