import PropTypes from "prop-types";
import React from "react";
export default function Columns() {
  return <React.Fragment></React.Fragment>;
}
Columns.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
Columns.displayName = "Columns";
