"use client";
import DisplayEmployee from "./displayEmployee";
import GenerateVTO from "./generateVTO";


import { useState, useEffect } from "react";

export default function CallOutsData({ setCallouts, callouts }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    setCallouts(data.length);
    }, [data, setCallouts]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
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