//Get current day using Moment
var currentDate = moment().format("dddd, MMM Do YYYY");
$("#currentDay").text(currentDate);

//Pull data from api
function searchCity(cityname) {
  var weatherAPI =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&units=imperial&appid=14b32f18d69f6d40751829360937d877";

  $.ajax({
    url: weatherAPI,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(weatherAPI);
  });
}
loadPage();

//On button click store input
$("#submitBtn").on("click", function (event) {
  event.preventDefault();
  var cityInput = $("#searchCityInput").val().trim();
  var textContent = $(this).siblings("input").val();
  var storearr = [];
  storearr.push(textContent);
  localStorage.setItem("cityName", JSON.stringify(storearr));

  searchCity(cityInput);
  loadPage();
});

//Create a new button of search city using local storage
function loadPage() {
  var recentSearch = JSON.parse(localStorage.getItem("cityName"));
  var recentList = $(
    "<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>"
  ).text(recentSearch);
  var searchList = $("<p>");
  searchList.append(recentList);
  $("#searchedCities").prepend(searchList);
}

$("#searchedCities").on("click", ".btn", function (event) {
  event.preventDefault();
  console.log($(this).text());
  searchCity($(this).text());
});
