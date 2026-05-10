"use client";

import { useState, useEffect } from "react";

function getStatusColor(status, display){

  if(display === "statusDesc"){
    if (status === null){
      return "text-neutral-300";
    }
    else if (status === "VTO" || status === "Call Out"){
      return "text-blue-500";
    }
    else if (status === "Sweep" || status === "ADHOC" || status.startsWith("CX") || status.startsWith("AV") || status.startsWith("AX")){
      return "text-green-400";
    }
    else if (status === "Extra"){
      return "text-fuchsia-400";
    }
    else return "text-red-400";
  }
  else if(display === "statusDot"){
    if (status === null){
      return "bg-neutral-300";
    }
    else if (status === "VTO" || status === "Call Out"){
      return "bg-blue-500";
    }
    else if (status === "Sweep" || status === "ADHOC" || status.startsWith("CX") || status.startsWith("AV") || status.startsWith("AX")){
      return "bg-green-400";
    }
    else if (status === "Extra"){
      return "bg-fuchsia-400";
    }
    else return "bg-red-400";
  }
}

function DisplayExtras({data}){
  
  if(!data || data.length === 0) return <div></div>
  else return(
    <div>    
      <table>
      <thead>

      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}> 
            <td className={`w-6 h-6 rounded-full ${getStatusColor(row.status, "statusDot")}`}></td>
            <td>{row.name}</td>
            <td className={getStatusColor(row.status, "statusDesc")}>{row.status === null ? "N/A" : row.status}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  )
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
          status: "Extra",
          route: null
        }]);
    }
  }
  

  return (
    <div>
      <input className="border p-1 mb-2" placeholder="Employee Name" onKeyDown={handleKeyDown}></input>
      <DisplayExtras data={data}/>
    </div>
  );
} 