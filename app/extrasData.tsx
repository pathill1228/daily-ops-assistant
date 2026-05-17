"use client";
import DisplayEmployee from "./displayEmployee";
import { useState, useEffect } from "react";

export default function ExtrasData({ setEmployees, employees }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    setEmployees(data.length);
    }, [data, setEmployees]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      setData([...data, 
        {
          id: data.length, 
          name: e.target.value, 
          status: "Extra",
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