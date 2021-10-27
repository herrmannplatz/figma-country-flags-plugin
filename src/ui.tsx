import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

// figma-plugin-cs
import './lib/figma-plugin-ds/icon-input';
import './lib/figma-plugin-ds/select-menu';
import './lib/figma-plugin-ds/index.css';

import SearchInput from './components/SearchInput';
import Settings from './components/Settings';

import {countries} from './lib/flag-icons';
import {includes, decodeDataURI} from './lib/utils';

import './ui.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [ratio, setRatio] = useState('4x3');

  useEffect(() => {
    // need to be called when content is rendered
    (window as any).selectMenu.init();
    (window as any).iconInput.init();
  }, []);

  const flags = countries.filter(({name, code}) => {
    const matchesQuery = includes(name, query) || query === code;
    return matchesQuery;
  });

  const onCreate = (flag) => {
    const svg = decodeDataURI(flag['flag_' + ratio]);
    parent.postMessage({pluginMessage: {type: 'create-flag', svg}}, '*');
  };

  return (
    <div>
      <div className="header">
        <SearchInput onChange={setQuery} />
        <Settings ratio={ratio} onChangeRatio={setRatio} />
      </div>
      <div className="content">
        <div className="flags">
          {flags.map((flag) => (
            <div
              onClick={() => onCreate(flag)}
              className="flag"
              key={flag.code}
            >
              <img src={flag['flag_' + ratio]} />
              <div className="flag-name">{flag.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('react-page'));
