export default function createCountryListCard({ flags, name }) {
  return `<li class='country-card'>
            <div class='country-img'><img src='${flags.svg}' alt='${name.official}'/></div>
            <p class='country-name'>${name.common}</p>
      </li>`;
}
