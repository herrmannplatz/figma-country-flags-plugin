import React, { useState } from "react";
import ReactDOM from "react-dom";

// figma-plugin-cs
import "./lib/figma-plugin-ds/icon-input";
import "./lib/figma-plugin-ds/select-menu";
import "./lib/figma-plugin-ds/index.css";

import SearchInput from "./components/SearchInput";
import Settings from "./components/Settings";

import flagIcon from "./lib/flag-icons";
import { includes, decodeDataURI } from "./lib/utils";

import "./ui.css";

const countriesJSON = require("./countries");

const countries = countriesJSON.map(country => ({
  ...country,
  flag_1x1: flagIcon[country.flag_1x1],
  flag_4x3: flagIcon[country.flag_4x3]
}));

const getFlagIcon = (flag, ratio) => flag["flag_" + ratio];

const categories = [
  "World",
  ...new Set(countries.map(({ continent }) => continent))
];

// need to be called when content is rendered
setTimeout(() => {
  (window as any).selectMenu.init();
  (window as any).iconInput.init();
}, 0);

const App = () => {
  const [query, setQuery] = useState("");
  const [ratio, setRatio] = useState("1x1");
  const [continent, setContinent] = useState("World");

  const flags = countries.filter(({ continent: c, name, alpha_2 }) => {
    const isSelectedContinent = c === continent || continent === "World";
    const matchesQuery =
      includes(name, query) || query.toUpperCase() === alpha_2;
    return isSelectedContinent && matchesQuery;
  });

  const onCreate = flag => {
    const dataURI = getFlagIcon(flag, ratio);
    const svg = decodeDataURI(dataURI);
    parent.postMessage({ pluginMessage: { type: "create-flag", svg } }, "*");
  };

  return (
    <div>
      <div className="header">
        <SearchInput onChange={setQuery} />
        <Settings
          categories={categories}
          ratio={ratio}
          onChangeContinent={setContinent}
          onChangeRatio={setRatio}
        />
      </div>
      <div className="content">
        <div className="flags">
          {flags.map(flag => (
            <div onClick={() => onCreate(flag)} className="flag" key={flag.id}>
              <img src={getFlagIcon(flag, ratio)} />
              <div className="flag-name">{flag.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("react-page"));
