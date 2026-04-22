"use client";

import { useState } from "react";

function DisplayEmployeeData({data}){
  
  if(!data) return <div></div>
  else return(
    //logic to display names after every entry
  );
}

export default function DailyData() {

  const [data, setData] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      //console.log('Input Value: ', e.target.value);
      setData(e.target.value);
    }
  }
  

  return (
    <div>
      <input className="border p-1 mb-2" placeholder="Employee Name" onKeyDown={handleKeyDown}></input>
      <DisplayEmployeeData data={data}/>
    </div>
  );
} 