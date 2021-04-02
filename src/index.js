import { getInfo } from './getInfo';
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';

const button = document.getElementById('submit');
const city = document.getElementById('city');
const country = document.getElementById('country');

const weatherBlock = document.querySelector('.weather');
const localWeather = document.getElementById('local');
const historyButton = document.getElementById('history');
const weatherHistorySection = document.querySelector('.weatherHistory');
const closeButton = document.querySelector('.close');
const weatherHistoryBlock = document.querySelector('.showWeatherHistory');
const clearButton = document.getElementById('clear');

// показать блок погоды по поиску
button.addEventListener('click', (event) => {
  event.preventDefault();
  if (city.value) {
    weatherBlock.style.display = 'block';
    getInfo(city.value, country.value);
  }
  weatherHistorySection.style.display = 'none';
  document.querySelector('.message').textContent = '';
});

// определяем погоду в текущей локации
localWeather.addEventListener('click', () => {
  function success(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    getInfo(latitude, longitude);
    weatherBlock.style.display = 'block';
    weatherHistorySection.style.display = 'none';
  }
  function error() {}
  navigator.geolocation.getCurrentPosition(success, error);
});

closeButton.addEventListener('click', () => {
  weatherHistorySection.style.display = 'none';
});

// заполняем блок с историей поиска
const tableWeather = document.createElement('table');
tableWeather.id = 'myHistory';
function createHistoryWeather(weatherHistory) {
  if (document.getElementById('myHistory')) {
    document.getElementById('myHistory').innerHTML = ' ';
  }
  for (const el in weatherHistory) {
    const historyElem = document.createElement('tr');
    historyElem.className = 'historyItem';
    historyElem.id = `${weatherHistory[el].city}`;
    historyElem.innerHTML = `
        <td>${weatherHistory[el].city}, ${weatherHistory[el].country}</td>
        <td>${weatherHistory[el].temperature}℃</td>
        <td>${weatherHistory[el].wind_dir}</td>
        <td>${weatherHistory[el].wind_speed} km/h</td>
        <td>${weatherHistory[el].pressure} MB</td>`;

    tableWeather.append(historyElem);
    weatherHistoryBlock.append(tableWeather);
  }
}

// очистка истории и локал сторэджа
clearButton.addEventListener('click', () => {
  document.querySelectorAll('.historyItem').forEach((item) => item.remove());
  document.querySelector('.message').textContent = 'Your history is empty';
  localStorage.removeItem('history');
});

historyButton.addEventListener('click', () => {
  weatherBlock.style.display = 'none';
  weatherHistorySection.style.display = 'block';
  const weatherHistory = JSON.parse(localStorage.getItem('history')) || {};
  createHistoryWeather(weatherHistory);
});
