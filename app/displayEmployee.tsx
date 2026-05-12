"use client";
import { useState } from "react";

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
  
  export default function DisplayEmployee({data}){
    
    if(!data || data.length === 0) return <div></div>
    else return(
      <div>    
        <table>
        <thead>
  
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}> 
              <td>
                <div  className={`w-3 h-3 rounded-full ${getStatusColor(row.status, "statusDot")}`}></div>
              </td>
              <td>{row.name}</td>
              <td className={getStatusColor(row.status, "statusDesc")}>{row.status === null ? "N/A" : row.status}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    )
  }