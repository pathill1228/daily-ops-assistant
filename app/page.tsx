"use client";

import FileManager from "./fileManager";
import ExtrasData from "./extrasData";
import CallOutsData from "./callOutsData";
import GenerateVTO from "./generateVTO";
import SweepsData from "./sweepsData";
import ADHOCData from "./adhocData";
import MiscData from "./miscData";


import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";

export default function Home() {

  const [employees, setEmployees] = useState(0);
  const [callouts, setCallouts] = useState(0);
  const [VTO, setVTO] = useState(0);

  const [editingCell, setEditingCell] = useState(null);

  const [employeesData, setEmployeesData] = useState([]);
  const [calloutsData, setCalloutsData] = useState([]);
  const [VTOData, setVTOData] = useState([]);
  const [sweepsData, setSweepsData] = useState([]);
  const [adhocData, setAdhocData] = useState([]);
  const [miscData, setMiscData] = useState([]);


  const [copied, setCopied] = useState(false);


  let tellToStayHome = 3;
  let extras = 2;
  const [adhoc, setAdhoc] = useState(0);
  const [sweeps, setSweeps] = useState(2);
  const [misc, setMisc] = useState(0);

  const [togglePage, setTogglePage] = useState(false);

  useEffect(() => {
    setEmployeesData((prev) => {
      const withoutOldAdhocSlots = prev.filter(
        (employee) => employee.route !== "ADHOC Extra Slot"
      );
  
      const adhocSlots = Array.from({ length: Number(adhoc) || 0 }, (_, i) => ({
        id: `adhoc-extra-${i}`,
        name: null,
        status: null,
        replacement: null,
        callOutReason: "",
        route: "ADHOC Extra Slot",
      }));
  
      return [...withoutOldAdhocSlots, ...adhocSlots];
    });
  }, [adhoc]);

  async function getHeraNotes(){

    const html = `
    <b><u>Call Outs</u></b><br>
    ${calloutsData.length === 0
      ? "NONE"
      : calloutsData
          .map(employee =>
            employee.callOutReason
              ? `${employee.name} - ${employee.callOutReason}`
              : employee.name
          )
          .join("<br>")}
    <br></br>

    <b>VTO</b><br>
    ${VTOData.length === 0
      ? "NONE"
      : VTOData.map(employee => employee.name).join("<br>")}
    <br></br>

    <b>Told to stay home</b><br>
    ${employeesData.length === 0
      ? "NONE"
      : employeesData.filter(employee => employee.status === "SH")
      .map(employee => employee.name)
      .join("<br>")}
    <br></br>

    <b>ADHOC</b><br>
    ${adhocData.length === 0
      ? "NONE"
      : adhocData.map(employee => employee.name).join("<br>")}
    <br></br>

    <b>Nursery</b>
    <br></br>

    <b>Late</b>
    <br></br>

    <b>Sweeps</b><br> 
    ${sweepsData.every(employee => employee.name === null) || sweepsData.length === 0
      ? "NONE"
      : sweepsData.map(employee => employee.name).join("<br>")}
    <br></br>

    <b>Extras</b><br>
    ${employeesData.every(employee => employee.status !== "Extra") || employeesData.length === 0
      ? "NONE"
      : employeesData.filter(employee => employee.status === "Extra")
      .map(employee => employee.name)
      .join("<br>")}
      <br></br>
  `;

  await navigator.clipboard.write([
    new ClipboardItem({
      "text/html": new Blob([html], { type: "text/html" }),
      "text/plain": new Blob([html.replace(/<br><\/br>|<br>/g, "\n").replace(/<[^>]*>/g, "")], {
        type: "text/plain",
      }),
    }),
  ]);

  setCopied(true);
  setTimeout(() => {
    setCopied(false);
  }, 2000);
  }

  function getInitials(name) {
    if (!name) return "";
  
    return name
      .trim()
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }
  
  function syncCXReplacements(changedData, changedSetData) {
    const allRows = [
      ...employeesData.map((row, index) => ({
        ...row,
        source: "employees",
        index,
      })),
      ...calloutsData.map((row, index) => ({
        ...row,
        source: "callouts",
        index,
      })),
      ...VTOData.map((row, index) => ({
        ...row,
        source: "vto",
        index,
      })),
      ...sweepsData.map((row, index) => ({
        ...row,
        source: "sweeps",
        index,
      })),
      ...adhocData.map((row, index) => ({
        ...row,
        source: "adhoc",
        index,
      })),
      ...miscData.map((row, index) => ({
        ...row,
        source: "misc",
        index,
      })),
    ];
  
    const changedRows = changedData.map((row, index) => ({
      ...row,
      source: "changed",
      index,
    }));
  
    const combinedRows = [...allRows, ...changedRows];
  
    const cxRows = combinedRows.filter((row) =>
      row.status?.toString().trim().toLowerCase().startsWith("cx")
    );
  
    function updateData(prev, source) {
      return prev.map((row, index) => {
        const status = row.status?.toString().trim().toLowerCase();
  
        if (!status?.startsWith("cx")) return row;
  
        const matchingRows = cxRows.filter((otherRow) => {
          const otherStatus = otherRow.status
            ?.toString()
            .trim()
            .toLowerCase();
  
          return otherStatus === status;
        });
  
        const otherPerson = matchingRows.find(
          (otherRow) =>
            !(otherRow.source === source && otherRow.index === index) &&
            otherRow.name !== row.name
        );
  
        return {
          ...row,
          replacement: otherPerson ? getInitials(otherPerson.name) : "",
        };
      });
    }
  
    changedSetData((prev) => updateData(prev, "changed"));
  
    setEmployeesData((prev) => updateData(prev, "employees"));
    setCalloutsData((prev) => updateData(prev, "callouts"));
    setVTOData((prev) => updateData(prev, "vto"));
    setSweepsData((prev) => updateData(prev, "sweeps"));
    setAdhocData((prev) => updateData(prev, "adhoc"));
    setMiscData((prev) => updateData(prev, "misc"));
  }

  function syncExtraToRoute(employee, newStatus) {
    const normalizedStatus = newStatus?.trim().toLowerCase();
  
    const newEmployee = {
      id: Date.now(),
      name: employee.name,
      status: "Extra",
      replacement: employee.replacement ?? null,
      route: newStatus,
      callOutReason: employee.callOutReason ?? "",
    };
  
    const updateFirstBlankRow = (prev) => {
      let hasUpdated = false;
  
      return prev.map((row) => {
        const rowRoute = row.route?.trim().toLowerCase();
  
        if (!hasUpdated && !row.name && rowRoute === normalizedStatus) {
          hasUpdated = true;
  
          return {
            ...row,
            name: employee.name,
            status: "Extra",
            callOutReason: employee.callOutReason ?? "",
          };
        }
  
        return row;
      });
    };
  
    if (normalizedStatus === "adhoc") {
      setAdhocData(updateFirstBlankRow);
    }
  
    if (normalizedStatus === "sweep") {
      setSweepsData(updateFirstBlankRow);
    }
  
    if (normalizedStatus === "vto") {
      setVTOData((prev) => {
        if (prev.length === 0) return prev;
  
        let hasUpdated = false;
  
        return prev.map((row) => {
          if (!hasUpdated && !row.name) {
            hasUpdated = true;
  
            return {
              ...row,
              name: employee.name,
              status: "Extra",
              route: "VTO",
              callOutReason: employee.callOutReason ?? "",
            };
          }
  
          return row;
        });
      });
    }
  
    if (normalizedStatus === "call out") {
      setCalloutsData((prev) => [
        ...prev,
        {
          ...newEmployee,
          route: "Call Out",
        },
      ]);
    }
  } 


  return (
    <div className="flex flex-col justify-center items-center mt-30">
      <h1 className="mb-5">Day of Ops Assitant</h1>

        <Button className="rounded-none border pt-2 pb-2 pl-5 pr-5 mt-3 cursor-pointer hover:text-neutral-500" 
        onClick={() => {
          if(togglePage)
            setTogglePage(false);
          else setTogglePage(true);

          console.log(togglePage);
        }}>Employees / File</Button>

      <div className={`${togglePage ? "block" : "hidden"}`}>
        <FileManager/>
      </div>

      <div className={`${togglePage ? "hidden" : "block"}`}>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="flex flex-row w-72 justify-between">
              <h3>Extras</h3>
              <p>{employees}</p>
            </div>
            <ExtrasData setEmployees={setEmployees} 
            data={employeesData} 
            setData={setEmployeesData} 
            misc={misc}
            syncExtraToRoute={syncExtraToRoute}
            syncCXReplacements={syncCXReplacements}
            />
          </div>
          <div className="flex flex-col">
          <div className="flex flex-row w-72 justify-between ml-5 mr-5">
              <h3>VTO</h3>
              <p>{VTO}</p>
            </div>
            <GenerateVTO employeesData={employeesData}
            tellToStayHome={tellToStayHome} 
            sweeps={sweeps} 
            extras={extras} 
            VTO={VTO} 
            setVTO={setVTO} 
            ADHOC={adhoc} 
            employees={employees} 
            callouts={callouts} 
            data={VTOData} 
            setData={setVTOData}
            syncCXReplacements={syncCXReplacements}
            />
          </div>
          <div className="flex flex-col">
          <div className="flex flex-row w-72 justify-between">
              <h3>Call Outs</h3>
              <p>{callouts}</p>
            </div>
            <CallOutsData setCallouts={setCallouts} 
            data={calloutsData} 
            setData={setCalloutsData}
            syncCXReplacements={syncCXReplacements}
            />
          </div>
        </div>
        <div className="flex flex-row justify-end gap-5 pt-5">
        <div className="flex flex-col">
          <div className="flex flex-row w-72 justify-between">
              <h3>Misc</h3>
              <p onClick={() => setEditingCell(`misc`)}>
                {editingCell === `misc` ? (
                    <input
                      autoFocus
                      placeholder={misc}
                      onChange={(e) =>
                        setMisc(e.target.value)
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
                    misc
                  )}</p>
            </div>
            <MiscData misc={misc} 
            setMisc={setMisc}
            data={miscData} 
            setData={setMiscData}
            employeesData={employeesData} 
            setEmployeesData={setEmployeesData} 
            syncCXReplacements={syncCXReplacements}
            />
          </div>
          <div className="flex flex-col">
          <div className="flex flex-row w-72 justify-between">
              <h3>Sweeps</h3>
              <p onClick={() => setEditingCell(`sweeps`)}>
                {editingCell === `sweeps` ? (
                    <input
                      autoFocus
                      placeholder={sweeps}
                      onChange={(e) =>
                        setSweeps(e.target.value)
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
                    sweeps
                  )}</p>
            </div>
            <SweepsData
              sweeps={sweeps}
              setSweeps={setSweeps}
              data={sweepsData}
              setData={setSweepsData}
              syncCXReplacements={syncCXReplacements}
            />
          </div>
            <div className="flex flex-col">
            <div className="flex flex-row w-72 justify-between">
                <h3>ADHOC</h3>
                <p onClick={() => setEditingCell(`adhoc`)}>
                  {editingCell === `adhoc` ? (
                      <input
                        autoFocus
                        placeholder={adhoc}
                        onChange={(e) =>
                          setAdhoc(e.target.value)
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
                      adhoc
                    )}</p>
              </div>
              <ADHOCData
                ADHOC={adhoc}
                setAdhoc={setAdhoc}
                data={adhocData}
                setData={setAdhocData}
                syncCXReplacements={syncCXReplacements}
              />
            </div>
          </div>
          <Button className="rounded-none border p-1 mt-5 mb-2 w-35 h-10 cursor-pointer hover:text-neutral-500" onClick={getHeraNotes}>Hera Notes</Button>

          {/*COPY FOR HERA NOTES*/}
          {copied && (
            <div
              className="
                fixed
                bottom-5
                left-1/2
                -translate-x-1/2
                bg-neutral-900
                text-white
                px-4
                py-2
                rounded-lg
                shadow-lg
                z-50
              "
            >
              Copied to clipboard
            </div>
          )}

      </div>

    </div>
  );
}
