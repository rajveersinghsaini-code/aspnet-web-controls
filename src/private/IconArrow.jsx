import React from "react";
import PropTypes from "prop-types";
const IconArrow = (props) => {
  const { arrowSize, arrowType, color, className, style } = props;
  let points = `${arrowSize * 2},${arrowSize} ${arrowSize},0 0,${arrowSize}`;
  if (arrowType === "down") {
    points = `${arrowSize * 2},0 0,0 ${arrowSize},${arrowSize}`;
  } else if (arrowType === "left") {
    points = `${arrowSize},${arrowSize * 2} ${arrowSize},0 0,${arrowSize}`;
  } else if (arrowType === "right") {
    points = `0,${arrowSize * 2} 0,0 ${arrowSize},${arrowSize}`;
  }
  let width = arrowSize;
  let height = arrowSize;
  if (arrowType === "up" || arrowType === "down") {
    width = arrowSize * 2;
  } else {
    height = arrowSize * 2;
  }
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <polygon x="0" y="0" points={points} fill={color} />
    </svg>
  );
};
IconArrow.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  arrowSize: PropTypes.number,
  color: PropTypes.string,
  arrowType: PropTypes.oneOf(["up", "down", "right", "left"]),
};
IconArrow.defaultProps = {
  style: null,
  className: null,
  arrowSize: 5,
  color: "currentColor",
  arrowType: "up",
};
IconArrow.displayName = "IconArrow";
export default IconArrow;
