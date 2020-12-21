//import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { GridView, Columns, BoundField } from "./main";

function App() {
  let dataSource = [
    { Name: "Rajveer", Id: 104, Salary: 10000, Currency: "GBP" },
    { Name: "David", Id: 105, Salary: 10000, Currency: "GBP" },
    { Name: "Mohan", Id: 106, Salary: 10000, Currency: "GBP" },
    { Name: "Rajiv", Id: 107, Salary: 10000, Currency: "GBP" },
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
  return (
    <div style={{ padding: "10px" }}>
      <GridView
        id="grdHelloWorld"
        dataSource={dataSource}
        emptyDataText="no data"
        width={500}
        allowPaging={true}
        allowSorting={true}
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
          />
          <BoundField
            headerText="Salary (INR)"
            dataField="Salary"
            sortExpression="Salary"
            itemStyle={{ textAlign: "right" }}
          />
          <BoundField
            headerText="Calculated Field"
            dataExpression={({ Salary }) => `${(Salary * 73.5).toFixed(2)}`}
            itemStyle={{ textAlign: "right" }}
          />
          <BoundField
            headerText="Action"
            dataExpression={(objRow) => (
              <button onClick={() => onButtonClick(objRow.Name, objRow.Salary)}>
                Click me
              </button>
            )}
          />
        </Columns>
      </GridView>
    </div>
  );
}

export default App;
