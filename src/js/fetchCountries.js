const BASE_URL = 'https://restcountries.com/v3.1';

// const refs = {
//   countryListCntainer: document.querySelector('.country-list'),
//   countryInfoCntainer: document.querySelector('.country-info'),
// };

export const fetchCountries = name => {
  const url = `${BASE_URL}/name/${name}?fields=name,capital,flags,languages,population`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
