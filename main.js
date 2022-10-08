

// Creating a request variable and assinging a new XMLHttpRequest object to it
// var request = new XMLHttpRequest();

// // Open a new connection, using the GET request on the URL endpoint
// request.open('GET', 'https://api.github.com/users/repos', true);

// request.onload = function () {
//     // access Json data here
//     var data = JSON.parse(this.response);
//     console.log(data);
// }

// // Send request
// request.send();

const init = () => {
    let searchButton = document.querySelector("#search-button");
    searchButton.addEventListener("click", getResults);
  }

const getResults = (event) => {
    let input = document.querySelector("#search-input").value;
    console.log("Got here");
    let url = 'https://api.github.com/search/repositories?q=' + input + '&per_page=30';
    let xhr = new XMLHttpRequest();
  
    xhr.open("GET", url);
  
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        let data = JSON.parse(xhr.responseText);
        console.log(data);
      }
    }
    xhr.send(null);


    // var statusHTML = '';

    // $.each(data, function(i, status) {
    //   statusHTML += '<tr>';
    //   statusHTML += '<td>' + status.id + '</td>';
    //   statusHTML += '<td>' + status.name + '</td>';
    //   statusHTML += '<td>' + status.html + '</td>';
    //   statusHTML += '<td>' + status.language + '</td>';
    //   statusHTML += '<tr>';
    // }); 

    // $('tbody').html(statusHTML);
    
  }

  window.onload = init;