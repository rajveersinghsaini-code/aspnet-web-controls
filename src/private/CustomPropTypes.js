import PropTypes from "prop-types";
const { shape, number, string, oneOf, bool, object } = PropTypes;
//Pagination Settings
export const pagerSetting = shape({
  className: string,
  outerBorder: bool,
  align: oneOf(["left", "center", "right"]),
  pageButtonCount: number,
  firstPageText: string,
  lastPageText: string,
  nextPageText: string,
  previousPageText: string,
  style: object,
  pagerType: oneOf(["list", "table"]),
});
export const defaultPagerSetting = {
  className: null,
  outerBorder: true,
  align: "left",
  pageButtonCount: 7,
  firstPageText: "First",
  lastPageText: "Last",
  nextPageText: ">",
  previousPageText: "<",
  style: {},
  pagerType: "table",
};
