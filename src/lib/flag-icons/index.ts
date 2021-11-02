const countryJSON = require("flag-icon-css/country.json");
const cache = {};

function importAll(r) {
  r.keys().forEach((key) => (cache[key] = r(key)));
}

importAll(require.context("flag-icon-css", true, /flags\/.*\.svg$/));

export const countries = countryJSON.map((country) => ({
  ...country,
  flag_1x1: cache[`./${country.flag_1x1}`].default,
  flag_4x3: cache[`./${country.flag_4x3}`].default,
}));
