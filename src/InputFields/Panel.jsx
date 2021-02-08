import React from "react";
import PropTypes from "prop-types";
const Panel = (props) => {
  const { children, ...otherPorps } = props;
  return <div {...otherPorps}>{children}</div>;
};
Panel.propTypes = {
  children: PropTypes.any,
};
export default Panel;
Panel.displayName = "Panel";
