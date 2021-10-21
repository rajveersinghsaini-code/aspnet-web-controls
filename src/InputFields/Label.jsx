import React from "react";
import PropTypes from "prop-types";
const Label = (props) => {
  const { children, ...otherPorps } = props;
  return <span {...otherPorps}>{children}</span>;
};
Label.propTypes = {
  children: PropTypes.any,
};
export default Label;
Label.displayName = "Label";
