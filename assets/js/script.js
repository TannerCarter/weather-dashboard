//Get current day using Moment
var currentDate = moment().format("dddd, MMM Do YYYY");
$("#currentDay").text(currentDate);

//localStorage.clear();

//Weather API
function searchCity(cityname) {
  var weatherAPI =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&units=imperial&appid=14b32f18d69f6d40751829360937d877";
  //Forecast API
  var weatherForecast =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityname +
    "&units=imperial&appid=14b32f18d69f6d40751829360937d877";

  //Pull Weather
  $.ajax({
    url: weatherAPI,
    method: "GET",
  })
    .then(function (response) {
      console.log(response);
      console.log(weatherAPI);

      $("#current").empty();
      var pullDate = moment().format("dddd, MMM Do YYYY");

      var cityNameEl = $("<h3>").text(response.name);
      var displayMainDate = cityNameEl.append(" " + pullDate);
      var tempEL = $("<p>").text("Temperature: " + response.main.temp + "°F");
      var humEl = $("<p>").text("Humidity: " + response.main.humidity + "%");
      var windEl = $("<p>").text("Wind Speed: " + response.wind.speed + "mph");
      var currentweather = response.weather[0].main;

      if (currentweather === "Rain") {
        var currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/09d.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px");
      } else if (currentweather === "Clouds") {
        var currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/03d.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px");
      } else if (currentweather === "Clear") {
        var currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/01d.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px");
      } else if (currentweather === "Drizzle") {
        var currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/10d.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px");
      } else if (currentweather === "Snow") {
        var currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/13d.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px");
      }

      var newDiv = $("<div>");

      newDiv.append(displayMainDate, currentIcon, tempEL, humEl, windEl);

      $("#current").html(newDiv);

      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var uvAP =
        "https://api.openweathermap.org/data/2.5/uvi?&appid=ecc0be5fd92206da3aa90cc41c13ca56&lat=" +
        lat +
        "&lon=" +
        lon;

      $.ajax({
        url: uvAP,
        method: "GET",
      }).then(function (response) {
        $("#displayUVL").empty();
        let uvIndex = response.value;
        var color = "";
        if (uvIndex >= 0 && uvIndex < 3) {
          color = "#3EA72D";
        } else if (uvIndex >= 3 && uvIndex < 6) {
          color = "#FFF300";
        } else if (uvIndex >= 6 && uvIndex < 8) {
          color = "#F18B00";
        } else if (uvIndex >= 8 && uvIndex < 11) {
          color = "#E53210";
        } else if (uvIndex >= 11) {
          color = "#B567A4";
        }

        var uvlEl = $("<button class='btn' id='uvlBtn'>").text(
          "UV Index: " + uvIndex
        );
        $(uvlEl).css("background", color);
        $("#displayUVL").html(uvlEl);
      });
      var storearr = JSON.parse(localStorage.getItem("cityName"));
      if (storearr == null) {
        storearr = [];
      }
      var cityInput = $("#searchCityInput").val().trim();
      if (!storearr.includes(cityInput)) {
        console.log("saving city");
        console.log(cityInput);
        storearr.push(cityInput);
      }
      localStorage.setItem("cityName", JSON.stringify(storearr));

      loadPage();
    })
    .catch((err) => {
      alert("Incorrect City Name!");
    });

  $.ajax({
    url: weatherForecast,
    method: "GET",
  }).then(function (response) {
    var results = response.list;

    $("#5day").empty();

    for (var i = 0; i < results.length; i += 8) {
      var fiveDayDiv = $(
        "<div class='card shadow-lg text-white bg-primary mx-auto p-1' style='width: 8.5rem; height: 13.5rem;'>"
      );

      var date = results[i].dt_txt;
      var setD = date.substr(0, 10);
      var temp = results[i].main.temp;
      var hum = results[i].main.humidity;
      var wind = results[i].wind.speed;

      var h5date = $("<h5 class='card-title text-center'>").text(setD);
      var pTemp = $("<p class='card-text'>").text("Temp: " + temp + "°F");
      var pHum = $("<p class='card-text'>").text("Humidity: " + hum + "%");
      var pWind = $("<p class='card-text'>").text(
        "Wind Speed: " + wind + "mph"
      );

      var weather = results[i].weather[0].main;

      if (weather === "Rain") {
        var icon = $("<img class='icon text-center'>").attr(
          "src",
          "http://openweathermap.org/img/wn/09d.png"
        );
        icon.attr("style", "height: 40px; width: 40px;");
      } else if (weather === "Clouds") {
        var icon = $("<img class='icon text-center'>").attr(
          "src",
          "http://openweathermap.org/img/wn/03d.png"
        );
        icon.attr("style", "height: 40px; width: 40px;");
      } else if (weather === "Clear") {
        var icon = $("<img class='icon text-center'>").attr(
          "src",
          "http://openweathermap.org/img/wn/01d.png"
        );
        icon.attr("style", "height: 40px; width: 40px;");
      } else if (weather === "Drizzle") {
        var icon = $("<img class='icon text-center'>").attr(
          "src",
          "http://openweathermap.org/img/wn/10d.png"
        );
        icon.attr("style", "height: 40px; width: 40px;");
      } else if (weather === "Snow") {
        var icon = $("<img class='icon text-center'>").attr(
          "src",
          "http://openweathermap.org/img/wn/13d.png"
        );
        icon.attr("style", "height: 40px; width: 40px");
      }

      //append items to.......
      fiveDayDiv.append(h5date);
      fiveDayDiv.append(icon);
      fiveDayDiv.append(pTemp);
      fiveDayDiv.append(pHum);
      fiveDayDiv.append(pWind);
      $("#5day").append(fiveDayDiv);
    }
  });
}
loadPage();

//On button click store input
$("#submitBtn").on("click", function (event) {
  event.preventDefault();
  var cityInput = $("#searchCityInput").val().trim();
  if (cityInput.length === 0) return;
  searchCity(cityInput);
});

//Create a new button of search city using local storage
function loadPage() {
  var recentSearch = JSON.parse(localStorage.getItem("cityName"));

  if (recentSearch == null) return;

  $("#searchedCities").empty();
  recentSearch.forEach((city) => {
    console.log(city);
    var cityBtn = $(
      "<button class='btn border text-muted mt-1 shadow-sm bg-white rounded text-center' style='width: 12rem;'>"
    ).text(city);
    var searchList = $("<p>");
    searchList.append(cityBtn);
    $("#searchedCities").prepend(searchList);
  });
}

$("#searchedCities").on("click", ".btn", function (event) {
  event.preventDefault();
  console.log($(this).text());
  searchCity($(this).text());
});
