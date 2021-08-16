import React from "react";

import "./categories-input.css";

function CustomSelect({ value, onChange, optionValues, title }) {
  return (
    <div className="search-form__select-container">
      <h4 className="search-form__select-title">{title}</h4>
      <select
        className='search-form__select'
        name="categories"
        id="categories"
        value={value}
        onChange={onChange}
      >
        {optionValues.map((item) => (
          <option value={item.name} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CustomSelect;
