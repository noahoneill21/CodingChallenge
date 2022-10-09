// function is called on loading screen, event listener calls getResults
const init = () => {
  let searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", getResults);

  let searchHistory = document.querySelector("#selectBox");
  searchHistory.addEventListener("change", populateFromHistory);
}

// Fetches results from query url string and lists properties in table
const getResults = (event) => {
  let input = document.querySelector("#search-input").value;
  let url = 'https://api.github.com/search/repositories?q=' + input + '&per_page=30';
  let xhr = new XMLHttpRequest();

  xhr.open("GET", url);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      let data = JSON.parse(xhr.responseText);

      var statusHTML = '';
      if (data.items) {
        // Populates table from data object
        for (var i = 0; i < data.items.length; i++) {
          statusHTML += '<tr>';
          statusHTML += '<td>' + data.items[i].id + '</td>';
          statusHTML += '<td>' + data.items[i].name + '</td>';
          statusHTML += '<td>' + data.items[i].url + '</td>';
          statusHTML += '<td>' + data.items[i].language + '</td>';
          statusHTML += '<tr>';
        }
      }
      $('tbody').html(statusHTML);


      document.querySelector("#selectBox").value = "none";


    }
  }
  xhr.send(null);
  addSearchHistory(input);


}

// This function populates the table from selecting a value from the drop down menu
function populateFromHistory() {
  let input = document.querySelector("#selectBox").value;
  let url = 'https://api.github.com/search/repositories?q=' + input + '&per_page=30';
  let xhr = new XMLHttpRequest();

  xhr.open("GET", url);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      let data = JSON.parse(xhr.responseText);

      var statusHTML = '';

      // Populates table from data object
      for (var i = 0; i < data.items.length; i++) {
        statusHTML += '<tr>';
        statusHTML += '<td>' + data.items[i].id + '</td>';
        statusHTML += '<td>' + data.items[i].name + '</td>';
        statusHTML += '<td>' + data.items[i].url + '</td>';
        statusHTML += '<td>' + data.items[i].language + '</td>';
        statusHTML += '<tr>';
      }
      $('tbody').html(statusHTML);
    }
  }
  xhr.send(null);

  document.querySelector("#search-input").value = "";

}

// This method adds a new record in the search history drop down menu
function addSearchHistory(input) {
  let selectBox = document.querySelector("#selectBox");
  let alreadyExists = false;
  for (let i = 0; i < selectBox.options.length; i++) {
    if(selectBox.options[i].innerHTML == input) {
      alreadyExists = true;
      break;
    }
  }
  if (!alreadyExists) {
    var opt = document.createElement('option');
    opt.value = input;
    opt.innerHTML = input;
    selectBox.appendChild(opt);
  }
}


// Calls init function on load
window.onload = init;