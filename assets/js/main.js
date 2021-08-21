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
            getCurrentWeather(data);
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

function getCurrentWeather(city) {

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
                //get main weather icon
                var weatherIconInfo = data.current.weather[0].icon;
                console.log(weatherIconInfo);

                var weatherIconEl = document.createElement("img");
                weatherIconEl.src = "http://openweathermap.org/img/wn/" + weatherIconInfo + ".png";
                cityHeadingEl.appendChild(weatherIconEl);

                //get info for current weather div list 
                var currentTemp = data.current.temp;
                var currentWindSpeed = data.current.wind_speed;
                var currentHumidity = data.current.humidity;
                var currentUvIndex = data.current.uvi;
                //for uv element to create color coding of value
                var currentUvEl = document.createElement("span");
                currentUvEl.textContent = currentUvIndex;
                if(currentUvIndex <= 2) {
                    currentUvEl.classList = "favorable";
                } else if(currentUvIndex > 2 && currentUvIndex < 6) {
                    currentUvEl.classList = "moderate";
                } else if (currentUvIndex >= 6) {
                    currentUvEl.classList = "severe";
                }
                //show it on the current weather div
                $(".temp").text("Temp: " + currentTemp + "\u00B0 F"); 
                $(".wind").text("Wind: " + currentWindSpeed + " MPH");
                $(".humidity").text("Humidity: " + currentHumidity + " %");
                $(".uvIndex").text("UV Index: ").append(currentUvEl);

                fiveDayForecast(latitude, longitude);
                
            })
        } 
    })
    .catch(function(error) {
        //catch 
        alert("Unable to connect to One Call")
    });
}
//five day forecast
function fiveDayForecast(latitude, longitude){
    //define api for 5 day forecast
    var forecastApiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=current,minutely,hourly,alerts" + "&units=imperial" + apiKey; 
    
    //fetch 
    fetch(forecastApiUrl).then(function(response) {
        //if no error 
        if(response.ok) {
            response.json().then(function(data) {
                var dailyArray = data.daily;

                // <div class="col day">
                //             <div class="forecastDay">
                //                 <h4>Date</h4>
                //                 <p>Temp</p>
                //                 <p>Wind</p>
                //                 <p>Humidity</p>
                //             </div>
                //         </div>

                for(i = 1; i < 6; i++) {
                    //create div to hold each day info
                    var forecastDay = document.createElement("div");
                    forecastDay.classList = "forecastDay col";
                    $(".forecast").append(forecastDay);
                    //show date
                    var unixDate = data.daily[i].dt;
                    var dateToShow = moment.unix(unixDate).format("MM/DD/YYYY");
                    var dayDateEl = document.createElement("h4");
                    dayDateEl.textContent = dateToShow;
                    forecastDay.appendChild(dayDateEl);

                    //show weather icon fo  each day
                    var dailyIcon = data.daily[i].weather[0].icon;
                    var dailyIconEl = document.createElement("img");
                    dailyIconEl.src = "http://openweathermap.org/img/wn/" + dailyIcon + ".png";
                    forecastDay.appendChild(dailyIconEl);
                    // console.log(data.daily[i].weather[0].icon);
                    // console.log(data.daily[i].temp.day)
                    // console.log(data.daily[i].wind_speed)
                    // console.log(data.daily[i].humidity)
                }
            })
        }
    })
}

