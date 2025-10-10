if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      let reg;
      reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });

      console.log('Service worker registrada! 😎', reg);
      postCountry();
    } catch (err) {
      console.log('😥 Service worker registro falhou: ', err);
    }
  });
}

let param = 'africa'
let url = `https://restcountries.com/v3.1/name/${param}`;
const main = document.querySelector('main');



async function postCountry() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(url)
  main.innerHTML = data.map(createCountry).join('\n');
}

function createCountry(country) {
  return `
    <div class="article">
      <h2>${country.name.common}</h2>
      <img src="${country.flags.png}" class="image" alt="Bandeira de ${country.name.common}" />
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
      <p><strong>População:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Região:</strong> ${country.region}</p>
    </div>
  `
}

function buscar() {
  param = document.getElementById("input").value;
  url = `https://restcountries.com/v3.1/name/${param}`;
  postCountry()
}