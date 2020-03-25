import './styles.css';
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';
import oneCountryTemplate from './templates/oneCountry.hbs';
import moreCountriesTemplates from './templates/moreCountries.hbs';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';

const inputCountry = document.querySelector('#input_country');
const root = document.querySelector('#root');

inputCountry.addEventListener('input', debounce(findCountry, 1800));

function findCountry(e) {
  const input = e.target.value;
  fetchFindCountries(input);
}

function renderListCountries(countries) {
  const markup = moreCountriesTemplates(countries);
  root.classList.add('column');
  root.insertAdjacentHTML('beforeend', markup);
}

function renderOneCountry(country) {
  const markup = oneCountryTemplate(country);
  root.classList.remove('column');
  root.insertAdjacentHTML('beforeend', markup);
}

function renderforRequestCountries(countryNames) {
  if (countryNames.length === 1) {
    renderOneCountry(countryNames);
    return;
  }
  if (countryNames.length >= 2 && countryNames.length <= 10) {
    renderListCountries(countryNames);
    return;
  }
  if (countryNames.length > 10) {
    PNotify.info({
      text: 'Совпадений больше 10, введите более уникальный запрос',
      delay: 3000,
      icon: true,
    });
    return;
  }

  PNotify.info({
    text: 'Совпадений не найдено. Введите правильный запрос',
    delay: 3000,
    icon: true,
  });
}

function fetchFindCountries(nameOfCountry) {
  root.innerHTML = '';
  if (nameOfCountry !== '') {
    fetchCountries(nameOfCountry)
      .then(nameOfCountry => renderforRequestCountries(nameOfCountry))
      .catch(error => console.warn(error));
  }
}
