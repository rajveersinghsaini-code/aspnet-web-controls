//import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";
import {
  GridView,
  Columns,
  BoundField,
  PagerSettings,
  DropDownList,
} from "./main";
import { pagerSetting } from "./private/CustomPropTypes";

function App() {
  const [selected, setSelected] = useState("105");

  let sampleDataSource = [
    { Name: "Rajveer", Id: 104, Salary: 10000, Currency: "GBP" },
    { Name: "David", Id: 105, Salary: 12000, Currency: "GBP" },
    { Name: "Mohan", Id: 106, Salary: 10000, Currency: "GBP" },
    { Name: "Rajiv", Id: 107, Salary: 12000, Currency: "GBP" },
    { Name: "Rajveer", Id: 108, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 109, Salary: 50000, Currency: "GBP" },
    { Name: "Rajveer", Id: 110, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 111, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 112, Salary: 30000, Currency: "GBP" },
    { Name: "Rajveer", Id: 113, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 114, Salary: 60000, Currency: "GBP" },
    { Name: "Rajveer", Id: 115, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 104, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 105, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 106, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 107, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 108, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 109, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 110, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 111, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 112, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 113, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 114, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 115, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 104, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 105, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 106, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 107, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 108, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 109, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 110, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 111, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 112, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 113, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 114, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 115, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 104, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 105, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 106, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 107, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 108, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 109, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 110, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 111, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 112, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 113, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 114, Salary: 10000, Currency: "GBP" },
    { Name: "Rajveer", Id: 115, Salary: 10000, Currency: "GBP" },
  ];
  //dataSource = [];
  const onButtonClick = (name, salary) => {
    alert(`${name} has ${salary}`);
  };
  let _totalSalary = 0;
  const onRowDataBound = (gridRow) => {
    _totalSalary = _totalSalary + gridRow.Data.Salary * 73.5;
  };
  useEffect(() => {
    //console.log(selected);
  }, [selected]);

  let dropdownDataSource = [
    { Name: "Rajveer", Id: 104 },
    { Name: "David", Id: 105 },
    { Name: "Mohan", Id: 106 },
    { Name: "abc", Id: true },
    { Name: "abc", Id: "hello" },
  ];

  return (
    <div style={{ padding: "10px" }}>
      <GridView
        id="grdHelloWorld"
        dataSource={sampleDataSource}
        emptyDataText="no data"
        allowPaging={true}
        allowSorting={true}
        showFooter={true}
        onRowDataBound={onRowDataBound}
        initializeValuesOnEvents={() => {
          _totalSalary = 0;
        }}
      >
        <Columns>
          <BoundField
            headerText="Id"
            dataField="Id"
            sortExpression="Id"
            visible={false}
          />
          <BoundField
            headerText="Name"
            dataField="Name"
            sortExpression="Name"
            accessibleHeaderText="hello world"
          />
          <BoundField
            headerText="Salary (INR)"
            dataField="Salary"
            sortExpression="Salary"
            itemStyle={{ textAlign: "right" }}
            footerExpression={() => <b>Total :</b>}
            footerStyle={{ textAlign: "right" }}
          />
          <BoundField
            headerText="Calculated Field"
            dataExpression={({ Salary }) => `${(Salary * 73.5).toFixed(2)}`}
            itemStyle={{ textAlign: "right" }}
            footerExpression={() => `$${_totalSalary.toFixed(2)}`}
            footerStyle={{ textAlign: "right" }}
          />
          <BoundField
            headerText="Action"
            dataExpression={(objRow) => (
              <button
                className="btn btn-sm  btn-primary"
                onClick={() => onButtonClick(objRow.Name, objRow.Salary)}
              >
                Click me
              </button>
            )}
            footerExpression={() => (
              <button onClick={() => alert("Add new records")}>Add Item</button>
            )}
          />
        </Columns>
        <PagerSettings
          className="pagination"
          pagerType="list"
          outerBorder={false}
        />
      </GridView>
      <div>
        <DropDownList
          dataSource={dropdownDataSource}
          dataValueField="Id"
          dataTextField="Name"
          selectedValue={selected}
          onSelectedIndexChanged={setSelected}
          labelText="Employee Name : "
          defaultItem={{ text: "Please Select", value: "-1" }}
          className="form-control"
          labelCssClass="form-label"
        />
        <DropDownList
          dataSource={dropdownDataSource}
          dataValueField="Id"
          dataTextField="Name"
          selectedValue={selected}
          onSelectedIndexChanged={setSelected}
          labelText="Employee Name : "
          defaultItem={{ text: "Please Select", value: "-1" }}
          className="form-control"
          labelCssClass="form-label"
        />
      </div>
    </div>
  );
}

export default App;
