"use client";
import DisplayEmployee from "./displayEmployee";
import { useEffect } from "react";
import EmployeeInput from "./employeeInput";

export default function ExtrasData({ setEmployees, data, setData, misc, syncExtraToRoute, syncCXReplacements }) {

  useEffect(() => {
    setEmployees(data.length);
    }, [data, setEmployees]);

    function handleKeyDown(e, data, setData) {
      if (e.key === 'Enter'){
        setData([...data, 
          {
            id: data.length, 
            name: e.target.value, 
            status: null,
            replacement: null,
            callOutReason: "",
            route: null
          }]);
  
          e.target.value = "";
      }
  }

  return (
    <div>
      {/*<input className="border p-1 mb-2" placeholder="Employee Name" onKeyDown={handleKeyDown}></input>*/}
      <EmployeeInput handleKeyDown={handleKeyDown} data={data} setData={setData}/>
      <DisplayEmployee data={data} 
      setData={setData} 
      syncExtraToRoute={syncExtraToRoute}
      syncCXReplacements={syncCXReplacements}
      />
    </div>
  );
} 