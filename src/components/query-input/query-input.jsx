import React from "react";

import "./query-input.css";

function QueryInput({ value, onChange}) {
  return (
    <div className="search-form__query-wrapper">
      <input
        className="search-form__query-input"
        type="search"
        name="query"
        id="query"
        value={value}
        onChange={onChange}
        required
      />
      <button
        className="search-form__submit"
        type="submit"
        tabIndex="-1"
      />
    </div>
  );
}

export default QueryInput;
