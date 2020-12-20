//import logo from "./logo.svg";
import "./App.css";
import GridView from "./GridView/GridView";
import BoundField from "./GridView/BoundField";
import Columns from "./GridView/Columns";

function App() {
  let dataSource = [
    { Name: "Rajveer", Id: 100, Salary: 15000, Currency: "CAD" },
    { Name: "Akshay", Id: 101, Salary: 10000, Currency: "USD" },
    { Name: "Neetu", Id: 102, Salary: 10000, Currency: "GBP" },
    { Name: "Yashika", Id: 103, Salary: 10000, Currency: "GBP" },
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
  return (
    <div style={{ padding: "10px" }}>
      <GridView
        id="grdHelloWorld"
        dataSource={dataSource}
        pageSize={3}
        allowPaging={true}
        emptyDataText="no data"
        width={500}
        gridLines="Horizontal"
      >
        <Columns>
          <BoundField headerText="Address" dataField="Id" sortExpression="Id" />
          <BoundField headerText="Name" dataField="Name" />
          <BoundField headerText="Salary (INR)" dataField="Salary" />
          <BoundField
            headerText="Salary USD"
            dataExpression={({ Salary }) => `${(Salary * 73.5).toFixed(2)}`}
          />
        </Columns>
      </GridView>
    </div>
  );
}
export default App;
