import React, { Fragment } from "react";

const Input = ({ label, name, error, icon = "fas fa-keyboard", ...rest }) => {
  return (
    <Fragment>
      <label htmlFor={name}>{label}</label>
      <div className='form-group'>
        <div className='input-group flex-nowrap'>
          <div className='input-group-prepend'>
            <span className='input-group-text' id='addon-wrapping'>
              <i className={icon}></i>
            </span>
          </div>

          <input {...rest} className='form-control' id={name} name={name} />
        </div>
        {error && <span className='text-danger'>{error}</span>}
      </div>
    </Fragment>
  );
};

export default Input;
