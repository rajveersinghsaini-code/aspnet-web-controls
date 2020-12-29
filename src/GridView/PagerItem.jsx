import { React } from "react";
import classnames from "classnames";
const PagerItem = ({ ...props }) => {
  const { isPageSelected, pageNumber, onPageClick, pagerType } = props;
  const pagingContent = isPageSelected ? (
    <span className="wc-page-link disabled">{pageNumber}</span>
  ) : (
    <a onClick={onPageClick} className="wc-page-link">
      {pageNumber}
    </a>
  );
  let liClassName = "wc-page-item";
  if (isPageSelected) liClassName = classnames(liClassName, "active");

  return pagerType === "list" ? (
    <li className={liClassName}>{pagingContent}</li>
  ) : (
    <td className={liClassName}>{pagingContent}</td>
  );
};

export default PagerItem;
