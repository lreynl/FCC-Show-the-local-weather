var curWeather = { "tempF": 0,
                   "tempC": 0,
                   "desc": "",
                   "city": ""
                 };

var weatherAPIkey = ; //key here

function loadWeather() {
  $.getJSON("https://ipapi.co/json", function(location) {
    if(location) {
      console.log(location);
      getWeather(location.latitude, location.longitude);
    } else {
      alert.log("couldn't get location");
    }
  });
}

function getWeather(lat,lon) {
  var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + weatherAPIkey + '"';
  $.getJSON(weatherAPI, function(weather) {
    curWeather.tempC = Math.round(weather.main.temp - 273.15);
    curWeather.tempF = Math.round(((weather.main.temp - 273.15) * (9.0 / 5.0)) + 32.0);
    curWeather.desc = weather.weather[0].description;
    curWeather.city = weather.name;
    document.getElementById('deg').innerHTML = curWeather.tempC + "°C";
    document.getElementById("forecastDesc").innerHTML = curWeather.desc;
    document.getElementById("city").innerHTML = curWeather.city;
    setIcon();
  });
}

function units() {
  var current = document.getElementById("deg").innerHTML.slice(-1);
  if(current == 'F') {
    document.getElementById("deg").innerHTML = curWeather.tempC + "°C";
  } else if(current == 'C') {
    document.getElementById("deg").innerHTML = curWeather.tempF + "°F";
  } else {
    document.getElementById("deg").innerHTML = curWeather.tempC + "°C";
  }
}

function setIcon() {
  var desc = curWeather.desc;
  var icon = '';
  if(desc.includes("sunny") || desc.includes("clear")) {
    icon = 'rm8x94pjx/download.png';
  } else if((desc.includes("cloudy") || desc.includes("overcast")) &&
           !(desc.includes("partly") || desc.includes("mostly"))) {
    icon = 'd1rueaul9/clouds.png';
  } else if((desc.includes("rain") ||
             desc.includes("showers") ||
             desc.includes("drizzle") ||
             desc.includes("mist")) &&
           !(desc.includes("thunder") || desc.includes("lightning"))) {
    if(desc.includes("sun")) {
      icon = 'u15e7av6l/rain_sun.png';
    } else {
      console.log("stuff");
      icon = 's82hiz9zx/rain.png';
    }
  } else if(desc.includes("snow")) {
    icon = '6o7cosf31/snow.png';
  } else if(desc.includes("thunder") ||
            desc.includes("lightning")) {
    if(desc.includes("rain")) {
      icon = 'jgvgopqot/thund_rain.png';
    } else {
      icon = 'em1rqfsd9/lighn.png';
    }
  } else if(desc.includes("fog") || desc.includes("haze")) {
    icon = 'h0tnav8m5/fog.png';
  } else if(desc.includes("wind")) {
    icon = 'hg9ihmjx9/wind.png';
  } else if(desc.includes("hurricane") ||
            desc.includes("cyclone") ||
            desc.includes("typhoon")) {
    icon = '5087a517h/hurr.png';
  } else if(desc.includes("tornado")) {
    icon = 'hdpmusg9p/torn.png';
  } else if(desc.includes("surf") ||
            desc.includes("waves") ||
            desc.includes("tsunami")) {
    icon = '5d46u28v1/wave.png';
  } else if(desc.includes("clouds") ||
            (desc.includes("partly") && desc.includes("cloudy")) ||
            (desc.includes("mostly") && desc.includes("sunny"))) {
    icon = '78mdrh8bh/pt_cloud.png';
  } else if((desc.includes("partly") && desc.includes("sunny") ||
             (desc.includes("mostly") && desc.includes("cloudy")) ||
             desc.includes("sunbreak"))) {
    icons = 'e0csubxb1/pt_sun.png';
  } else {
    icon = '3ude2trod/image.png';//?
}

document.getElementById("icon").innerHTML = icon;
  var replace = '<img src=https://s20.postimg.cc/' + icon +' alt="Im an emoji" height="72" width="72">';
  document.getElementById("icon").innerHTML = replace;
}
