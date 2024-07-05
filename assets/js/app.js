let weatherLabel = {
    0: "Sunny",
    1: "Sunny",
    2: "Sunny",
    3: "Sunny",
    95: "Rainy",
    61: "Rainy",
    63: "Rainy",
    65: "Rainy",
    80: "Rainy",
    81: "Rainy",
    82: "Rainy",
    51: "Drizzle",
    53: "Drizzle",
    55: "Drizzle",
    45: "Cloudy",
    48: "Cloudy",
}
let weatherCode = {
    0: "./assets/img/clear.png",
    1: "./assets/img/clear.png",
    2: "./assets/img/clear.png",
    3: "./assets/img/clear.png",
    95: "./assets/img/rain.png",
    61: "./assets/img/rain.png",
    63: "./assets/img/rain.png",
    65: "./assets/img/rain.png",
    80: "./assets/img/rain.png",
    81: "./assets/img/rain.png",
    82: "./assets/img/rain.png",
    51: "./assets/img/drizzle.png",
    53: "./assets/img/drizzle.png",
    55: "./assets/img/drizzle.png",
    45: "./assets/img/mist.png",
    48: "./assets/img/mist.png",
};
let weatherBg = {
    0: "./assets/img/bg-sunny.jpg",
    1: "./assets/img/bg-sunny.jpg",
    2: "./assets/img/bg-sunny.jpg",
    3: "./assets/img/bg-sunny.jpg",
    95: "./assets/img/bg-rain.jpg",
    61: "./assets/img/bg-rain.jpg",
    63: "./assets/img/bg-rain.jpg",
    65: "./assets/img/bg-rain.jpg",
    80: "./assets/img/bg-rain.jpg",
    81: "./assets/img/bg-rain.jpg",
    82: "./assets/img/bg-rain.jpg",
    51: "./assets/img/bg-drizzle.jpg",
    53: "./assets/img/bg-drizzle.jpg",
    55: "./assets/img/bg-drizzle.jpg",
    45: "./assets/img/bg-cloudy.jpg",
    48: "./assets/img/bg-cloudy.jpg",
};
//GET HOURLY DATA FUNCTION
async function getData(){
    try{
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=-6.1781&longitude=106.63&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok"
        );
        const result = await response.json();
        resultApi(result);
        console.log(result);
    } catch (error) {
        console.log('error');
    }
}
getData();

function resultApi(data) {
    const dateNow = new Date();
    let dateHour = dateNow.getHours();
    let hour
    if(dateHour<10){
        hour = '0' + dateHour;
        console.log(hour);
    } else{
        hour = dateHour;
    }
    console.log(dateHour);
    let dateIso = dateNow.toISOString();

    document.getElementById('date').innerHTML  = dateNow.toLocaleDateString('en-id', { weekday:"long", year:"numeric", month:"long", day:"numeric"}) 

    dateFix = dateIso.substring(0, 11) + hour + ':00';
    // console.log(dateFix);
    let arrayTime = data.hourly.time;

    // console.log('date now: ' + dateNow);

    var indexTime = '';
    arrayTime.forEach((time, index) => {
        // console.log(time);
        // console.log(dateFix);
        if (dateFix === time) {
            // console.log(index);
            indexTime = index;
        }
            
    });

    let temperatures = data.hourly.temperature_2m;

    temperatures.forEach((temp, index) => {
        // console.log(indexTime);
        // console.log(index);
        if (indexTime === index) {
            document.getElementById('temp').innerHTML= temp + " °C"
            document.getElementById('temp').dataset.mainf = temp;
            document.getElementById('temp').dataset.mainc = temp;
        }
    });

    let weatherName = data.hourly.weather_code;
    weatherName.forEach((weather, index) => {
        document.getElementById('weatherLabel').innerHTML = weatherLabel[weatherName[index]]
        document.querySelector('.weather-image').src = weatherCode[weatherName[index]]
        document.getElementById('main').style.backgroundImage = "url(' " + weatherBg[weatherName[index]] + "')";
    })

    let feelsLike = data.hourly.apparent_temperature;
    feelsLike.forEach((feels, index) => {
        // console.log(feelsLike[index]);
        document.querySelector('#feelsLike').innerHTML = feelsLike[index] + " °C";
        document.querySelector('#feelsLike').dataset.feelsf = feelsLike[index];
        document.querySelector('#feelsLike').dataset.feelsc = feelsLike[index];
    })

    let humidity = data.hourly.relative_humidity_2m;
    humidity.forEach((feels, index) => {
        // console.log(humidity[index]);
        document.querySelector('#humidity').innerHTML = humidity[index] + " %"
    })

    let windSpeed = data.hourly.wind_speed_10m;
    // console.log(windSpeed);
    // document.getElementById('wind').innerHTML = windSpeed.length-1 + " m/s";
    windSpeed.forEach((speed, index) => {
        document.getElementById('wind').innerHTML = windSpeed[index] + " m/s";
    })

    let pressure = data.hourly.surface_pressure;
    // console.log(pressure);
    // document.getElementById('wind').innerHTML = pressure.length-1 + " m/s";
    pressure.forEach((press, index) => {
        document.getElementById('pressure').innerHTML = pressure[index] + " hPa";
    })

    let min = data.daily.temperature_2m_min;
    min.forEach((temp, index) => {
        document.getElementById('min').innerHTML ="Min:" + " " + min[index] + " °C";
        document.getElementById('min').dataset.minf = min[index];
        document.getElementById('min').dataset.minc = min[index];
    })

    let max = data.daily.temperature_2m_max;
    max.forEach((temp, index) => {
        document.getElementById('max').innerHTML ="Max:" + " " + max[index] + " °C";
        document.getElementById('max').dataset.maxf = max[index];
        document.getElementById('max').dataset.maxc = max[index];
    })

}
//GET HOURLY DATA FUNCTION

