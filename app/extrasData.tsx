"use client";

import { useState, useEffect } from "react";

function DisplayExtras({data}){
  
  if(!data || data.length === 0) return <div></div>
  else return(
    <div>    
      <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {Object.values(row).map((value, j) => (
              <td key={j}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}

export default function ExtrasData() {

  const [data, setData] = useState([]);


  useEffect(() => {
    console.log("Updated data:", data);
  }, [data]); // runs AFTER state updates

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      //console.log('Input Value: ', e.target.value);
      setData([...data, 
        {
          id: data.length, 
          name: e.target.value, 
          status: null,
          route: null
        }]);
    }4
  }
  

  return (
    <div>
      <input className="border p-1 mb-2" placeholder="Employee Name" onKeyDown={handleKeyDown}></input>
      <DisplayExtras data={data}/>
    </div>
  );
} 