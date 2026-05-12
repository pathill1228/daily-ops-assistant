"use client";
import DisplayEmployee from "./displayEmployee";
import { useState, useEffect } from "react";

export default function ExtrasData() {

  const [data, setData] = useState([]);
  let extras = 2;
  let tellToStayHome = 3;

//send this data as extraData and callOutData to a file called calculateVTO or generate VTO

  useEffect(() => {
    //console.log("Updated data:", data);
    //console.log(`data length: ${data.length}`);
    if(data.length > 0 && data.length < 3){
      console.log(`Extras: ${data.length}`);
    }
    else if(data.length >= 3 && data.length <= 5){
      console.log(`Extras: ${extras}, tell to stay home: ${data.length - extras}`);
    }
    else if(data.length > 5){
      let VTO = data.length - extras - tellToStayHome;
      console.log(`Extras: ${extras}, tell to stay home: ${tellToStayHome}, VTO: ${VTO}`);
    }
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
      <DisplayEmployee data={data}/>
    </div>
  );
} 