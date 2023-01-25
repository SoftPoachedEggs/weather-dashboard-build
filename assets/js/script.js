var searchFormEl = document.querySelector('#search-form');
var searchResultsDiv = document.querySelector('#search-Results')
var activeCityDiv = document.querySelector('#active-city-display');

var oneDayForecast = document.querySelector('#oneOut-Forecast');
var twoDayForecast = document.querySelector('#twoOut-Forecast');
var threeDayForecast = document.querySelector('#threeOut-Forecast');
var fourDayForecast = document.querySelector('#fourOut-Forecast');
var fiveDayForecast = document.querySelector('#fiveOut-Forecast');



let recentSearchArray = new Array(9);
let weatherApiKey = "955a5d965b004042021d1610ea49b6a8";
let lat = "" ;
let lon = "";

let now = dayjs();
let formattedDisplayDate = now.format('MM/DD/YYYY');
let oneOutDate = now.add(1, 'day').format('MM/DD/YYYY');
let twoOutDate = now.add(2, 'day').format('MM/DD/YYYY');
let threeOutDate = now.add(3, 'day').format('MM/DD/YYYY');
let fourOutDate = now.add(4, 'day').format('MM/DD/YYYY');
let fiveOutDate = now.add(5, 'day').format('MM/DD/YYYY');


console.log("recent memory:", recentSearchArray);

//------------Search Bar Feature------------
function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = document.querySelector('#search-input').value;

  
    if (!searchInputVal) {
      searchResultsDiv.innerHTML = '<h4>Please enter city name and try again.</h4>'
      console.error('You need a search input value!');
      return;
    }
    searchResultsDiv.innerHTML = ""
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
            searchResultsDiv.innerHTML = '<h4>No results found. Search again.</h4>';
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
        console.log("result div: ". resultsDiv)
        resultsDiv.setAttribute("role", 'button')
        resultsDiv.setAttribute("class", 'btn btn-info btn-block bg-#0dcaf0 text-light');
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
            let name =  resultObj.name + " " + resultObj.state;
            let lon = searchedLon;
            let lat = searchedLat;
          
            saveViewedCity(name, lon, lat);
            populateRecentSearches(name, lon, lat);
            searchResultsDiv.innerHTML = "";
        }
        resultsDiv.addEventListener("click",() => {
        printClick();
      });
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
        printCurrentWeather(locRes);
        printFiveDayWeather(locRes);
        })
      .catch(function (error) {
        console.error(error);
      })
}

  let printCurrentWeather = (locRes) => {
    console.log("forecast:", locRes)
       
        const resultBody = document.createElement('div');
        activeCityDiv.innerHTML = ""
        activeCityDiv.append(resultBody);
       
       
        resultBody.innerHTML +=
        '<h2><strong> Today in ' + locRes.city.name + '</strong></h3>';
        resultBody.innerHTML +=
          '<h3>' + formattedDisplayDate + '</h3>';
        resultBody.innerHTML +=
          '<img src="http://openweathermap.org/img/wn/' + locRes.list[0].weather[0].icon + '@4x.png">' + '<br/>';
        resultBody.innerHTML +=
        '<strong>Temp:</strong> ' + locRes.list[0].main.temp + " F" + '<br/>';
        resultBody.innerHTML +=
            '<strong>Wind:</strong> ' + locRes.list[0].wind.speed + " MPH" + '<br/>';
        resultBody.innerHTML +=
            '<strong>Humidity: </strong>' + locRes.list[0].main.humidity + "%" + '<br/>';
}

