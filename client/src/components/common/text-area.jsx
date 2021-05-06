import React from "react";

const TextArea = ({ label, name, error, ...rest }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <div className='input-group'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>{label}</span>
        </div>

        <textarea
          {...rest}
          id={name}
          name={name}
          className='form-control'
        ></textarea>
      </div>
      {error && <span className='text-danger'>{error}</span>}
    </div>
  );
};

export default TextArea;
