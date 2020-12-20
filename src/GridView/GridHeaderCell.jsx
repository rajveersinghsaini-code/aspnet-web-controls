import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { TABLE_BODY_HEADER_CLASS } from "../private/Constants";

function GridHeaderCell({ className, visible, ...props }) {
  let thClassName = classnames(TABLE_BODY_HEADER_CLASS, className);
  if (visible !== undefined && visible !== null && visible === false) {
    thClassName = classnames(thClassName, "wc-table--cell-hide");
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
export default React.memo(GridHeaderCell);
