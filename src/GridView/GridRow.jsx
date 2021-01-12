import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { TABLE_BODY_ROW_CLASS } from "../private/Constants";

export default function GridRow({ className, ...props }) {
  let trClassName = null;
  if (TABLE_BODY_ROW_CLASS) trClassName = TABLE_BODY_ROW_CLASS;
  if (className) classnames(trClassName, className);
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
GridRow.displayName = "GridRow";
