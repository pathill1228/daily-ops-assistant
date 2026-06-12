"use client";
import { routeModule } from "next/dist/server/route-modules/pages/builtin/_error";
import DisplayEmployee from "./displayEmployee";
import GenerateVTO from "./generateVTO";
import EmployeeInput from "./employeeInput";


import { useEffect } from "react";

export default function CallOutsData({ setCallouts, data, setData, syncCXReplacements }) {

  useEffect(() => {
    setCallouts(data.length);
    }, [data, setCallouts]);

  function handleKeyDown(e, data, setData) {
    if (e.key === 'Enter'){
      setData([...data, 
        {
          id: data.length, 
          name: e.target.value, 
          status: null,
          replacement: null,
          callOutReason: "",
          route: "Call Out"
        }]);

        e.target.value = "";
    }
  }
  
  return (
    <div>
      {/*<input className="border p-1 mb-2" placeholder="Employee Name" onKeyDown={handleKeyDown}></input>*/}
      <EmployeeInput handleKeyDown={handleKeyDown} data={data} setData={setData}/>
      <DisplayEmployee data={data} setData={setData} syncCXReplacements={syncCXReplacements}/>
    </div>
  );
} 