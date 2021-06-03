const image = document.querySelector('img');
const temp = document.querySelector('.temp');
const locationElem = document.querySelector('.location');
const time = document.querySelector('.time');
const feelsLike = document.querySelector('.feelsLike');
const comment = document.querySelector('.comment');
const windDir = document.querySelector('.wind');
const windSpeed = document.querySelector('.speed');
const pressure = document.querySelector('.pressure');

// заполняем поля по результатам поиска
export function getData(data) {
  const { current, location } = data;
  image.src = current.weather_icons;
  temp.textContent = `${current.temperature}℃`;
  locationElem.textContent = `${location.name}, ${location.country}`;

  time.textContent = `Time: ${current.observation_time}`;
  feelsLike.textContent = `Feels like: ${current.feelslike}℃`;
  comment.textContent = `Today is ${current.weather_descriptions}`;
  windDir.textContent = `Wind: ${current.wind_dir}`;
  windSpeed.textContent = `Speed: ${current.wind_speed} km/h`;
  pressure.textContent = `Pressure: ${current.pressure} MB`;
}

// сохраняем данные по поиску в локал сторэдж
export function saveHistory(data) {
  const weatherHistory = JSON.parse(localStorage.getItem('history')) || {};
  weatherHistory[data.location.name] = {
    city: data.location.name,
    country: data.location.country,
    temperature: data.current.temperature,
    pressure: data.current.pressure,
    wind_dir: data.current.wind_dir,
    wind_speed: data.current.wind_speed,
  };
  localStorage.setItem('history', JSON.stringify(weatherHistory));
}

export const getInfo = function info(firstOpt, secondOpt) {
  fetch(`https://api.weatherstack.com/current?access_key=09e472f963826a15c0f422d0ca58a536&query=${firstOpt},${secondOpt}`).then((response) => response.json()).then((data) => {
    getData(data);
    saveHistory(data);
  });
};
