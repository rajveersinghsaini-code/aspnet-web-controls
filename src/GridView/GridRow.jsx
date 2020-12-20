import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { TABLE_BODY_ROW_CLASS } from "../private/Constants";

function GridRow({ className, ...props }) {
  const trClassName = classnames(TABLE_BODY_ROW_CLASS, className);
  return <tr className={trClassName} {...props} />;
}

GridRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
GridRow.defaultProps = {
  className: null,
  children: null,
};
export default React.memo(GridRow);
