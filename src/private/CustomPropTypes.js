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
  itemCssClass: string,
  linkCssClass: string,
  activeCssClass: string,
});
export const defaultPagerSetting = {
  className: "wc-pagination",
  outerBorder: false,
  align: "left",
  pageButtonCount: 7,
  firstPageText: "First",
  lastPageText: "Last",
  nextPageText: ">",
  previousPageText: "<",
  style: null,
  pagerType: "table",
  itemCssClass: "wc-page-item",
  linkCssClass: "wc-page-link",
  activeCssClass: "active",
};

//ListItem
export const listItemProps = shape({
  text: string,
  value: string,
  selected: bool,
  enabled: bool,
});

//ListItem
export const defaultListItem = {
  text: "",
  value: null,
  selected: false,
  enabled: true,
};
