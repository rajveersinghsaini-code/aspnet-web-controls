import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import {
  TABLE_BODY_CELL_CLASS,
  TABLE_CELL_HIDE_CLASS,
} from "../private/Constants";

function GridCell({ className, visible, ...props }) {
  let tdClassName = null;
  if (TABLE_BODY_CELL_CLASS) tdClassName = TABLE_BODY_CELL_CLASS;
  if (className) tdClassName = classnames(tdClassName, className);
  if (visible === false) {
    tdClassName = classnames(tdClassName, TABLE_CELL_HIDE_CLASS);
  }
  return <td className={tdClassName} {...props} />;
}
GridCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  visible: PropTypes.bool,
};
GridCell.defaultProps = {
  className: null,
  children: null,
  visible: true,
};
GridCell.displayName = "GridCell";
export default GridCell;
