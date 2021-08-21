var searchCityEl = document.getElementById("searchCity");
var cityHeadingEl = document.querySelector(".cityNameDate");
//api key from profile
var apiKey = "&appid=ed2f5e6646f77e93759b1b042975be69";
$(".searchBtn").on("click", getCity);

function getCity() {
    //show city and date in currentWeather div
    var date = moment().format("MM/DD/YYYY");
    var city = searchCityEl.value
    cityHeadingEl.textContent = city + " (" + date + ")";

    //format weather api url to get long/lat
    var weatherApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + apiKey;

    //make a request to the url 
    fetch(weatherApiUrl).then(function(response) {
       //if no 404 error/ response.ok = successful, if not alert if there is a 404 error
       if(response.ok) {
        response.json().then(function(data) {
            getLatLong(data);
        });
    } else {
        alert("Please enter a valid city.");
    }
})
    .catch(function(error) {
        //catch 
        alert("Unable to connect to One Call")
    })
}

function getLatLong(city) {
    //get latitude and longitude for city to pass into fetch request
    var latitude = city[0].lat;
    var longitude = city[0].lon;
    console.log(latitude);
    console.log(longitude);

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial" + apiKey;

    fetch(apiUrl).then(function(response) {
        //if no error 
        if(response.ok) {
            response.json().then(function(data) {
                var currentTemp = data.current.temp;
                console.log(data.current);
                var currentWindSpeed = data.current.wind_speed;
                var currentHumidity = data.current.humidity;
                var currentUvIndex = data.current.uvi;

                // <div class="row currentWeather">
                // <h2 class="cityNameDate"></h2>
                // <p class="temp">Temp:</p>
                // <p class="wind">Wind: </p>
                // <p class="humidity">Humidity</p>
                // <p class="uvIndex">UV index</p>

                $(".temp").text("Temp: " + currentTemp + "\u00B0 F"); 
                console.log(currentTemp);
                console.log(currentWindSpeed);
                console.log(currentHumidity);
                console.log(currentUvIndex);
            })
        } 
    })
    .catch(function(error) {
        //catch 
        alert("Unable to connect to One Call")
    });
}
