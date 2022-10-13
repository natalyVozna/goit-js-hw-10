import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries.js';
import createCountryInfoCard from './js/country-info-card.js';
import createCountryListCard from './js/country-list-card.js';

const DEBOUNCE_DELAY = 300;

const refs = {
  countryListCntainer: document.querySelector('.country-list'),
  countryInfoCntainer: document.querySelector('.country-info'),
  inputEl: document.querySelector('input#search-box'),
};

refs.inputEl.focus();
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
  //   console.log(counties);
  if (counties.length > 11) {
    refs.countryListCntainer.innerHTML = '';
    refs.countryInfoCntainer.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (counties.length > 1 && counties.length <= 10) {
    refs.countryInfoCntainer.innerHTML = '';
    const markup = counties
      .map(country => createCountryListCard(country))
      .join('');

    refs.countryListCntainer.innerHTML = markup;
  } else {
    refs.countryListCntainer.innerHTML = '';
    const markup = counties
      .map(country => createCountryInfoCard(country))
      .join('');
    refs.countryInfoCntainer.innerHTML = markup;
  }
}

function onFetchError(error) {
  refs.countryListCntainer.innerHTML = '';
  refs.countryInfoCntainer.innerHTML = '';
  //   console.log('err', error);
  Notify.failure(`Oops, there is no country with that name`);
}
