import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUniqueRandomNumber } from "../private/AppUtility";
import { listItemProps, defaultListItem } from "../private/CustomPropTypes";

const DropDownList = (props) => {
  const {
    id,
    dataSource,
    dataTextField,
    dataValueField,
    onSelectedIndexChanged,
    labelText,
    selectedValue,
    defaultListItem,
    labelClassName,
    name,
    children,
    ...restProps
  } = props;
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(selectedValue);
  const [controlId, setControlId] = useState(null);
  useEffect(() => {
    let lstItems = [];
    let _selectedValue = selectedValue;
    if (defaultListItem) lstItems.push(defaultListItem);

    if (dataSource && dataSource.length > 0) {
      const dTextField = dataTextField ? dataTextField : dataValueField;
      const dValueField = dataValueField ? dataValueField : dataTextField;
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
            enabled: null,
          });
        }
      });
    } else {
      React.Children.forEach(children, (item) => {
        if (item.type.displayName === "ListItem") {
          const dValue =
            item.props.value === null || item.props.value === undefined
              ? item.props.text
              : item.props.value;
          if (item.props.selected && item.props.selected === true)
            _selectedValue = dValue;

          lstItems.push({
            text: item.props.text,
            value: dValue,
            enabled: item.props.enabled,
          });
        }
      });
    }
    setItems(lstItems);
    setControlId(id ? id : "ddl" + getUniqueRandomNumber().toString());
    setSelected(_selectedValue);
  }, []);

  const renderedOptions = items.map((opt, index) => {
    const enabled =
      opt.enabled !== null && opt.enabled !== undefined && opt.enabled === false
        ? "disabled"
        : null;
    return (
      <option key={index} value={opt.value} disabled={enabled}>
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
        <label htmlFor={controlId} className={labelClassName}>
          {labelText}
        </label>
      ) : null}
      <select
        id={controlId}
        onChange={handleChange}
        value={selected}
        name={name ? name : controlId}
        {...restProps}
      >
        {renderedOptions}
      </select>
    </React.Fragment>
  );
};

DropDownList.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.object),
  dataTextField: PropTypes.string,
  dataValueField: PropTypes.string,
  onSelectedIndexChanged: PropTypes.func,
  selectedValue: PropTypes.string,
  labelText: PropTypes.string,
  labelClassName: PropTypes.string,
  className: PropTypes.string,
  defaultListItem: listItemProps,
  children: PropTypes.oneOfType([
    listItemProps,
    PropTypes.arrayOf(listItemProps),
  ]),
};
DropDownList.defaultProps = {
  id: "",
  name: "",
  dataSource: [],
  dataTextField: null,
  dataValueField: null,
  onSelectedIndexChanged: null,
  labelText: "",
  className: null,
  selectedValue: "",
  defaultListItem: defaultListItem,
  labelClassName: null,
};

export default DropDownList;
