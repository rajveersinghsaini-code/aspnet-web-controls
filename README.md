# aspnet-web-controls

A simple JavaScript package for creating web controls similar to asp.net syntax with react format.

## Installation

Install with [npm](https://www.npmjs.com/):

npm:

```shell
npm install aspnet-web-controls --save
```

## Importing

```js
import asp from "aspnet-web-controls";
```

Then...

## Usage

GridView example:

```js
iimport asp from "aspnet-web-controls";

function App() {
  let _totalSalary = 0;
  const sampleDataSource = [
    { Name: "Rajveer", Id: 104, Salary: 10000, Currency: "GBP" },
    { Name: "David", Id: 105, Salary: 15000, Currency: "GBP" },
    { Name: "Mohan", Id: 106, Salary: 12000, Currency: "GBP" },
    { Name: "Rajiv", Id: 107, Salary: 20000, Currency: "GBP" },
    { Name: "Shubham", Id: 108, Salary: 10000, Currency: "GBP" },
  ];
  const dropdownDataSource = [
    { Name: "Rajveer", Id: 104 },
    { Name: "David", Id: 105 },
    { Name: "Mohan", Id: 106 },
    { Name: "abc", Id: true },
    { Name: "abc", Id: "hello" },
  ];

  const onButtonClick = (name, salary) => {
    alert(`${name} has ${salary}`);
  };
  const onRowDataBound = (gridRow) => {
    _totalSalary = _totalSalary + gridRow.Data.Salary * 73.5;
  };

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
```

## Options

aspnet-gridview support paging and sorting

pagerSettings component props

```js
import { PagerSettings } from "aspnet-web-controls";

<asp.PagerSettings pageButtonCount={5} className="pagination" outerBorder={false} align="center" firstPageText="First" lastPageText="Last" nextPageText=">" previousPageText="<"  style={{backgroundColor:"red"}} pagerType="list"/>

{
  className: string,
  outerBorder: bool,
  align: oneOf(["left", "center", "right"]),
  pageButtonCount: number,
  firstPageText: string,
  lastPageText: string,
  nextPageText: string,
  previousPageText: string,
  style: object,
  pagerType: oneOf(["list", "table"]),
}
```

For libraries, we _also_ recommend leaving it in `dependencies`:

```js
  "dependencies": {
    "classnames": "^2.2.6",
    "prop-types": "^15.7.2",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-scripts": "4.0.1"
  }
```

## License

[MIT](LICENSE). Copyright (c) 2020 Rajveer Singh.
