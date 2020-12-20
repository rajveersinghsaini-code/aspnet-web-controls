import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { TABLE_CLASS } from "../private/Constants";
import GridCell from "./GridCell";
import GridRow from "./GridRow";
import GridHeaderCell from "./GridHeaderCell";
import Pagination from "./Pagination";
import "./WebControls.css";

class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPageIndex: 0,
      sortExpression: "",
      internalDataSource: this.gridViewInitialLoad(0),
      sortDirection: "ASC",
    };
  }
  static propTypes = {
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
  };
  static defaultProps = {
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
  };

  setRootRef = (ref) => {
    this.gridViewRef = ref;
    const controlRef = this.props.controlRef;
    controlRef && controlRef(ref);
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
      if (sortDir === "ASC") {
        if (a[sortExp] > b[sortExp]) {
          return 1;
        } else if (a[sortExp] < b[sortExp]) {
          return -1;
        }
      } else if (sortDir === "DESC") {
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
      if (columns.type.name === "Columns") {
        const arrayOfColumns = columns.props.children
          ? columns.props.children
          : 0;
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
          <GridHeaderCell
            key={index}
            visible={child.visible}
            scope="col"
            title={child.headerText}
          >
            {child.headerText}
            {allowSorting && child.sortExpression && (
              <React.Fragment>
                <a
                  href="javascript:void(0)"
                  onClick={() =>
                    this.setSortExpression(child.sortExpression, "ASC")
                  }
                >
                  {"<"}
                </a>
                <a
                  href="javascript:void(0)"
                  onClick={() =>
                    this.setSortExpression(child.sortExpression, "DESC")
                  }
                >
                  {">"}
                </a>
              </React.Fragment>
            )}
          </GridHeaderCell>
        );
      })
    );
  };
  setSortExpression = (sortExp, sortDir) => {
    this.setState({ sortExpression: sortExp, sortDirection: sortDir }, () => {
      this.getPaginationData();
    });
  };
  getTableBodyContent = (dataFieldNames, internalDataSource) => {
    const { emptyDataText } = this.props;
    if (dataFieldNames && dataFieldNames.length > 0) {
      const numberOfColumns = dataFieldNames.length;
      if (internalDataSource && internalDataSource.length > 0) {
        return internalDataSource.map((obj, rowIndex) => {
          return (
            <GridRow key={rowIndex}>
              {dataFieldNames.map((field, colIndex) => {
                let tdText = "";
                if (obj && obj.hasOwnProperty(field.dataField)) {
                  tdText = obj[field.dataField];
                }
                if (
                  field.dataExpression &&
                  typeof field.dataExpression === "function"
                ) {
                  tdText = field.dataExpression(obj);
                }
                return (
                  <GridCell key={colIndex} visible={field.visible}>
                    {tdText}
                  </GridCell>
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
      ...elementProps
    } = this.props;

    const { internalDataSource } = this.state;
    const totalRows = dataSource.length;
    const dataFieldNames = this.getDataColumnsDetails();
    const numberOfColumns = dataFieldNames.length;
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
          <thead>{headerRow && <GridRow>{headerRow}</GridRow>}</thead>
          <tbody>
            {bodyRows}
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
      </div>
    );
  }
}
export default GridView;
