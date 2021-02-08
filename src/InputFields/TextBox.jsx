import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUniqueRandomNumber } from "../private/AppUtility";
const TextBox = (props) => {
  const {
    id,
    name,
    textMode,
    labelText,
    onChange,
    labelClassName,
    ...otherProps
  } = props;
  const getDefaultValue = (initalValue) => {
    if (initalValue === null || initalValue === undefined) {
      if (textMode === "color") {
        return "#000000";
      } else if (textMode === "range") {
        const minValue = props.min ? props.min : 0;
        const maxValue = props.max ? props.max : 100;
        return maxValue < minValue
          ? minValue
          : minValue + (maxValue - minValue) / 2;
      } else {
        return "";
      }
    } else {
      if (textMode === "range") {
        return parseInt(initalValue);
      }
    }
  };
  const [controlId, setControlId] = useState(() => {
    return id ? id : `TextBox_${getUniqueRandomNumber()}`;
  });
  const [ctrlValue, setCtrlValue] = useState(() => {
    const initialState = getDefaultValue(props.value);
    return initialState;
  });
  const handleChange = (event) => {
    const _value = event.target.value;
    setCtrlValue(_value);
    if (onChange) {
      onChange(_value);
    }
  };

  const textAreaCtrl = textMode === "multiline" && (
    <textarea
      id={controlId}
      name={name ? name : controlId}
      value={ctrlValue}
      onChange={handleChange}
      {...otherProps}
    ></textarea>
  );
  const rangeCtrl = textMode === "range" && (
    <input
      type="range"
      id={controlId}
      name={name ? name : controlId}
      min={props.min}
      max={props.max}
      value={parseInt(ctrlValue)}
      onChange={handleChange}
      {...otherProps}
    />
  );

  const textCtrl = textMode !== "multiline" && textMode !== "range" && (
    <input
      type={!textMode || textMode === "singleLine" ? "text" : textMode}
      id={controlId}
      name={name ? name : controlId}
      value={ctrlValue}
      onChange={handleChange}
      {...otherProps}
    />
  );

  return (
    <Fragment>
      {labelText && (
        <label htmlFor={controlId} className={labelClassName}>
          {labelText}
        </label>
      )}
      {textAreaCtrl}
      {textCtrl}
      {rangeCtrl}
    </Fragment>
  );
};
TextBox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  textMode: PropTypes.oneOf([
    null,
    "",
    "multiLine",
    "singleLine",
    "password",
    "color",
    "date",
    "dateTime",
    "dateTimeLocal",
    "email",
    "month",
    "number",
    "range",
    "search",
    "phone",
    "time",
    "url",
    "week",
  ]),
  labelText: PropTypes.string,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.number,
  max: PropTypes.number,
};
TextBox.displayName = "TextBox";

export default TextBox;
