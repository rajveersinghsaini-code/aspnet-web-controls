import { React } from "react";
import classnames from "classnames";
const PagerItem = ({ ...props }) => {
  const {
    isPageSelected,
    pageNumber,
    onPageClick,
    pagerType,
    itemCssClass,
    linkCssClass,
    activeCssClass,
  } = props;
  const pagingContent = isPageSelected ? (
    <span className={`${linkCssClass}`}>{pageNumber}</span>
  ) : (
    <a onClick={onPageClick} className={linkCssClass}>
      {pageNumber}
    </a>
  );
  let liClassName = itemCssClass;
  if (isPageSelected) liClassName = classnames(liClassName, activeCssClass);
  return pagerType === "list" ? (
    <li className={liClassName}>{pagingContent}</li>
  ) : (
    <td className={liClassName}>{pagingContent}</td>
  );
};
export default PagerItem;
