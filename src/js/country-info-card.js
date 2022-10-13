export default function createCountryInfoCard({
  flags,
  name,
  capital,
  languages,
  population,
}) {
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
}
