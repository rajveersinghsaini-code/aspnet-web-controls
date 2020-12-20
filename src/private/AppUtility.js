export const __nonMSDOMBrowser =
  window.navigator.appName.toLowerCase().indexOf("explorer") === -1;

export function resultOf(propertyOrFunction, arg = {}, context = null) {
  return typeof propertyOrFunction !== "function"
    ? propertyOrFunction
    : propertyOrFunction.call(context, arg);
}
export function filterFocusableItems(el) {
  const DISABLED = "disabled";
  const HIDDEN = "hidden";
  const style = el.style;
  const tabindex = el.getAttribute("tabindex");
  const focusable = tabindex === null || tabindex !== "-1";
  if (
    !el.hasAttribute(DISABLED) &&
    !el.hasAttribute(HIDDEN) &&
    style.display !== "none" &&
    style.visivility !== HIDDEN &&
    style.opecity !== "0" &&
    focusable
  ) {
    return el;
  }
  return null;
}
