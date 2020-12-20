import PropTypes from "prop-types";
import React from "react";

export default function BoundField({ ...props }) {
  return <React.Fragment></React.Fragment>;
}
BoundField.propTypes = {
  headerText: PropTypes.string.isRequired,
  dataField: PropTypes.string,
  dataFormatString: PropTypes.string,
  itemStyleCssClass: PropTypes.string,
  visible: PropTypes.bool,
  dataExpression: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  sortExpression: PropTypes.string,
  headerStyle: PropTypes.object,
  itemStyle: PropTypes.object,
  headerCssClass: PropTypes.string,
  itemCssClass: PropTypes.string,
};
BoundField.defaultProps = {
  headerText: "",
  dataField: null,
  dataFormatString: null,
  itemStyleCssClass: null,
  visible: true,
  dataExpression: null,
  sortExpression: null,
  headerStyle: null,
  itemStyle: null,
  headerCssClass: null,
  itemCssClass: null,
};
