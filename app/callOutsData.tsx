"use client";
import DisplayEmployee from "./displayEmployee";

import { useState, useEffect } from "react";

export default function CallOutsData() {

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
    }
  }
  

  return (
    <div>
      <input className="border p-1 mb-2" placeholder="Employee Name" onKeyDown={handleKeyDown}></input>
      <DisplayEmployee data={data}/>
    </div>
  );
} 