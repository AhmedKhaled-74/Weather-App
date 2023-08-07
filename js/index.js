var searchBar = document.querySelector(".searchbar");
var cityElement = document.querySelector(".city");
var currentDegree = document.querySelector(".current-degree");
var conditionIcon = document.querySelector(".condition-icon");
var nextIcon = document.querySelector(".next-icon");
var aNextIcon = document.querySelector(".a-next-icon");
var conditionText = document.querySelector(".current-status");
var nextStatus = document.querySelector(".next-status");
var aNextStatus = document.querySelector(".a-next-status");
var humidity = document.querySelector(".humidity");
var windSpeed = document.querySelector(".wind-speed");
var windDir = document.querySelector(".wind-dir");
var currentDay = document.getElementById("currentDay");
var currentDate = document.getElementById("currentDate");
var nextDay = document.getElementById("nextDay");
var aNextDay = document.getElementById("aNextDay");
var nextHDeg = document.querySelector(".next-h-deg");
var nextLDeg = document.querySelector(".next-l-deg");
var aNextHDeg = document.querySelector(".a-next-h-deg");
var aNextLDeg = document.querySelector(".a-next-l-deg");

async function getCurrentData(location) {
  var apiKey = "aa953271ebe24b2db6285555230608";
  var url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

  var response = await fetch(url);
  var data = await response.json();
  var nowTime = data.current.last_updated;
  var locationCity = data.location.name;
  var currentTemp = data.current.temp_c;
  var currentCondText = data.current.condition.text;
  var currentCondIcon = data.current.condition.icon;
  var currentHumidity = data.current.humidity;
  var currentWindSpeed = data.current.wind_kph;
  var currentWindDir = data.current.wind_dir;
  displayCurrentDay(
    locationCity,
    currentTemp,
    currentCondText,
    currentCondIcon,
    currentHumidity,
    currentWindSpeed,
    currentWindDir
  );
  displayDate(nowTime);
}

//^ Location

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Call the getCurrentData function with the user's location coordinates
        getCurrentData(latitude + "," + longitude);
        getNextData(latitude + "," + longitude);
      },
      function () {
        getCurrentData("Cairo");
        getNextData("Cairo");
      }
    );
  } else {
    getCurrentData("Cairo");
    getNextData("Cairo");
  }
}
getLocation();

//display current

function displayCurrentDay(
  city,
  currentDg,
  currentText,
  currentIcon,
  currentHumidity,
  currentWindSpeed,
  currentWindDir
) {
  cityElement.innerHTML = city;
  currentDegree.innerHTML = currentDg + "&deg;C";
  conditionText.innerHTML = currentText;
  conditionIcon.setAttribute("src", `${currentIcon}`);
  humidity.innerHTML = currentHumidity + "%";
  windSpeed.innerHTML = currentWindSpeed + " km/hr";
  windDir.innerHTML = currentWindDir;
}

function displayDate(currentTime) {
  var specificDate = new Date(`${currentTime}`);
  var daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var dayNum = specificDate.getDate();
  var day = daysOfWeek[specificDate.getDay()];
  var month = months[specificDate.getMonth()]; // Get the month as a string
  var formattedDate = dayNum + month; // Combine the day and month
  currentDay.innerHTML = day;
  currentDate.innerHTML = formattedDate;
}

//get next day

async function getNextData(location) {
  var apiKey = "aa953271ebe24b2db6285555230608";
  var url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`;

  var response = await fetch(url);
  var data = await response.json();
  var nData = data.forecast.forecastday[1];
  var aNData = data.forecast.forecastday[2];
  var nextTime = nData.date;
  var nextImg = nData.day.condition.icon;
  var nextText = nData.day.condition.text;
  var hDeg = nData.day.maxtemp_c;
  var lDeg = nData.day.mintemp_c;
  //////after next
  var aNextTime = aNData.date;
  var aNextImg = aNData.day.condition.icon;
  var aNextText = aNData.day.condition.text;
  var aHDeg = aNData.day.maxtemp_c;
  var aLDeg = aNData.day.mintemp_c;
  displayNextDate(nextTime);
  displayAfterNextDate(aNextTime);
  displayNextData(nextImg, nextText, hDeg, lDeg);
  displayAfterNextData(aNextImg, aNextText, aHDeg, aLDeg);
}

//display next day

function displayNextData(nextsIcon, nextsText, nextH, nextL) {
  nextIcon.setAttribute("src", `${nextsIcon}`);
  nextStatus.innerHTML = nextsText;
  nextHDeg.innerHTML = nextH + "&deg;C";
  nextLDeg.innerHTML = nextL + "&deg;C";
}

function displayNextDate(nextTime) {
  var specificDate = new Date(`${nextTime}`);
  var daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var day = daysOfWeek[specificDate.getDay()];
  nextDay.innerHTML = day;
}

//display after next day

function displayAfterNextData(aNextsIcon, aNextsText, aNextH, aNextL) {
  aNextIcon.setAttribute("src", `${aNextsIcon}`);
  aNextStatus.innerHTML = aNextsText;
  aNextHDeg.innerHTML = aNextH + "&deg;C";
  aNextLDeg.innerHTML = aNextL + "&deg;C";
}

function displayAfterNextDate(aNextTime) {
  var specificDate = new Date(`${aNextTime}`);
  var daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var day = daysOfWeek[specificDate.getDay()];
  aNextDay.innerHTML = day;
}

//searching around world
searchBar.addEventListener("input", () => {
  searchData(searchBar.value);
});
async function searchData(search) {
  var apiKey = "aa953271ebe24b2db6285555230608";
  var url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${search}`;

  var response = await fetch(url);
  var data = await response.json();
  var nlocation = data[0].name;
  if (data != [] && data != undefined) {
    getCurrentData(nlocation);
    getNextData(nlocation);
  }
}
