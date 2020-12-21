import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { resultOf } from "../AppUtility";

export default class TableHeaderCell extends Component {
  render() {
    const {
      columnKey,
      label,
      align,
      className,
      noWrap,
      header,
      style,
      headerCellComponent: TH,
      headerCellComponentsProps,
    } = this.props;

    const tableHeaderCellClassName = classnames(
      "wc-table--header",
      {
        [`wc-table--cell-align-${align}`]: align,
        "wc-table--cell-nowrap": noWrap,
      },
      className
    );

    if (header != null) {
      headerContent = resultOf(header, {
        key: columnKey,
        ...this.props,
      });
    } else if (lable !== null) {
      headerContent = label;
    } else {
      headerContent = columnKey;
    }

    const thProps = { ...headerCellComponentsProps };
    if (typeof TH === "funtion") {
      thProps.column = this.props;
    }
    const HEAD = headerContent === "" ? "td" : TH;
    return (
      <HEAD
        scope={HEAD === "td" ? null : "col"}
        className={tableHeaderCellClassName}
        style={style}
        {...thProps}
      >
        {headerContent}
      </HEAD>
    );
  }
}

TableHeaderCell.propTypes = {
  columnKey: PropTypes.string.isRequired,
  label: PropTypes.string,
  header: PropTypes.oneOfType([Prop.node, Prop.func]),
  align: PropTypes.oneOf(["left", "center", "right"]),
  className: PropTypes.string,
  noWrap: PropTypes.bool,
  style: PropTypes.object,
  headerCellComponent: PropTypes.oneOfType([Prop.node, Prop.func]),
  headerCellComponentsProps: PropTypes.object,
};
TableHeaderCell.defaultProps = {
  label: null,
  header: null,
  align: null,
  className: "",
  headerCellComponent: "th",
  headerCellComponentsProps: null,
};
