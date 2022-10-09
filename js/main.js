// function is called on loading screen, event listener calls getResults
const init = () => {
  let searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", getResults);
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

      // console.log(data.total_count);

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



}

window.onload = init;