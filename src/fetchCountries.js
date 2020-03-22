const basedURL = 'https://restcountries.eu/rest/v2/name/';
export default function fetchCountries(searchQuery) {
  const requestCountry = `${searchQuery}`;
  return fetch(basedURL + requestCountry)
    .then(res => res.json())
    .catch(err => console.warn(err));
}
