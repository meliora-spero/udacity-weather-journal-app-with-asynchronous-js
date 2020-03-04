// date & day
let d = new Date();
let date = ('0' + d.getDate()).slice(-2);
let month = ('0' + (d.getMonth() + 1)).slice(-2);
let year = d.getFullYear();
let newDate = date + '/' + month + '/' + year;

let weekday = new Array(7);
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';
let n = weekday[d.getDay()];

document.querySelector("#hello-its").innerHTML = n;
document.querySelector("#date").innerHTML = newDate;

// add class for day hover, etc.
document.getElementById('app').classList.add('center');
document.querySelector('#hello-its').classList.add('hvr-buzz-out');

// day or night
let nightTimeStart = 19;
let nightTimeEnd = 6;
let currentHour = d.getHours();
let dayNight = document.querySelector('.headline-day-night');
if (currentHour > nightTimeStart || currentHour < nightTimeEnd) {
  dayNight.style.background = "url('images/night.png') no-repeat center";
  dayNight.style.backgroundSize = '50px 50px';
} else {
  dayNight.style.background = "url('images/day.png') no-repeat center";
  dayNight.style.backgroundSize = '50px 50px';
}

// character count
const textarea = document.querySelector('textarea');
textarea.addEventListener('keyup', () => {
  let currentCharacters = document.querySelector('textarea').value;
  document.querySelector('#current').innerHTML = currentCharacters.length;
});

// url & api setup
const baseURL = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q='
const uk = ',gb'
const api = '6d101e81f2140d2f516e6072bda48dec'
const units = '&units=imperial'

const getData = async () => {
  const response = await fetch("/get", {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8000/',
    },
    redirect: 'follow', // manual, *follow, error  
  });
  try {
    const newData = await response.json(); // const newData = await response.text();
    console.log(newData);
    return newData
  } catch (error) {
    console.log("error", error); // appropriately handle the error
  }
};

const renderData = (data) => {
  const lastData = data[data.length - 1];
  document.getElementById('date').innerHTML = lastData.date;
  document.getElementById('temp').innerHTML = lastData.temperature;
  document.getElementById('content').innerHTML = lastData.feelings;
}

getData().then(renderData);

const generate = document.getElementById('generate')
generate.addEventListener('click', () => {
  const zip = document.getElementById('zip').value
  const feelings = document.getElementById('feelings').value
  getOpenWeatherData(`${baseURL}${zip}${uk}&appid=${api}${units}`)
    .then(function (data) {
      postData('/post', {
        temperature: data.main.temp,
        date: newDate,
        feelings: feelings
      }).then(renderData);
    });
});

// GET to the API to get the temperature
const getOpenWeatherData = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8000/',
    },
    credentials: 'same-origin', // include, *same-origin, omit
  });

  try {
    const data = await response.json();
    console.log(data);
    
    console.log(data.main.temp); 
    // data.weather[0].main

    return data;  // json response
    // we can now do smth with returned data here

  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

// POST to store locally user-input data
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8000/',
    },
    redirect: 'follow', // manual, *follow, error  
    body: JSON.stringify(data) // body data type must match "Content-Type" header        
  });
  try {
    const newData = await response.json(); // const newData = await response.text();
    console.log(newData);
    return newData
  } catch (error) {
    console.log("error", error); // appropriately handle the error
  }
};

// it is asynchronous because of the keyword "async" placed before its parameters
// once a function is makred as "async" we have access to the keywords: 
// "await", "try" and "catch" 
// which mirror the underlying Promise functionality of resolving or rejecting a condition
// here the condition is successfully making a POST request to the specified route

// the "await" keyword is used in places where the next actions requires 
// data from the current action 
// so we want to tell our program to wait until the data has been 
// received before continuing with the next steps