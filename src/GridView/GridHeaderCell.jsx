import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import {
  TABLE_BODY_HEADER_CLASS,
  TABLE_CELL_HIDE_CLASS,
} from "../private/Constants";

function GridHeaderCell({ className, visible, ...props }) {
  let thClassName = null;
  if (TABLE_BODY_HEADER_CLASS) thClassName = TABLE_BODY_HEADER_CLASS;
  if (className) thClassName = classnames(thClassName, className);
  if (visible === false) {
    thClassName = classnames(thClassName, TABLE_CELL_HIDE_CLASS);
  }
  return <th className={thClassName} {...props} />;
}
GridHeaderCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  visible: PropTypes.bool,
};
GridHeaderCell.defaultProps = {
  className: null,
  children: null,
  visible: true,
};
GridHeaderCell.displayName = "GridHeaderCell";
export default GridHeaderCell;
