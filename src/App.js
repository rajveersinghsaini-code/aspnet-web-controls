//import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";
import asp from "./main";

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
      <asp.GridView
        id="grdHelloWorld"
        dataSource={sampleDataSource}
        emptyDataText="no data"
        allowPaging={true}
        allowSorting={true}
        showFooter={true}
        pageSize={3}
        onRowDataBound={onRowDataBound}
        initializeValuesOnEvents={() => {
          _totalSalary = 0;
        }}
        className="table"
      >
        <asp.Columns>
          <asp.BoundField headerText="Id" dataField="Id" sortExpression="Id" />
          <asp.BoundField
            headerText="Name"
            dataField="Name"
            sortExpression="Name"
            accessibleHeaderText="hello world"
          />
          <asp.BoundField
            headerText="Salary (INR)"
            dataField="Salary"
            sortExpression="Salary"
            itemStyle={{ textAlign: "right" }}
            footerExpression={() => <b>Total :</b>}
            footerStyle={{ textAlign: "right" }}
          />
          <asp.BoundField
            headerText="Calculated Field"
            dataExpression={({ Salary }) => `${(Salary * 73.5).toFixed(2)}`}
            itemStyle={{ textAlign: "right" }}
            footerExpression={() => `$${_totalSalary.toFixed(2)}`}
            footerStyle={{ textAlign: "right" }}
          />
          <asp.BoundField
            headerText="Action"
            dataExpression={(objRow) => (
              <button
                className="btn btn-sm  btn-primary"
                onClick={() => onButtonClick(objRow.Name, objRow.Salary)}
              >
                Click me
              </button>
            )}
          />
        </asp.Columns>
      </asp.GridView>
      <div>
        <asp.DropDownList
          dataSource={dropdownDataSource}
          dataValueField="Id"
          dataTextField="Name"
          selectedValue={selected}
          onSelectedIndexChanged={setSelected}
          labelText="Employee Name : "
          defaultListItem={{ text: "Please Select", value: "-1" }}
          className="form-control"
          labelCssClass="form-label"
        />
        <asp.DropDownList
          defaultListItem={{
            text: "Please Select",
            value: "0",
          }}
          selectedValue=""
        >
          <asp.ListItem text="Rajveer"></asp.ListItem>
          <asp.ListItem text="Rohan" value="103" enabled={false}></asp.ListItem>
          <asp.ListItem text="Mohan" value="104"></asp.ListItem>
        </asp.DropDownList>
      </div>
    </div>
  );
}
export default App;
