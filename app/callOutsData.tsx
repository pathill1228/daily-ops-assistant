"use client";
import { routeModule } from "next/dist/server/route-modules/pages/builtin/_error";
import DisplayEmployee from "./displayEmployee";
import GenerateVTO from "./generateVTO";


import { useEffect } from "react";

export default function CallOutsData({ setCallouts, data, setData }) {

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
          replacement: null,
          route: "Call Out"
        }]);

        e.target.value = "";
    }
  }
  
  return (
    <div>
      <input className="border p-1 mb-2" placeholder="Employee Name" onKeyDown={handleKeyDown}></input>
      <DisplayEmployee data={data} setData={setData}/>
    </div>
  );
} 