//display five day weather forecast on screen with below
let printFiveDayWeather = (locRes) => {
  console.log("5 day forecast:", locRes)
      oneDayForecast.innerHTML = "";
      twoDayForecast.innerHTML = "";
      threeDayForecast.innerHTML = "";
      fourDayForecast.innerHTML = "";
      fiveDayForecast.innerHTML = "";
      

      oneDayForecast.innerHTML +=
      '<h3>' + oneOutDate + '</h3>'
      oneDayForecast.innerHTML +=
      '<img src="http://openweathermap.org/img/wn/' + locRes.list[7].weather[0].icon + '@2x.png">' + '<br/>';
      oneDayForecast.innerHTML +=
      '<strong>Temp:</strong> ' + locRes.list[7].main.temp + " F" + '<br/>';
      oneDayForecast.innerHTML +=
          '<strong>Wind:</strong> ' + locRes.list[7].wind.speed + " MPH" + '<br/>';
      oneDayForecast.innerHTML +=
          '<strong>Humidity: </strong>' + locRes.list[7].main.humidity + "%" + '<br/>';
      
      twoDayForecast.innerHTML +=  
        '<h3>' + twoOutDate + '</h3>'
      twoDayForecast.innerHTML +=
        '<img src="http://openweathermap.org/img/wn/' + locRes.list[15].weather[0].icon + '@2x.png">' + '<br/>';
      twoDayForecast.innerHTML +=
        '<strong>Temp:</strong> ' + locRes.list[15].main.temp + " F" + '<br/>';
      twoDayForecast.innerHTML +=
        '<strong>Wind:</strong> ' + locRes.list[15].wind.speed + " MPH" + '<br/>';
      twoDayForecast.innerHTML +=
        '<strong>Humidity: </strong>' + locRes.list[15].main.humidity + "%" + '<br/>';
      
      threeDayForecast.innerHTML +=  
        '<h3>' + threeOutDate + '</h3>'
      threeDayForecast.innerHTML +=
        '<img src="http://openweathermap.org/img/wn/' + locRes.list[23].weather[0].icon + '@2x.png">' + '<br/>';
      threeDayForecast.innerHTML +=
        '<strong>Temp:</strong> ' + locRes.list[23].main.temp + " F" + '<br/>';
      threeDayForecast.innerHTML +=
        '<strong>Wind:</strong> ' + locRes.list[23].wind.speed + " MPH" + '<br/>';
      threeDayForecast.innerHTML +=
        '<strong>Humidity: </strong>' + locRes.list[23].main.humidity + "%" + '<br/>';
      
      fourDayForecast.innerHTML +=  
        '<h3>' + fourOutDate + '</h3>'
      fourDayForecast.innerHTML +=
        '<img src="http://openweathermap.org/img/wn/' + locRes.list[31].weather[0].icon + '@2x.png">' + '<br/>';
      fourDayForecast.innerHTML +=
        '<strong>Temp:</strong> ' + locRes.list[31].main.temp + " F" + '<br/>';
      fourDayForecast.innerHTML +=
        '<strong>Wind:</strong> ' + locRes.list[31].wind.speed + " MPH" + '<br/>';
      fourDayForecast.innerHTML +=
        '<strong>Humidity: </strong>' + locRes.list[31].main.humidity + "%" + '<br/>';

      fiveDayForecast.innerHTML +=  
        '<h3>' + fiveOutDate + '</h3>'
      fiveDayForecast.innerHTML +=
        '<img src="http://openweathermap.org/img/wn/' + locRes.list[39].weather[0].icon + '@2x.png">' + '<br/>';
      fiveDayForecast.innerHTML +=
        '<strong>Temp:</strong> ' + locRes.list[39].main.temp + " F" + '<br/>';
      fiveDayForecast.innerHTML +=
        '<strong>Wind:</strong> ' + locRes.list[39].wind.speed + " MPH" + '<br/>';
      fiveDayForecast.innerHTML +=
        '<strong>Humidity: </strong>' + locRes.list[39].main.humidity + "%" + '<br/>';
}



//-----------------display Search history--------------

  //create array to store user search values
  var recentSearchesArray = [];
  //set the location you want these to display here.... 
  populateRecentSearches();
  
  //populate the recent search display with the user's recent player searches
  function populateRecentSearches(name, lon, lat) {
    
  const recentSearchDisplay = document.querySelector("#search-history");
  recentSearchDisplay.innerHTML = "";
  
    //get the recent searches out of local storage
    var recentSearchArray = getRecentSearches();
  // if (name && lon && lat) {
  //   console.log("about to shift here: ")
  //   recentSearchArray.shift({name,lon,lat})
  // }

  console.log("recent search array (under unshift): ", recentSearchArray)
  console.log("name,lon,lat : ", {name,lon,lat})

    // this loop works in reverse to display newest first
    for (let i = recentSearchArray.length - 1; i >= 0; i--) {
      const recentSearched = "result-button"
      const newSearchedButton = document.createElement("button");
      newSearchedButton.setAttribute("id", recentSearched);
      newSearchedButton.setAttribute("class", 'btn btn-info btn-block bg-warning text-dark');
      
      recentSearchDisplay.appendChild(newSearchedButton);
        newSearchedButton.textContent = recentSearchArray[i].name;
        //add functionality to button and send saved array info to display API
        newSearchedButton.addEventListener("click", function(){
                printSearchResults(recentSearchArray[i].lon, recentSearchArray[i].lat)
                getRecentSearches()
      })
    }
    console.log({recentSearchDisplay})
  }


  //if there is already an array in local storage then parse it and assign to variable "recentSearchesArray"
  function getRecentSearches() {
    storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      recentSearchesArray = JSON.parse(storedSearches);
    }
    return recentSearchesArray;
  }
  //save viewed city to history
  function saveViewedCity(name, lon, lat) {
  //create an object and save both properties at once
  
    let savedEntry = {
      name: name,
      lon: lon,
      lat: lat
    }

    console.log("save function receiving:", savedEntry)

    //this checks to see if the object in the array already exists. 
    //If not, it will push entry or shift if there is already 5 in array memory
    if (
      recentSearchesArray.includes(savedEntry) === false &&
      recentSearchesArray.length < 9
    ) {
      recentSearchesArray.push(savedEntry);
      localStorage.setItem("recentSearches", JSON.stringify(recentSearchesArray));
    } else if (
      recentSearchesArray.includes(savedEntry) === false &&
      (recentSearchesArray.length = 9)
    ) {
      recentSearchesArray.shift();
      recentSearchesArray.push(savedEntry);
      localStorage.setItem("recentSearches", JSON.stringify(recentSearchesArray));
    }
    
  }