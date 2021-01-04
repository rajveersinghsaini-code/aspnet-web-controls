import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import GridRow from "./GridRow";
import GridCell from "./GridCell";
import PagerItem from "./PagerItem";
import {
  PAGINATION_ACTIVE_PAGE_CLASS,
  PAGINATION_BORDER_NOBORDER_CLASS,
} from "../private/Constants";
import { pagerSetting, defaultPagerSetting } from "../private/CustomPropTypes";
import "./Pagination.css";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    const { totalRows, pageSize } = this.props;
    const _totalPages =
      totalRows > pageSize && pageSize > 0
        ? Math.floor(totalRows / pageSize) + (totalRows % pageSize > 0 ? 1 : 0)
        : 0;
    const pageButtonCount = this.props.pagerSettings.pageButtonCount - 1;
    const showNextButton =
      _totalPages > this.props.pagerSettings.pageButtonCount;
    this.state = {
      currentPageNumber: 1,
      totalPages: _totalPages,
      pageButtonCount: pageButtonCount,
      showNextButton: showNextButton,
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
    const { totalPages, pageButtonCount } = this.state;
    const lastPage = totalPages - pageButtonCount;
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
  setCurrentPageClick = (pageNumber) => {
    this.setState({ selectedPageIndex: pageNumber - 1 }, () => {
      this.renderPagingData();
    });
  };

  getNextPageNumber = () => {
    const { currentPageNumber, pageButtonCount, totalPages } = this.state;
    if (pageButtonCount >= totalPages) {
      return currentPageNumber + totalPages - 1;
    }
    return currentPageNumber + pageButtonCount;
  };
  getPreviousPageNumber = () => {
    return this.state.currentPageNumber - 1;
  };
  getNextPageButtonVisiblilty = () => {
    const { pageButtonCount, totalPages } = this.state;
    return totalPages > pageButtonCount;
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
    let pagerItems = [];

    const pagerType = pagerSettings.pagerType;

    if (showPreviousButton) {
      pagerItems.push(
        <PagerItem
          key={-1}
          onPageClick={this.setFirstPageClick}
          pageNumber={pagerSettings.firstPageText}
          pagerType={pagerType}
        />
      );
      pagerItems.push(
        <PagerItem
          key={0}
          onPageClick={this.setPreviousPageClick}
          pageNumber={pagerSettings.previousPageText}
          pagerType={pagerType}
        />
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
      pagerItems.push(
        <PagerItem
          key={pageIndex}
          onPageClick={() => this.setCurrentPageClick(pageIndex)}
          pageNumber={pageIndex}
          pagerType={pagerType}
          isPageSelected={isPageSelected}
        />
      );
    }
    if (showNextButton && this.getNextPageButtonVisiblilty()) {
      pagerItems.push(
        <PagerItem
          key={totalPages + 1}
          onPageClick={this.setNextPageClick}
          pageNumber={pagerSettings.nextPageText}
          pagerType={pagerType}
        />
      );
      pagerItems.push(
        <PagerItem
          key={totalPages + 2}
          onPageClick={this.setLastPageClick}
          pageNumber={pagerSettings.lastPageText}
          pagerType={pagerType}
        />
      );
    }

    let tblClassName = pagerSettings.className;

    const hideOuterBorder =
      pagerSettings.outerBorder === false
        ? PAGINATION_BORDER_NOBORDER_CLASS
        : null;

    return (
      <React.Fragment>
        {totalPages > 0 && totalRows > 0 && (
          <GridRow className={tblClassName} style={pagerSettings.style}>
            <GridCell
              colSpan={numberOfColumns}
              className={hideOuterBorder}
              align={pagerSettings.align}
            >
              {pagerType === "list" ? (
                <ul className="wc-list-pagination">{pagerItems}</ul>
              ) : (
                <table cellSpacing="10" border="0" rules="none">
                  <tbody>
                    <GridRow>{pagerItems}</GridRow>
                  </tbody>
                </table>
              )}
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
  pagerSettings: pagerSetting,
};
Pagination.defaultProps = {
  totalRows: 0,
  pageSize: 0,
  numberOfColumns: 0,
  pageIndexChanging: null,
  pagerSettings: defaultPagerSetting,
};
Pagination.displayName = "Pagination";
