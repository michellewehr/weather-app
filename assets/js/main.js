var searchCityEl = document.getElementById("searchCity");
var cityHeadingEl = document.querySelector(".cityNameDate");

$(".searchBtn").on("click", getWeather)

function getWeather(city) {
    //show city and date in currentWeather div
    var date = moment().format("MM/DD/YYYY");
    var city = searchCityEl.value
    cityHeadingEl.textContent = city + "(" + date + ")";
    //format weather api url
    var weatherApiUrl = ""
}