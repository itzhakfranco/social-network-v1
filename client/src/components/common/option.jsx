import React from "react";

const Option = ({ option }) => {
  return <option value={option.value}>{option.name}</option>;
};

export default Option;
