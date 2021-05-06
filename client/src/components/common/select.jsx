import React from "react";
import Option from "./option";
const Select = ({ options, label, name, error, ...rest }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <div className='input-group flex-nowrap'>
        <div className='input-group-prepend'>
          <span className='input-group-text' id='addon-wrapping'>
            <i className=''>*</i>
          </span>
        </div>

        <select {...rest} name={name} className='form-control' id={name}>
          {options.map((option) => (
            <Option key={option.id} option={option} />
          ))}
        </select>
      </div>
      {error && <span className='text-danger'>{error}</span>}
    </div>
  );
};

export default Select;
