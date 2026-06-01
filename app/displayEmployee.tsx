"use client";
import { useState } from "react";

function getStatusColor(status, display){

  if(display === "statusDesc"){
    if (status === null){
      return "text-neutral-300";
    }
    else if (status.toLowerCase() === "vto" || status.toLowerCase() === "call out"){
      return "text-blue-500";
    }
    else if (
      status.toLowerCase() === "sweep" ||
      status.toLowerCase() === "adhoc" ||
      status.toLowerCase().startsWith("cx") ||
      status.toLowerCase().startsWith("av") ||
      status.toLowerCase().startsWith("ax")
    ){
      return "text-green-400";
    }
    else if (status.toLowerCase() === "extra" || status.toLowerCase() === "sh"){
      return "text-fuchsia-400";
    }
    else return "text-red-400";
  }

  else if(display === "statusDot"){
    if (status === null){
      return "bg-neutral-300";
    }
    else if (status.toLowerCase() === "vto" || status.toLowerCase() === "call out"){
      return "bg-blue-500";
    }
    else if (
      status.toLowerCase() === "sweep" ||
      status.toLowerCase() === "adhoc" ||
      status.toLowerCase().startsWith("cx") ||
      status.toLowerCase().startsWith("av") ||
      status.toLowerCase().startsWith("ax")
    ){
      return "bg-green-400";
    }
    else if (status.toLowerCase() === "extra" || status.toLowerCase() === "sh"){
      return "bg-fuchsia-400";
    }
    else return "bg-red-400";
  }
}

export default function DisplayEmployee({ data, setData, syncExtraToRoute }) {

  const [editingCell, setEditingCell] = useState(null);
  const [reasonPopup, setReasonPopup] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [reasonValue, setReasonValue] = useState("");

  if(!data || data.length === 0) return <div></div>

  function updateCell(rowIndex, key, value) {
    const currentEmployee = data[rowIndex];
  
    const updatedData = data.map((row, i) => {
      if (i === rowIndex) {
        return {
          ...row,
          [key]: value,
        };
      }
  
      return row;
    });
  
    setData(updatedData);
  
    if (
      key === "status" &&
      (value.toLowerCase() === "adhoc" || value.toLowerCase() === "sweep") &&
      syncExtraToRoute
    ) {
      syncExtraToRoute(currentEmployee, value);
    }
  }

  function deleteRow(rowIndex) {
    const updatedData = data.filter((row, i) => i !== rowIndex);
    setData(updatedData);
  }

  return(
    <div>
      <table>
        <tbody>

          {data.map((row, i) => (
            <tr
            key={i}
            onDoubleClick={() => {
              setSelectedRowIndex(i);
              setReasonValue(row.callOutReason || "");
              setReasonPopup(true);
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              deleteRow(i);
              /*const confirmed = confirm("Delete this row?");
          
              if (confirmed) {
                deleteRow(i);
              }*/
            }}
            >

              <td>
                <div
                  className={`w-3 h-3 rounded-full ${getStatusColor(row.status, "statusDot")}`}
                ></div>
              </td>

              {/*<EmployeeInputCell/>*/}

              <td
                onClick={() => setEditingCell(`${i}-name`)}
                className="cursor-pointer w-40"
              >
                {editingCell === `${i}-name` ? (
                  <input
                    autoFocus
                    placeholder={row.name || ""}
                    onChange={(e) =>
                      updateCell(i, "name", e.target.value)
                    }
                    onBlur={() => setEditingCell(null)}
                    className="
                    text-white
                    border-none
                    outline-none
                    focus:outline-none
                    bg-transparent
                    w-full
                    p-0
                    m-0"
                  />
                ) : (
                  row.name
                )}
                </td>

              {row.status?.startsWith("CX") && (
                              <td
                              onClick={() => setEditingCell(`${i}-replacement`)}
                              className="cursor-pointer w-10 text-neutral-400"
                            >
                              {editingCell === `${i}-replacement` ? (
                                <input
                                  autoFocus
                                  placeholder={row.replacement || ""}
                                  onChange={(e) =>
                                    updateCell(i, "replacement", e.target.value)
                                  }
                                  onBlur={() => setEditingCell(null)}
                                  className="
                                  text-white
                                  border-none
                                  outline-none
                                  focus:outline-none
                                  bg-transparent
                                  w-full
                                  p-0
                                  m-0"
                                />
                              ) : (
                                row.replacement
                              )}
                            </td>
              )}

              <td
                className={`${getStatusColor(row.status, "statusDesc")} cursor-pointer w-20`}
                onClick={() => setEditingCell(`${i}-status`)}
              >
                {editingCell === `${i}-status` || editingCell === `${i}-status-open` ? (
                  <div className="relative">
                  <input
                    autoFocus
                    value={row.status || ""}
                    onChange={(e) => {
                      let value = e.target.value.trim();
                
                      if (/^\d+$/.test(value)) {
                        value = `CX${value}`;
                      }
                
                      updateCell(i, "status", value);
                    }}
                    onFocus={() => setEditingCell(`${i}-status-open`)}
                    onBlur={() => {
                      setTimeout(() => setEditingCell(null), 150);
                    }}
                    className="
                      text-white
                      border-none
                      outline-none
                      bg-transparent
                      w-full
                      p-0
                      m-0
                    "
                  />
                
                  {editingCell === `${i}-status-open` && (
                    <div className="absolute top-full left-0 bg-neutral-900 border w-32 z-50">
                      {["call out", "vto", "sweep", "adhoc", "Extra", "SH", null].map((option) => (
                        <div
                          key={option}
                          className="px-2 py-1 cursor-pointer hover:bg-neutral-700"
                          onClick={() => {
                            updateCell(i, "status", option);
                            setEditingCell(null);
                          }}
                        >
                          {option === null ? "N/A" : option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                ) : (
                  row.status === null ? "N/A" : row.status
                )}
              </td>

            </tr>
          ))}

        </tbody>
      </table>

      {reasonPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-neutral-900 border p-5 w-80">
            <h3 className="mb-3">Notes</h3>

            <textarea
              autoFocus
              value={reasonValue}
              onChange={(e) => setReasonValue(e.target.value)}
              className="w-full h-28 text-white bg-transparent border p-2 outline-none"
              placeholder="Enter reason..."
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="border px-3 py-1"
                onClick={() => setReasonPopup(false)}
              >
                Cancel
              </button>

              <button
                className="border px-3 py-1"
                onClick={() => {
                  updateCell(selectedRowIndex, "callOutReason", reasonValue);
                  setReasonPopup(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}