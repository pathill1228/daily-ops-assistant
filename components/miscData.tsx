"use client";
import { routeModule } from "next/dist/server/route-modules/pages/builtin/_error";
import DisplayEmployee from "./displayEmployee";
import GenerateVTO from "./generateVTO";
import EmployeeInput from "./employeeInput";


import { useEffect } from "react";

export default function MiscData({ setMisc, data, setData, employeesData, setEmployeesData, syncCXReplacements }) {

  useEffect(() => {
    setMisc(data.length);
    }, [data, setMisc]);

    useEffect(() => {
        syncMiscToExtras(data);
      }, [data]);

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

  function syncMiscToExtras(updatedMiscData) {
    const miscWithReplacement = updatedMiscData.filter(
      (employee) => employee.name && employee.replacement
    );
  
    setEmployeesData((prev) => {
      const newMiscExtras = miscWithReplacement.map((employee, index) => {
        const existingEmployee = prev.find(
          (prevEmployee) =>
            prevEmployee.route === "Misc" &&
            prevEmployee.name === employee.name
        );
  
        return {
          id: existingEmployee?.id ?? `misc-${index}`,
          name: employee.name,
          status: existingEmployee?.status ?? null,
          replacement: employee.replacement,
          callOutReason: employee.callOutReason ?? "",
          route: "Misc",
        };
      });
  
      const withoutOldMisc = prev.filter((employee) => employee.route !== "Misc");
  
      return [...withoutOldMisc, ...newMiscExtras];
    });
  }

  
  
  return (
    <div>
      {/*<input className="border p-1 mb-2" placeholder="Employee Name" onKeyDown={handleKeyDown}></input>*/}
      <EmployeeInput handleKeyDown={handleKeyDown} data={data} setData={setData}/>
      <DisplayEmployee
        data={data}
        setData={setData}
        syncCXReplacements={syncCXReplacements}
/>    </div>
  );
} 