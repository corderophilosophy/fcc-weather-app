"use strict";

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (position) {
    loadWeather(position.coords.latitude + ',' + position.coords.longitude);
  });
} else {
  loadWeather("San Francisco, CA", "");
}

$(document).ready(function () {
  setInterval(loadWeather, 3600000);
});

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function success(weather) {
      var city = weather.city;
      var condition = weather.currently;
      var region = weather.region;
      var celsius = weather.alt.temp;
      var temp = weather.temp;
      var image = weather.thumbnail;
      var windspeed = weather.wind.speed;
      var windunits = weather.units.speed;
      var humidity = weather.humidity;

      $(".location").html("<p>" + city + ", " + region + "</p>");
      $(".climate").html("<img src=" + image + "><div class='condition-caption'>" + condition + "</div>");
      $(".temperature").html("<p>" + temp + "&deg; F </p>");
      $(".celsius").html("<p>" + celsius + "&deg; C </p>");
      $(".windspeed").html("<p>" + windspeed + " " + windunits + "</p>");
      $(".humidity").html("<p>" + humidity + "%</p>");
    },

    error: function error(_error) {
      $(".error").html("<p>" + _error + "</p>");
    }
  });
}