import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUniqueRandomNumber } from "../private/AppUtility";

const DropDownList = ({
  id,
  dataSource,
  dataTextField,
  dataValueField,
  onSelectedIndexChanged,
  labelText,
  selectedValue,
  defaultItem,
  labelCssClass,
  className,
  ...props
}) => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(selectedValue);
  const [controlId, setControlId] = useState(null);
  useEffect(() => {
    let lstItems = [];
    const dTextField = dataTextField ? dataTextField : dataValueField;
    const dValueField = dataValueField ? dataValueField : dataTextField;
    if (defaultItem) lstItems.push(defaultItem);
    if (dataSource && dataSource.length > 0) {
      dataSource.map((opt) => {
        const text =
          opt.hasOwnProperty(dTextField) && opt[dTextField]
            ? opt[dTextField]
            : "";
        const value =
          opt.hasOwnProperty(dValueField) && opt[dValueField]
            ? opt[dValueField]
            : "";
        if (
          typeof text !== "function" &&
          typeof text !== "symbol" &&
          typeof text !== "object" &&
          typeof value !== "function" &&
          typeof value !== "symbol" &&
          typeof value !== "object"
        ) {
          lstItems.push({
            text: text,
            value: value,
          });
        }
      });
    }
    setItems(lstItems);
    setControlId(id ? id : "ddl" + getUniqueRandomNumber().toString());
  }, []);

  const renderedOptions = items.map((opt, index) => {
    return (
      <option key={index} value={opt.value}>
        {opt.text}
      </option>
    );
  });
  const handleChange = (event) => {
    const _selectedValue = event.target.value;
    setSelected(_selectedValue);
    if (onSelectedIndexChanged) {
      onSelectedIndexChanged(_selectedValue);
    }
  };

  return (
    <React.Fragment>
      {labelText ? (
        <label htmlFor={controlId} className={labelCssClass}>
          {labelText}
        </label>
      ) : null}
      <select
        id={controlId}
        className={className}
        onChange={handleChange}
        value={selected}
        {...props}
      >
        {renderedOptions}
      </select>
    </React.Fragment>
  );
};

DropDownList.propTypes = {
  id: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataTextField: PropTypes.string.isRequired,
  dataValueField: PropTypes.string.isRequired,
  onSelectedIndexChanged: PropTypes.func,
  labelText: PropTypes.string,
  className: PropTypes.string,
  selectedValue: PropTypes.string,
  defaultItem: PropTypes.exact({
    text: PropTypes.string,
    value: PropTypes.string,
  }),
  labelCssClass: PropTypes.string,
};
DropDownList.defaultProps = {
  id: "",
  dataSource: [],
  dataTextField: null,
  dataValueField: null,
  onSelectedIndexChanged: null,
  labelText: "",
  className: null,
  selectedValue: null,
  defaultItem: null,
  labelCssClass: null,
};

export default DropDownList;
