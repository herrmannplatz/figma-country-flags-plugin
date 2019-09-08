const cache = {};

function importAll(r) {
  r.keys().forEach(key => (cache[key] = r(key)));
}

importAll(require.context("flag-icon-css/flags", true, /\.svg$/));

export default cache;
