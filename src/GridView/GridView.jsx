import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import {
  TABLE_CLASS,
  TABLE_SORT_ASCENDING,
  TABLE_SORT_DESCENDING,
} from "../private/Constants";
import GridCell from "./GridCell";
import GridRow from "./GridRow";
import GridHeaderCell from "./GridHeaderCell";
import Pagination from "./Pagination";
import "./WebControls.css";
import { resultOf } from "../private/AppUtility";
import { defaultPagerSetting } from "../private/CustomPropTypes";
import IconArrow from "../private/IconArrow";

export default class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPageIndex: 0,
      sortExpression: "",
      internalDataSource: this.gridViewInitialLoad(0),
      sortDirection: TABLE_SORT_ASCENDING,
    };
  }

  setRootRef = (ref) => {
    this.gridViewRef = ref;
    //const controlRef = this.props.controlRef;
    //controlRef && controlRef(ref);
  };

  onPaginationClick = (pagingObject) => {
    const { allowPaging } = this.props;
    const { sortExpression, sortDirection } = this.state;
    if (allowPaging) {
      let selectedPageIndex = 0;
      if (pagingObject && pagingObject.hasOwnProperty("selectedPageIndex")) {
        selectedPageIndex = pagingObject.selectedPageIndex;
      }
      this.getPaginationData(sortExpression, sortDirection, selectedPageIndex);
    }
  };
  getPaginationData = (sortExpression, sortDirection, selectedPageIndex) => {
    const { pageSize, allowPaging, dataSource, allowSorting } = this.props;
    let filterData = dataSource;

    if (allowSorting && sortExpression !== "" && sortDirection !== "") {
      const sortOrder = this.getSortOrder(sortExpression, sortDirection);
      filterData.sort(sortOrder);
    }
    if (allowPaging) {
      const startRec = Math.max(selectedPageIndex, 0) * pageSize;
      const endRec = startRec + pageSize;
      filterData = filterData.slice(startRec, endRec);
    }
    this.setState({
      sortExpression: sortExpression,
      sortDirection: sortDirection,
      selectedPageIndex: selectedPageIndex,
      internalDataSource: filterData,
    });
  };
  getSortOrder = (sortExp, sortDir) => {
    return (a, b) => {
      if (sortDir === TABLE_SORT_ASCENDING) {
        if (a[sortExp] > b[sortExp]) {
          return 1;
        } else if (a[sortExp] < b[sortExp]) {
          return -1;
        }
      } else if (sortDir === TABLE_SORT_DESCENDING) {
        if (a[sortExp] < b[sortExp]) {
          return 1;
        } else if (a[sortExp] > b[sortExp]) {
          return -1;
        }
      }
      return 0;
    };
  };
  gridViewInitialLoad = () => {
    const { pageSize, allowPaging, dataSource } = this.props;
    const selectedPageIndex = 0;
    if (allowPaging) {
      const startRec = Math.max(selectedPageIndex, 0) * pageSize;
      const endRec = startRec + pageSize;
      return dataSource.slice(startRec, endRec);
    } else {
      return dataSource;
    }
  };
  getGridViewLineRules = () => {
    const { gridLines } = this.props;
    let gridLineRules = "none";
    if (gridLines === "None" || gridLines === "none") {
      gridLineRules = "none";
    } else if (gridLines === "Horizontal" || gridLines === "horizontal") {
      gridLineRules = "rows";
    } else if (gridLines === "Vertical" || gridLines === "vertical") {
      gridLineRules = "cols";
    } else if (gridLines === "Both" || gridLines === "both") {
      gridLineRules = "all";
    }
    return gridLineRules;
  };

  getDataColumnsDetails = () => {
    const { children } = this.props;
    let dataFieldNames = [];
    React.Children.forEach(children, (columns) => {
      if (columns.type.displayName === "Columns") {
        const arrayOfColumns = columns.props.children
          ? columns.props.children
          : null;
        arrayOfColumns &&
          arrayOfColumns.map((child) => {
            return dataFieldNames.push(child.props);
          });
      } else {
        return new Error(
          "Invalid child elements supplied to GridView. Validation failed."
        );
      }
    });
    return dataFieldNames;
  };

  getPagerSettings = () => {
    const { children } = this.props;
    let pSettings = defaultPagerSetting;
    React.Children.forEach(children, (pager) => {
      if (pager.type.displayName === "PagerSettings") {
        pSettings = pager.props;
      }
    });
    return pSettings;
  };
  setSortExpression = (sortExp, sortDir) => {
    const { sortExpression, sortDirection, selectedPageIndex } = this.state;
    if (sortExpression !== sortExp || sortDirection !== sortDir) {
      this.getPaginationData(sortExp, sortDir, selectedPageIndex);
    }
  };
  getRowNumberStartIndex = () => {
    const { pageSize } = this.props;
    const { selectedPageIndex } = this.state;
    let startRec = Math.max(selectedPageIndex, 0) * pageSize;
    return startRec;
  };
  getGridviewHeaderRow = (dataFieldNames) => {
    const {
      showHeader,
      showHeaderWhenEmpty,
      allowSorting,
      dataSource,
    } = this.props;
    const _showHeader = showHeader && dataSource.length > 0 ? true : false;
    return (
      (_showHeader || showHeaderWhenEmpty) &&
      dataFieldNames.map((child, index) => {
        const headerText =
          child.visible &&
          child.headerExpression &&
          typeof child.headerExpression === "function"
            ? resultOf(child.headerExpression())
            : child.headerText;
        return (
          child.visible && (
            <GridHeaderCell
              key={index}
              scope="col"
              title={child.headerText}
              style={child.headerStyle}
              className={child.headerCssClass}
              abbr={
                child.accessibleHeaderText ? child.accessibleHeaderText : null
              }
            >
              {headerText}
              {allowSorting && child.sortExpression && (
                <span className="wc-table--sorting-container">
                  <ul>
                    <li
                      title="Sort ascending"
                      onClick={() =>
                        this.setSortExpression(
                          child.sortExpression,
                          TABLE_SORT_ASCENDING
                        )
                      }
                    >
                      <IconArrow
                        arrowType="up"
                        arrowSize={4}
                        style={{ display: "inherit" }}
                      />
                    </li>
                    <li
                      title="Sort descending"
                      onClick={() =>
                        this.setSortExpression(
                          child.sortExpression,
                          TABLE_SORT_DESCENDING
                        )
                      }
                      style={{ marginTop: "3px" }}
                    >
                      <IconArrow
                        arrowType="down"
                        arrowSize={4}
                        style={{ display: "inherit" }}
                      />
                    </li>
                  </ul>
                </span>
              )}
            </GridHeaderCell>
          )
        );
      })
    );
  };

  getTableBodyContent = (dataFieldNames, internalDataSource) => {
    const {
      emptyDataText,
      showRowNumbers,
      alternatingRowStyle,
      onRowDataBound,
    } = this.props;
    const rowNumstart = showRowNumbers && this.getRowNumberStartIndex();
    if (dataFieldNames && dataFieldNames.length > 0) {
      const numberOfColumns = dataFieldNames.length;
      if (internalDataSource && internalDataSource.length > 0) {
        return internalDataSource.map((obj, rowIndex) => {
          const isEvenRow = (rowIndex + 1) % 2 === 0;
          const altRowStyle = isEvenRow ? alternatingRowStyle : null;
          const bodyRow = (
            <GridRow key={rowIndex} style={altRowStyle}>
              {showRowNumbers && (
                <GridCell
                  key="-1"
                  scope="row"
                  className="wc-table--serial-number"
                >
                  {rowNumstart + rowIndex + 1}
                </GridCell>
              )}
              {dataFieldNames.map((field, colIndex) => {
                let tdText = "";
                if (
                  field.visible &&
                  obj &&
                  obj.hasOwnProperty(field.dataField)
                ) {
                  tdText = obj[field.dataField];
                }
                if (
                  field.visible &&
                  field.dataExpression &&
                  typeof field.dataExpression === "function"
                ) {
                  tdText = resultOf(field.dataExpression(obj));
                }
                return (
                  field.visible && (
                    <GridCell
                      key={colIndex}
                      style={field.itemStyle}
                      className={field.itemCssClass}
                    >
                      {tdText}
                    </GridCell>
                  )
                );
              })}
            </GridRow>
          );
          if (onRowDataBound && typeof onRowDataBound === "function") {
            onRowDataBound({ RowIndex: rowIndex, Data: obj });
          }
          return bodyRow;
        });
      } else {
        return (
          <GridRow>
            <GridCell colSpan={numberOfColumns}>{emptyDataText}</GridCell>
          </GridRow>
        );
      }
    }
  };
  getGridviewFooterRow = (dataFieldNames, internalDataSource) => {
    const { showFooter, showRowNumbers } = this.props;
    if (showFooter && dataFieldNames.length > 0) {
      const gridRow = (
        <GridRow key={internalDataSource.length}>
          {showRowNumbers && <GridCell key="-1"></GridCell>}
          {dataFieldNames.map((field, colIndex) => {
            let tdText = "";
            if (field.visible && field.footerExpression) {
              if (typeof field.footerExpression === "function")
                tdText = resultOf(field.footerExpression());
              else tdText = resultOf(field.footerExpression);
            }
            return (
              field.visible && (
                <GridCell
                  key={colIndex}
                  style={field.footerStyle}
                  className={field.footerCssClass}
                >
                  {tdText}
                </GridCell>
              )
            );
          })}
        </GridRow>
      );
      return gridRow;
    }
  };

  render() {
    const {
      id,
      cssClass,
      allowPaging,
      pageSize,
      allowSorting,
      showFooter,
      showHeader,
      showHeaderWhenEmpty,
      children,
      cellPadding,
      cellSpacing,
      gridLines,
      caption,
      outerBorder,
      dataSource,
      dataKeyNames,
      emptyDataText,
      showRowNumbers,
      showTotalRows,
      alternatingRowStyle,
      onRowDataBound,
      initializeValuesOnEvents,
      ...elementProps
    } = this.props;
    if (
      initializeValuesOnEvents &&
      typeof initializeValuesOnEvents === "function"
    ) {
      initializeValuesOnEvents();
    }
    const { internalDataSource } = this.state;
    const totalRows = dataSource.length;
    const dataFieldNames = this.getDataColumnsDetails();
    const pagerSettings = this.getPagerSettings();

    let numberOfColumns = dataFieldNames.filter((obj) => {
      return obj.visible === true;
    }).length;
    numberOfColumns = showRowNumbers ? numberOfColumns + 1 : numberOfColumns;

    const headerRow = this.getGridviewHeaderRow(dataFieldNames);
    const bodyRows = this.getTableBodyContent(
      dataFieldNames,
      internalDataSource
    );
    const footerRow = this.getGridviewFooterRow(
      dataFieldNames,
      internalDataSource
    );

    const gridLineRules = this.getGridViewLineRules();
    let _outerBorder = outerBorder ? 1 : 0;
    if (gridLineRules === "none") {
      _outerBorder = 0;
    }
    //Css Class
    let tblClassName = null;
    if (TABLE_CLASS) tblClassName = TABLE_CLASS;
    if (cssClass) tblClassName = classnames(tblClassName, cssClass);

    return (
      <div>
        <table
          id={id}
          cellSpacing={cellSpacing}
          cellPadding={cellPadding}
          border={_outerBorder}
          rules={gridLineRules}
          className={tblClassName}
          ref={this.setRootRef}
          {...elementProps}
        >
          {caption && (
            <caption className="wc-table--caption">{caption}</caption>
          )}
          <thead>
            {headerRow && (
              <GridRow key="-1">
                {showRowNumbers && (
                  <GridHeaderCell
                    key={-1}
                    disabled={true}
                    className="wc-table--serial-number"
                    scope="col"
                  >
                    {"#"}
                  </GridHeaderCell>
                )}
                {headerRow}
              </GridRow>
            )}
          </thead>
          <tbody>
            {bodyRows}
            {footerRow}
            {allowPaging && (
              <Pagination
                numberOfColumns={numberOfColumns}
                pageSize={pageSize}
                totalRows={totalRows}
                pagerSettings={pagerSettings}
                pageIndexChanging={this.onPaginationClick}
              />
            )}
          </tbody>
          <tfoot></tfoot>
        </table>
        {showTotalRows && dataSource && <span>Total Records: {totalRows}</span>}
      </div>
    );
  }
}
GridView.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  dataSource: PropTypes.arrayOf(PropTypes.object),
  onRowDataBound: PropTypes.func,
  cssClass: PropTypes.string,
  allowPaging: PropTypes.bool,
  pageSize: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  allowSorting: PropTypes.bool,
  showFooter: PropTypes.bool,
  showHeader: PropTypes.bool,
  showHeaderWhenEmpty: PropTypes.bool,
  cellSpacing: PropTypes.number,
  cellPadding: PropTypes.number,
  gridLines: PropTypes.oneOf([
    "None",
    "Horizontal",
    "Vertical",
    "Both",
    "none",
    "horizontal",
    "vertical",
    "both",
  ]),
  caption: PropTypes.string,
  outerBorder: PropTypes.bool,
  dataKeyNames: PropTypes.arrayOf(PropTypes.string),
  emptyDataText: PropTypes.string,
  showRowNumbers: PropTypes.bool,
  showTotalRows: PropTypes.bool,
  alternatingRowStyle: PropTypes.object,
  initializeValuesOnEvents: PropTypes.func,
};
GridView.defaultProps = {
  allowPaging: false,
  pageSize: 10,
  allowSorting: false,
  showFooter: false,
  showHeader: true,
  showHeaderWhenEmpty: false,
  cssClass: null,
  width: null,
  height: null,
  cellSpacing: 0,
  cellPadding: null,
  caption: null,
  gridLines: "Both",
  outerBorder: true,
  dataSource: [],
  dataKeyNames: null,
  onRowDataBound: null,
  emptyDataText: "No data available.",
  showRowNumbers: true,
  showTotalRows: true,
  alternatingRowStyle: null,
  initializeValuesOnEvents: null,
};
GridView.displayName = "GridView";