//CHANGE TEMPERATURE FUNCTION
let farrenheit = document.getElementById('farrenheit');
let celcius = document.getElementById('celcius');

function c2f(){
    // console.log(temp);
    let mainData = document.getElementById('temp').dataset.mainf;
    let maxData = document.getElementById('max').dataset.maxf;
    let minData = document.getElementById('min').dataset.minf;
    let feelsData = document.querySelector('#feelsLike').dataset.feelsf; 
    // let dailyData = document.querySelectorAll('.forecast-temperature').dataset.dailyf;
    let temp = document.getElementById('temp');
    let min = document.getElementById('min');
    let max = document.getElementById('max');
    let feels = document.getElementById('feelsLike');
    let daily = document.querySelectorAll('.forecast-temperature');
    // console.log(mainData + maxData + minData);
    if(celcius.classList.contains('active')){
        mainData = (Math.floor((mainData * 9.0 / 5.0) + 32.0));
        maxData = (Math.floor((maxData * 9.0 / 5.0) + 32.0));
        minData = (Math.floor((minData * 9.0 / 5.0) + 32.0));
        feelsData = (Math.floor((feelsData * 9.0 / 5.0) + 32.0));
        // dailyData = (Math.floor((dailyData * 9.0 / 5.0) + 32.0));
        temp.innerHTML = mainData + ' °F';
        max.innerHTML = 'Max: ' + ' ' + maxData + ' °F';
        min.innerHTML = 'Min: ' + ' ' + minData + ' °F';
        feels.innerHTML = feelsData + ' °F';
        // daily.innerHTML = daily + ' °F';
        farrenheit.classList.add('active');
        celcius.classList.remove('active')
    } else {
        console.log('already farrenheit');
    }

}
function f2c(){
    let mainData = document.getElementById('temp').dataset.mainc;
    let maxData = document.getElementById('max').dataset.maxc;
    let minData = document.getElementById('min').dataset.minc;
    let feelsData = document.querySelector('#feelsLike').dataset.feelsc; 
    let temp = document.getElementById('temp');
    let min = document.getElementById('min');
    let max = document.getElementById('max');
    let feels = document.getElementById('feelsLike');
    // console.log(mainData + maxData + minData);
    if(farrenheit.classList.contains('active')){
        temp.innerHTML = mainData + ' °C';
        max.innerHTML = 'Max: ' + ' ' + maxData + ' °C';
        min.innerHTML = 'Min: ' + ' ' + minData + ' °C';
        feels.innerHTML = feelsData + ' °C';
        farrenheit.classList.remove('active');
        celcius.classList.add('active')
    } else {
        console.log('already celcius');
    }
}
//CHANGE TEMPERATURE FUNCTION

//DAILY FORECAST FUNCTION
async function fecthWeatherDaily() {
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-6.1781&longitude=106.63&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok"
      );
  
      const result = await response.json();
  
      result.daily.time.forEach((el, i) => {
        // card
        const card = document.createElement("div");
        card.classList.add("forecast-card");
  
        // card title
        const cardTitle = document.createElement("p");
        cardTitle.innerHTML = new Date(el).toLocaleDateString("en-ID", {
          weekday: "short",
        //   year: "numeric",
        //   month: "long",
        //   day: "numeric",
        });
        cardTitle.classList.add('forecast-day');
        card.append(cardTitle);
  
        // card icon
        const cardIcon = document.createElement("img");
        cardIcon.src = weatherCode[result.daily.weather_code[i]];
        // console.log(weatherCode[result.daily.weather_code[i]]);
        cardIcon.classList.add('forecast-image');
        card.append(cardIcon);
  
        // card temperature
        const cardTemperature = document.createElement("div");
        cardTemperature.innerHTML = result.daily.temperature_2m_max[i] + " °C";
        cardTemperature.classList.add('forecast-temperature');
        card.append(cardTemperature);

        let farrenheit = document.getElementById('farrenheit');
        let celcius = document.getElementById('celcius');
        let resultF = (Math.floor((result.daily.temperature_2m_max[i] * 9.0 / 5.0) + 32.0));

        farrenheit.addEventListener('click', function() {
            cardTemperature.innerHTML = resultF + " °F";
        })
        celcius.addEventListener('click', function() {
            cardTemperature.innerHTML = result.daily.temperature_2m_max[i] + " °C";
        })
  
        const weatherElement = document.querySelector(".forecast");
        weatherElement.append(card);
      });
    } catch (error) {
      console.log(error, "<<<< ini error");
    }
  }
fecthWeatherDaily();
//DAILY FORECAST FUNCTION

//SLIDER AND LOADER FUNCTION
$(document).ready(function(){
    setTimeout(() => {
        $('.forecast').slick({
            // infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
              ],
        });

        document.getElementById('loader').classList.add('d-none');
      }, 2500);
    setTimeout(() => {
        document.getElementById('main').classList.remove('d-none')
    }, 2000)
});
//SLIDER AND LOADER FUNCTION
