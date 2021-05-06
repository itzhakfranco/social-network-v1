import React from "react";

const InputGroupInput = ({ name, error, ...rest }) => {
  return (
    <input
      {...rest}
      id={name}
      name={name}
      className='form-control'
      placeholder='Write Comment'
    />
  );
};

export default InputGroupInput;
