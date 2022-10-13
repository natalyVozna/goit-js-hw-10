import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  countryListCntainer: document.querySelector('.country-list'),
  countryInfoCntainer: document.querySelector('.country-info'),
  inputEl: document.querySelector('input#search-box'),
};

// inputEl.focus();
refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const inputVal = e.target.value.trim();
  if (inputVal !== '') {
    fetchCountries(inputVal).then(renderCountrisData).catch(onFetchError);
  } else {
    refs.countryListCntainer.innerHTML = '';
    refs.countryInfoCntainer.innerHTML = '';
  }
}

function renderCountrisData(counties) {
  console.log(counties);
  if (counties.length > 11) {
    refs.countryListCntainer.innerHTML = '';
    refs.countryInfoCntainer.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (counties.length > 1 && counties.length <= 10) {
    refs.countryInfoCntainer.innerHTML = '';
    const markup = counties
      .map(({ flags, name }) => {
        return `<li class='country-card'>
                <div class='country-img'><img src='${flags.svg}' alt='${name.official}'/></div>
                <p class='country-name'>${name.common}</p>
      </li>`;
      })
      .join('');

    refs.countryListCntainer.innerHTML = markup;
  } else {
    refs.countryListCntainer.innerHTML = '';
    const markup = counties
      .map(({ flags, name, capital, languages, population }) => {
        const languagesList = Object.values(languages).join(', ');

        return `<div class='country-card'>
                <div class='country-img'><img src='${flags.svg}' alt='${name.official}'/></div>
                <p class='country-title'>${name.common}</p>
        </div>
        <p class='card-onfo'>
        <strong>Capinal:</strong> ${capital[0]}</p>
        <p class='card-onfo'><strong>Population:</strong> ${population}</p>
        <p class='card-onfo'><strong>Languages:</strong> ${languagesList}</p>
        `;
      })
      .join('');

    console.log(' markup', markup);

    refs.countryInfoCntainer.innerHTML = markup;
  }
}

function onFetchError(error) {
  refs.countryListCntainer.innerHTML = '';
  refs.countryInfoCntainer.innerHTML = '';
  Notify.failure(`Oops, there is no country with that name`);
}
