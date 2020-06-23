//function that gets the repo from the Github handle 
function callAPI(userInput) {
  const searchURL = `https://api.github.com/users/${userInput}/repos`;
  fetch(searchURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => 
    displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Uh oh...Something went wrong: ${err.message}`);
    });
    console.log('callAPI() ran');
    displayResults();
}

function displayResults(responseJson) {
  //clears previous results
  $('#results-list').empty();
  $('#results-list').append
  //for loop to run thru each search item
  for(let i = 0; i<responseJson.length; i++){
  // for each repo in array add list item with name and link
  $(`#results-list`).append(`<li><a href="${responseJson[i].html_url}" target="_blank"><h3>${responseJson[i].name}</h3></a></li><p>${responseJson[i].description}</p>
    <br>`
    )};
  // makes results section unhidden
  $(`#results`).removeClass('hidden');
  console.log('displayResults()ran.');
}

// function for waiting for the form to be submitted 
function watchForm() {
  console.log('App ready for submission!');
  $('form').submit(event => {
    event.preventDefault();
  
  const userInput = $('#js-gitHandle').val();
  $('.userInput').text( `GitHub Repositories for ${userInput}`);

  callAPI(userInput);

  });
}

$(watchForm);