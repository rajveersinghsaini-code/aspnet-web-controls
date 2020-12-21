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
import { GridView, Columns, BoundField } from "aspnet-web-controls";
```

Then...

## Usage

GridView example:

```js
import { GridView, Columns, BoundField } from "aspnet-web-controls";

function App() {
  let sampleDataSource = [
    { Name: "Rajveer", Id: 104, Salary: 10000, Currency: "GBP" },
    { Name: "David", Id: 105, Salary: 15000, Currency: "GBP" },
    { Name: "Mohan", Id: 106, Salary: 12000, Currency: "GBP" },
    { Name: "Rajiv", Id: 107, Salary: 20000, Currency: "GBP" },
    { Name: "Shubham", Id: 108, Salary: 10000, Currency: "GBP" },
  ];
  const onButtonClick = (name, salary) => {
    alert(`${name} has ${salary}`);
  };
  return (
    <div style={{ padding: "10px" }}>
      <GridView
        id="grdHelloWorld"
        dataSource={sampleDataSource}
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
```

## Options

aspnet-gridview support paging and sorting

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
