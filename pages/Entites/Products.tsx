import { table } from "console";
import React, { useEffect, useState } from "react";

interface Idata {
  name: String;
  age: Number;
  active: Boolean;
}

interface sortFields<T> {
  field: keyof T;
  direction: "asc|desc";
}

interface ITableFilters<T> {
  field: keyof T;
  filter: String | Number | Boolean;
}
const stubdata = [
  { name: "Mike", age: 37, active: true },
  { name: "Jen", age: 35, active: true },
  { name: "Enxzo", age: 3, active: true },
  { name: "Layla", age: 6, active: true },
  { name: "Theo", age: 2, active: true },
];

export default function Products() {



  /*State Variable*/
  const [tableData, setTableData] = useState<Idata[]>();
  const [tableSort, setTableSort] = useState<sortFields<Idata>[]>();
  const [tableFilters, setTableFilters] = useState();

  /*Conditonal States*/

/*Page Load*/
useEffect(()=>{
setTableData(stubdata);
},[])


  /*Page Actions*/

  return (
    <div>
      <section>
        <h1>Product Master</h1>
      </section>

      <section>
        <p>form controls...</p>
      </section>

   
        
          {tableData && tableData.length > 0 ? (
            <table>
           {tableData.map((item,id) => (
           <tr key={id}><td>{`${item.age}`}</td></tr>
           ))}
            </table>
          ) : (
            <p>No Data</p>
          )}
       
    
    </div>
  );
}
