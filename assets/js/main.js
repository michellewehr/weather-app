var searchCityEl = document.getElementById("searchCity");
var cityHeadingEl = document.querySelector(".cityNameDate");

$(".searchBtn").on("click", getCity);

function getCity() {
    //show city and date in currentWeather div
    var date = moment().format("MM/DD/YYYY");
    var city = searchCityEl.value
    cityHeadingEl.textContent = city + " (" + date + ")";

    //format weather api url to get long/lat
    var weatherApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=ed2f5e6646f77e93759b1b042975be69";

    //make a request to the url 
    fetch(weatherApiUrl).then(function(response) {
       //if no 404 error/ response.ok = successful, if not alert if there is a 404 error
       if(response.ok) {
        response.json().then(function(data) {
            console.log(data);
            getWeather(data);
        });
    } else {
        alert("Please enter a valid city.");
    }
})
}

function getWeather(city) {
    var latitude = city[0].lat;
    var longitude = city[0].lon;
    console.log(latitude);
    console.log(longitude);
}
