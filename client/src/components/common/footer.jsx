import React from "react";

const Footer = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 text-center footer'>
          <p className='text-dark'>
            The Social Network 2.0 &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
