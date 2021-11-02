import * as React from "react";
import "./SearchInput.css";

function SearchInput({ onChange }) {
  return (
    <div className="input__section">
      <div className="input-icon">
        <div className="input-icon__icon">
          <div className="icon icon--search icon--black-3"></div>
        </div>
        <input
          type="input"
          onChange={(e) => onChange(e.target.value)}
          className="input-icon__input"
          placeholder="Search country name or code"
        />
      </div>
    </div>
  );
}

export default SearchInput;
