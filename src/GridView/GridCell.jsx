import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { TABLE_BODY_CELL_CLASS } from "../private/Constants";

function GridCell({ className, visible, ...props }) {
  let tdClassName = classnames(TABLE_BODY_CELL_CLASS, className);
  if (visible !== undefined && visible !== null && visible === false) {
    tdClassName = classnames(tdClassName, "wc-table--cell-hide");
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
export default React.memo(GridCell);
