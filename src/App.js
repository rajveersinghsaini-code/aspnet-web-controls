//import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import { GridView, Columns, BoundField, PagerSettings } from "./main";

function App() {
  let dataSource = [
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
  return (
    <div style={{ padding: "10px" }}>
      <GridView
        id="grdHelloWorld"
        dataSource={dataSource}
        emptyDataText="no data"
        width={500}
        allowPaging={true}
        allowSorting={true}
        showFooter={true}
        caption="Employee Details"
        onRowDataBound={onRowDataBound}
        initialValuesOnEvents={() => {
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
              <button onClick={() => onButtonClick(objRow.Name, objRow.Salary)}>
                Click me
              </button>
            )}
            footerExpression={() => (
              <button onClick={() => alert("Add new records")}>Add Item</button>
            )}
          />
        </Columns>
        <PagerSettings pageButtonCount={2} outerBorder={false} />
      </GridView>
    </div>
  );
}

export default App;
