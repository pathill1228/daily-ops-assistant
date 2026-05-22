"use client";
import { parseJsonFile } from "next/dist/build/load-jsconfig";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function DisplayFile({ cleanedJson, setCleanedJson }) {
  if (!cleanedJson || cleanedJson.length === 0) return null;

  function handleCellChange(rowIndex, key, value) {
    setCleanedJson((prevData) => {
      const updatedData = [...prevData];

      updatedData[rowIndex] = {
        ...updatedData[rowIndex],
        [key]: value,
      };

      return updatedData;
    });
  }

  return (
    <div className="mt-4">
      <table className="border-collapse border">
        <thead>
          <tr>
            {Object.keys(cleanedJson[0]).map((key) => (
              <th key={key}>
                {key}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {cleanedJson.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((key) => (
                <td key={key} className="border">
                  <input
                    className="p-1"
                    value={row[key] ?? ""}
                    onChange={(e) =>
                      handleCellChange(rowIndex, key, e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                  
                        const nextRow = rowIndex + 1;
                  
                        const nextInput = document.querySelector(
                          `input[data-row="${nextRow}"][data-col="${key}"]`
                        );
                  
                        if (nextInput) {
                          nextInput.focus();
                        }
                      }
                    }}
                    data-row={rowIndex}
                    data-col={key}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

