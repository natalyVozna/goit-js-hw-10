const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchCountries = name => {
  const url = `${BASE_URL}/name/${name}?fields=name,capital,flags,languages,population`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
