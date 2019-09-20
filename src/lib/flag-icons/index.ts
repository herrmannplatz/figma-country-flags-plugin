const countriesJSON = require('./countries');
const cache = {};

function importAll(r) {
  r.keys().forEach(key => (cache[key] = r(key)));
}

importAll(require.context('flag-icon-css/flags', true, /\.svg$/));

export const countries = countriesJSON.map(country => ({
  ...country,
  flag_1x1: cache[country.flag_1x1],
  flag_4x3: cache[country.flag_4x3],
}));

export const continents = [...new Set(countries.map(_ => _.continent))];
