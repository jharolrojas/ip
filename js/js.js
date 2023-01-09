const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "84c5b97282msh7dbe0058f517375p1f5c23jsnb815f764c36c",
    "X-RapidAPI-Host":
      "ip-geo-location-find-ip-location-and-details.p.rapidapi.com",
  },
};
const result = (ip) => {
  return fetch(
    `https://ip-geo-location-find-ip-location-and-details.p.rapidapi.com/iplocation?ip=${ip}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
};
const $ = (selector) => document.querySelector(selector);
const $form = $("#form");
const $input = $("#input");
const $submit = $("#submit");
const $result = $("#result");

$form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const { value } = $input;

  if (!value) return;

  $submit.setAttribute("disabled", "");
  $submit.setAttribute("aria-busy", "true");

  const infoIP = await result(value);

  $submit.removeAttribute("disabled");
  $submit.removeAttribute("aria-busy", "true");

  if (infoIP) {
    $result.innerHTML = `
    <p>IP:  ${infoIP.data.ip}</p>
    <p>COUNTRY:  ${infoIP.data.country_name}  <img src="${infoIP.data.flag.image}" alt="image"></p>
    <p>COUNTRY CODE:  ${infoIP.data.country_code}</p>
    <p>REGION:  ${infoIP.data.region}</p>
    <p>CITY:  ${infoIP.data.city}</p>
    <p>LAT:  ${infoIP.data.latitude}</p>
    <p>LONG:  ${infoIP.data.longitude}</p>
    <p>CURRENCY:  ${infoIP.data.currency.name}</p>
    <p>TIMEZONE:  ${infoIP.data.time.timezone}</p>
    <p>CONNECTION:  ${infoIP.data.connection.isp}</p>
    `;
  }
});
