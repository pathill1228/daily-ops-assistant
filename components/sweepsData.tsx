"use client";

import DisplayEmployee from "./displayEmployee";
import { useEffect } from "react";

export default function SweepsData({
  sweeps,
  setSweeps,
  data,
  setData,
  syncCXReplacements,
}) {
  useEffect(() => {
    const targetAmount = Number(sweeps) || 0;

    setData((prev) => {
      if (targetAmount > prev.length) {
        const rowsToAdd = targetAmount - prev.length;

        const newRows = Array.from({ length: rowsToAdd }, (_, i) => ({
          id: `sweep-${Date.now()}-${i}`,
          name: null,
          status: null,
          replacement: null,
          callOutReason: "",
          route: "sweep",
        }));

        return [...prev, ...newRows];
      }

      if (targetAmount < prev.length) {
        let rowsToRemove = prev.length - targetAmount;
        const updated = [...prev];

        for (let i = updated.length - 1; i >= 0 && rowsToRemove > 0; i--) {
          if (!updated[i].name) {
            updated.splice(i, 1);
            rowsToRemove--;
          }
        }

        if (rowsToRemove > 0) {
          alert("Remove a sweeper before lowering the sweep amount.");
        }

        return updated;
      }

      return prev;
    });
  }, [sweeps, setData]);

  return (
    <div>
      <DisplayEmployee
        data={data}
        setData={setData}
        syncCXReplacements={syncCXReplacements}
        onDeleteRow={(updatedData) => setSweeps(updatedData.length)}
        />
    </div>
  );
}