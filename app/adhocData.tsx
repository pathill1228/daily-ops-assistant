"use client";

import DisplayEmployee from "./displayEmployee";
import { useEffect } from "react";

export default function ADHOCData({
  ADHOC,
  setAdhoc,
  data,
  setData,
  syncCXReplacements,
}) {
  useEffect(() => {
    const targetAmount = Number(ADHOC) || 0;

    setData((prev) => {
      if (targetAmount > prev.length) {
        const rowsToAdd = targetAmount - prev.length;

        const newRows = Array.from({ length: rowsToAdd }, (_, i) => ({
          id: `adhoc-${Date.now()}-${i}`,
          name: null,
          status: null,
          replacement: null,
          callOutReason: "",
          route: "adhoc",
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
          alert("Remove an ADHOC person before lowering the ADHOC amount.");
        }

        return updated;
      }

      return prev;
    });
  }, [ADHOC, setData]);

  useEffect(() => {
    setAdhoc(data.length);
  }, [data, setAdhoc]);

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