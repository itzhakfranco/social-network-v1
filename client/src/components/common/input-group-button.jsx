import React, { Fragment } from "react";

const InputGroupButton = ({ name, disabled, error, ...rest }) => {
  return (
    <Fragment>
      <div className='input-group-append'>
        <input
          {...rest}
          disabled={disabled}
          id={name}
          name={name}
          className='text-decoration-none text-white btn btn-primary'
          type='submit'
        />
      </div>
      <div className='input-group'>
        {error && <span className='text-danger'>{error}</span>}
      </div>
    </Fragment>
  );
};

export default InputGroupButton;
