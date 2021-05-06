import React from "react";

const PageHeader = ({ title, desc }) => {
  return (
    <div className='card mt-4'>
      <div className='card-body'>
        <h5 className='card-title text-center'>{title}</h5>

        <p className='card-text text-center'>{desc}</p>
      </div>
    </div>
  );
};

export default PageHeader;
