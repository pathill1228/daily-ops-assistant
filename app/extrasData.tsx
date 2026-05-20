"use client";
import DisplayEmployee from "./displayEmployee";
import { useEffect } from "react";

export default function ExtrasData({ setEmployees, data, setData }) {

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
          replacement: null
        }]);
    }
  }

  return (
    <div>
      <input className="border p-1 mb-2" placeholder="Employee Name" onKeyDown={handleKeyDown}></input>
      <DisplayEmployee data={data} setData={setData}/>
    </div>
  );
} 