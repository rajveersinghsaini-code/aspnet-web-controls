import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import GridRow from "./GridRow";
import GridCell from "./GridCell";
import {
  PAGINATION_ACTIVE_PAGE_CLASS,
  PAGINATION_BORDER_NOBORDER_CLASS,
} from "../private/Constants";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    const { totalRows, pageSize } = this.props;
    const _maxPaging = 6;
    const _totalPages =
      totalRows > pageSize && pageSize > 0
        ? Math.floor(totalRows / pageSize) + (totalRows % pageSize > 0 ? 1 : 0)
        : 0;
    this.state = {
      currentPageNumber: 1,
      totalPages: _totalPages,
      maxPaging: _maxPaging,
      showNextButton: true,
      showPreviousButton: false,
      selectedPageIndex: 0,
    };
  }
  setNextPageClick = () => {
    const { currentPageNumber, totalPages } = this.state;
    const nextPage = this.getNextPageNumber();
    if (nextPage < totalPages) {
      this.setState(
        {
          currentPageNumber: currentPageNumber + 1,
          showNextButton: true,
          showPreviousButton: true,
          selectedPageIndex: nextPage,
        },
        () => {
          this.renderPagingData();
        }
      );
      if (nextPage + 1 === totalPages) {
        this.setState({ showNextButton: false, showPreviousButton: true });
      }
    }
  };
  setLastPageClick = () => {
    const { totalPages, maxPaging } = this.state;
    const lastPage = totalPages - maxPaging;
    this.setState(
      {
        currentPageNumber: lastPage,
        showNextButton: false,
        showPreviousButton: true,
        selectedPageIndex: totalPages - 1,
      },
      () => {
        this.renderPagingData();
      }
    );
  };
  setPreviousPageClick = () => {
    const { currentPageNumber } = this.state;
    const previousPage = this.getPreviousPageNumber();
    if (currentPageNumber > 1) {
      this.setState(
        {
          currentPageNumber: previousPage,
          selectedPageIndex: previousPage - 1,
          showPreviousButton: true,
          showNextButton: true,
        },
        () => {
          this.renderPagingData();
        }
      );
      if (previousPage === 1) {
        this.setState({ showNextButton: true, showPreviousButton: false });
      }
    }
  };
  setFirstPageClick = () => {
    this.setState(
      {
        currentPageNumber: 1,
        selectedPageIndex: 0,
        showPreviousButton: false,
        showNextButton: true,
      },
      () => {
        this.renderPagingData();
      }
    );
  };
  setCurrentPageClick = (event) => {
    if (event) {
      const pageButton = event.target;
      pageButton.className = PAGINATION_ACTIVE_PAGE_CLASS;
      this.setState({ selectedPageIndex: pageButton.value - 1 }, () => {
        this.renderPagingData();
      });
    }
  };

  getNextPageNumber = () => {
    const { currentPageNumber, maxPaging, totalPages } = this.state;
    if (maxPaging >= totalPages) {
      return currentPageNumber + totalPages - 1;
    }
    return currentPageNumber + maxPaging;
  };
  getPreviousPageNumber = () => {
    return this.state.currentPageNumber - 1;
  };
  getNextPageButtonVisiblilty = () => {
    const { maxPaging, totalPages } = this.state;
    return totalPages > maxPaging;
  };

  renderPagingData = () => {
    if (this.props.pageIndexChanging) {
      this.props.pageIndexChanging({
        selectedPageIndex: this.state.selectedPageIndex,
      });
    }
  };
  render() {
    const {
      totalRows,
      pageSize,
      numberOfColumns,
      pageIndexChanging,
      pagerSettings,
      ...props
    } = this.props;
    const {
      currentPageNumber,
      totalPages,
      showPreviousButton,
      showNextButton,
      selectedPageIndex,
    } = this.state;
    let pageCols = [];

    if (showPreviousButton) {
      pageCols.push(
        <GridCell key={-1}>
          <button onClick={this.setFirstPageClick}>{"First"}</button>
        </GridCell>
      );
      pageCols.push(
        <GridCell key={0}>
          <button onClick={this.setPreviousPageClick}>{"<"}</button>
        </GridCell>
      );
    }

    const nextRenderPage = this.getNextPageNumber();
    for (
      let pageIndex = currentPageNumber;
      pageIndex <= nextRenderPage;
      pageIndex++
    ) {
      const isPageSelected = pageIndex === selectedPageIndex + 1;
      const cssName = isPageSelected ? PAGINATION_ACTIVE_PAGE_CLASS : "";
      pageCols.push(
        <GridCell key={pageIndex}>
          <button
            className={cssName}
            onClick={this.setCurrentPageClick}
            value={pageIndex}
            disabled={isPageSelected}
          >
            {pageIndex}
          </button>
        </GridCell>
      );
    }
    if (showNextButton && this.getNextPageButtonVisiblilty()) {
      pageCols.push(
        <GridCell key={totalPages}>
          <button onClick={this.setNextPageClick}>{">"}</button>
        </GridCell>
      );
      pageCols.push(
        <GridCell key={totalPages + 1}>
          <button onClick={this.setLastPageClick}>{"Last"}</button>
        </GridCell>
      );
    }

    let tblClassName = pagerSettings.className;
    if (pagerSettings && pagerSettings.outerBorder === false)
      tblClassName = classnames(
        PAGINATION_BORDER_NOBORDER_CLASS,
        pagerSettings.className
      );

    return (
      <React.Fragment>
        {totalPages > 0 && totalRows > 0 && (
          <GridRow>
            <GridCell
              colSpan={numberOfColumns}
              align={pagerSettings.align}
              className={tblClassName}
            >
              <div {...props}>
                <table cellSpacing="10" border="0" rules="none">
                  <tbody>
                    <GridRow>{pageCols}</GridRow>
                  </tbody>
                </table>
              </div>
            </GridCell>
          </GridRow>
        )}
      </React.Fragment>
    );
  }
}
Pagination.propTypes = {
  totalRows: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  numberOfColumns: PropTypes.number.isRequired,
  pageIndexChanging: PropTypes.func.isRequired,
  pagerSettings: PropTypes.shape({
    className: PropTypes.string,
    outerBorder: PropTypes.bool,
    align: PropTypes.oneOf(["left", "center", "right"]),
  }),
};
Pagination.defaultProps = {
  totalRows: 0,
  pageSize: 0,
  numberOfColumns: 0,
  pageIndexChanging: null,
  pagerSettings: {
    className: "",
    outerBorder: true,
    align: "left",
  },
};
