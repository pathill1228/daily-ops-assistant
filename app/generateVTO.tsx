
"use client";
import DisplayEmployee from "./displayEmployee";
import { useState, useEffect } from "react";


  export default function GenerateVTO({ tellToStayHome, sweeps, extras, VTO, ADHOC, employees, callouts }){
      
  let employeesLeft = employees - callouts - sweeps - ADHOC;

  const [data, setData] = useState();

  useEffect(() => {
    if(VTO === 0){
      setData([]);
    }

    if(employeesLeft > 0 && employeesLeft < 3){
      console.log(`Extras: ${employeesLeft}`);
      //console.log(`employeesLeft: ${employeesLeft}, employees: ${employees}, callouts: ${callouts}, sweeps: ${sweeps}`);
    }
    else if(employeesLeft >= 3 && employeesLeft <= 5){
      console.log(`Extras: ${extras}, tell to stay home: ${employeesLeft - extras}`);
    }
    else if(employeesLeft > 5){
      VTO = employeesLeft - extras - tellToStayHome;
      console.log(`Extras: ${extras}, tell to stay home: ${tellToStayHome}, VTO: ${VTO}`);

      const newData = Array.from({ length: VTO }, (_, i) => ({
        id: i,
        name: null,
        status: null,
        route: null,
      }));

      setData(newData);
    } else {
    setData([]);
    }
  }, [employees, callouts]);


      return <div className="w-50">
          <DisplayEmployee data={data}/>
        </div>
  }