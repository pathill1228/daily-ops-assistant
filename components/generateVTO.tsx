"use client";

import { useEffect } from "react";
import DisplayEmployee from "./displayEmployee";

export default function GenerateVTO({
  tellToStayHome,
  sweeps,
  extras,
  setVTO,
  ADHOC,
  employees,
  callouts,
  employeesData,
  data,
  setData,
  syncCXReplacements,
}) {
  useEffect(() => {
    setVTO(data.length);
  }, [data, setVTO]);

  useEffect(() => {
    const employeesLeft = employees - callouts - sweeps - ADHOC;

    const neededVTO =
      employeesLeft > 5 ? employeesLeft - extras - tellToStayHome : 0;

    setData((prev) => {
      const currentVTO = prev.length;

      if (neededVTO > currentVTO) {
        const rowsToAdd = neededVTO - currentVTO;

        const newRows = Array.from({ length: rowsToAdd }, (_, i) => ({
          id: `vto-${Date.now()}-${i}`,
          name: null,
          status: null,
          replacement: null,
          callOutReason: "",
          route: "VTO",
        }));

        return [...prev, ...newRows];
      }

      if (neededVTO < currentVTO) {
        let rowsToRemove = currentVTO - neededVTO;
        const updated = [...prev];

        for (let i = updated.length - 1; i >= 0 && rowsToRemove > 0; i--) {
          if (!updated[i].name) {
            updated.splice(i, 1);
            rowsToRemove--;
          }
        }

        if (rowsToRemove > 0) {
          const removableExtra = employeesData?.some(
            (employee) =>
              employee.status === null ||
              employee.status === "SH" ||
              employee.status === "Extra"
          );

          if (!removableExtra) {
            alert(
              "No empty VTO spots or removable Extras left. You will have to remove a sweeper."
            );
          }
        }

        return updated;
      }

      return prev;
    });
  }, [employees, callouts, sweeps, extras, tellToStayHome, employeesData, setData]);

  return (
    <div className="w-50">
      <DisplayEmployee
        data={data}
        setData={setData}
        syncCXReplacements={syncCXReplacements}
      />
    </div>
  );
}