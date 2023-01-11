let searchHistoryDiv = document.querySelector('#search-history');
var searchFormEl = document.querySelector('#search-form');
var searchResultsDiv = document.querySelector('#search-Results')
var activeCityDiv = document.querySelector('#active-city-display');

let recentSearchArray = [];
let weatherApiKey = "955a5d965b004042021d1610ea49b6a8";
let lat = "" ;
let lon = "";


//------------Search Bar Feature------------
function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = document.querySelector('#search-input').value;

  
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }
  
    geoLocSearchAPI(searchInputVal);
  }
  searchFormEl.addEventListener('submit', handleSearchFormSubmit);

//*****GEOLOC Func*****
function geoLocSearchAPI(searchedCity) {
let geoLocAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + "&limit=5&appid=" + weatherApiKey
fetch(geoLocAPI)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (locRes) {
        console.log("location response: ", locRes);
        console.log("LocRes Length: ", locRes.length)
        if (locRes.length === 0) {
            console.log('No results found!');
            //resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
          } else {
            for (var i = 0; i < locRes.length; i++) {
            selectCity(locRes[i]);
        }}
        })
      .catch(function (error) {
        console.error(error);
      })
}
//****display search results for exact location to select***** 

let selectCity = (resultObj) => {
        const resultsDiv = document.createElement('div');
        searchResultsDiv.append(resultsDiv);
        
        
        resultsDiv.innerHTML +=
        resultObj.name + " ";
        
        resultsDiv.innerHTML +=
        resultObj.state + ", "

        resultsDiv.innerHTML +=
        resultObj.country;

        let printClick = () => {
            let searchedLon = resultObj.lon;
            let searchedLat = resultObj.lat;
            printSearchResults(searchedLon, searchedLat);
            searchResultsDiv.innerHTML = "";
            

        }
        resultsDiv.addEventListener("click", printClick) 
}

//clear search options function


//-----------------display Searched City--------------
//convert lon & lat to city to display. 
function printSearchResults(resultLon, resultLat) {
//api for lat&lon to weather display. 
let mainForecastAPI = "http://api.openweathermap.org/data/2.5/forecast?lat=" + resultLat + "&lon=" + resultLon + "&appid=" + weatherApiKey + "&units=imperial"
    fetch(mainForecastAPI)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (locRes) {
        console.log("forecast:", locRes)
        const resultBody = document.createElement('div');
        activeCityDiv.append(resultBody);
       
        resultBody.innerHTML +=
        '<strong>Temp:</strong> ' + locRes.list[0].main.temp + " F" + '<br/>';
    
        resultBody.innerHTML +=
            '<strong>Wind:</strong> ' + locRes.list[0].wind.speed + " MPH" + '<br/>';

        resultBody.innerHTML +=
            '<strong>Humidity: </strong>' + locRes.list[0].main.humidity + "%" + '<br/>';
        })
      .catch(function (error) {
        console.error(error);
      })
}




    // set up `<div>` to hold result content

  
    //resultBody.append(titleEl, bodyContentEl, linkButtonEl);
  
    //earchHistoryDiv.append(searchedCard);
  



//-----------------display Search history--------------
//***********GEOLOC History Save********



//******Search History Local Storage Function*****/
/*
function getRecentSearches() {
    storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      recentSearchesArray = JSON.parse(storedSearches);
    }
    return recentSearchesArray;
  }

*/
//******Search History API Function*****
/*
function sHistoryApi(query, format) {
    var geoLocAPIUrl = 'https://www.loc.gov/search/?fo=json';
  
    if (format) {
      geoLocAPIUrl = 'https://www.loc.gov/' + format + '/?fo=json';
    }
  
    geoLocAPIUrl = geoLocAPIUrl + '&q=' + query;
  
    fetch(geoLocAPIUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (locRes) {
        // write query to page so user knows what they are viewing
        resultTextEl.textContent = locRes.search.query;
  
        console.log(locRes);
  
        if (!locRes.results.length) {
          console.log('No results found!');
          resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        } else {
          resultContentEl.textContent = '';
          for (var i = 0; i < locRes.results.length; i++) {
            printSavedResults(locRes.results[i]);
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  */
//*****Search History Display Function**** 
/*
function printSavedResults(resultObj) {
    console.log(resultObj);
  
    // set up `<div>` to hold result content
    var searchedCard = document.createElement('div');
    searchedCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
  
    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    searchedCard.append(resultBody);
  
    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.title;
  
    var bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML +=
      '<strong>Temp:</strong> ' + resultObj.date + '<br/>';
  
    bodyContentEl.innerHTML +=
        '<strong>Wind:</strong> ' + resultObj.date + '<br/>';

    bodyContentEl.innerHTML +=
        '<strong>Humidity:</strong>' + resultObj.date + '<br/>';
  
  
    resultBody.append(titleEl, bodyContentEl, linkButtonEl);
  
    searchHistoryDiv.append(searchedCard);
  }




//----------------Five day forecast feature--------------

*/