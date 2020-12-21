import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
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
    if (allowPaging) {
      let selectedPageIndex = 0;
      if (pagingObject && pagingObject.hasOwnProperty("selectedPageIndex")) {
        selectedPageIndex = pagingObject.selectedPageIndex;
      }
      this.setState({ selectedPageIndex: selectedPageIndex }, () => {
        this.getPaginationData();
      });
    }
  };
  getPaginationData = () => {
    const { pageSize, allowPaging, dataSource, allowSorting } = this.props;
    const { sortExpression, sortDirection, selectedPageIndex } = this.state;
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
    this.setState({ internalDataSource: filterData });
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
        return (
          child.visible && (
            <GridHeaderCell
              key={index}
              visible={child.visible}
              scope="col"
              title={child.headerText}
              style={child.headerStyle}
              className={child.headerCssClass}
            >
              {child.headerText}
              {allowSorting && child.sortExpression && (
                <span style={{ float: "right" }}>
                  <a
                    href="/#"
                    style={{ textDecoration: "none" }}
                    title="Sort ascending order"
                    onClick={() =>
                      this.setSortExpression(
                        child.sortExpression,
                        TABLE_SORT_ASCENDING
                      )
                    }
                  >
                    {"<"}
                  </a>
                  <a
                    href="/#"
                    style={{ textDecoration: "none" }}
                    title="Sort descending order"
                    onClick={() =>
                      this.setSortExpression(
                        child.sortExpression,
                        TABLE_SORT_DESCENDING
                      )
                    }
                  >
                    {">"}
                  </a>
                </span>
              )}
            </GridHeaderCell>
          )
        );
      })
    );
  };
  setSortExpression = (sortExp, sortDir) => {
    const { sortExpression, sortDirection } = this.state;
    if (sortExpression !== sortExp || sortDirection !== sortDir) {
      this.setState({ sortExpression: sortExp, sortDirection: sortDir }, () => {
        this.getPaginationData();
      });
    }
  };
  getRowNumberStartIndex = () => {
    const { pageSize } = this.props;
    const { selectedPageIndex } = this.state;
    let startRec = Math.max(selectedPageIndex, 0) * pageSize;
    return startRec;
  };
  getTableBodyContent = (dataFieldNames, internalDataSource) => {
    const { emptyDataText, showRowNumbers } = this.props;
    const rowNumstart = showRowNumbers && this.getRowNumberStartIndex();
    if (dataFieldNames && dataFieldNames.length > 0) {
      const numberOfColumns = dataFieldNames.length;
      if (internalDataSource && internalDataSource.length > 0) {
        return internalDataSource.map((obj, rowIndex) => {
          return (
            <GridRow key={rowIndex}>
              {showRowNumbers && (
                <GridCell key={rowIndex}>{rowNumstart + rowIndex + 1}</GridCell>
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
                      visible={field.visible}
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
      pagerSettings,
      showRowNumbers,
      showTotalRows,
      ...elementProps
    } = this.props;

    const { internalDataSource } = this.state;
    const totalRows = dataSource.length;
    const dataFieldNames = this.getDataColumnsDetails();
    let numberOfColumns = dataFieldNames.filter((obj) => {
      return obj.visible === true;
    }).length;
    numberOfColumns = showRowNumbers ? numberOfColumns + 1 : numberOfColumns;

    const headerRow = this.getGridviewHeaderRow(dataFieldNames);
    const bodyRows = this.getTableBodyContent(
      dataFieldNames,
      internalDataSource
    );
    const tblClassName = classnames(TABLE_CLASS, cssClass);
    const gridLineRules = this.getGridViewLineRules();
    let _outerBorder = outerBorder ? 1 : 0;
    if (gridLineRules === "none") {
      _outerBorder = 0;
    }
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
              <GridRow>
                {showRowNumbers && (
                  <GridHeaderCell key={-1} disabled={true}>
                    {"#"}
                  </GridHeaderCell>
                )}
                {headerRow}
              </GridRow>
            )}
          </thead>
          <tbody>{bodyRows}</tbody>
          <tfoot>
            {allowPaging && (
              <Pagination
                numberOfColumns={numberOfColumns}
                pageSize={pageSize}
                totalRows={totalRows}
                pagerSettings={pagerSettings}
                pageIndexChanging={this.onPaginationClick}
              />
            )}
          </tfoot>
        </table>
        {showTotalRows && dataSource && <span>Total Records: {totalRows}</span>}
      </div>
    );
  }
}
GridView.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.object),
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
  pagerSettings: PropTypes.shape({
    className: PropTypes.string,
    outerBorder: PropTypes.bool,
    align: PropTypes.oneOf(["left", "center", "right"]),
  }),
  showRowNumbers: PropTypes.bool,
  showTotalRows: PropTypes.bool,
};
GridView.defaultProps = {
  allowPaging: false,
  pageSize: 10,
  allowSorting: false,
  showFooter: false,
  showHeader: true,
  showHeaderWhenEmpty: false,
  width: null,
  height: null,
  cellSpacing: 0,
  cellPadding: 2,
  caption: null,
  gridLines: "Both",
  outerBorder: true,
  dataSource: [],
  dataKeyNames: null,
  emptyDataText: "No data available.",
  pagerSettings: {
    className: "",
    outerBorder: true,
    align: "left",
  },
  showRowNumbers: true,
  showTotalRows: true,
};
GridView.displayName = "GridView";
