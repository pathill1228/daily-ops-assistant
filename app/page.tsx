"use client";

import FileManager from "./fileManager";
import ExtrasData from "./extrasData";
import CallOutsData from "./callOutsData";
import GenerateVTO from "./generateVTO";
import SweepsData from "./sweepsData";
import ADHOCData from "./adhocData";


import { useState, useEffect } from "react";
import { ButtonGroup, Button } from "@material-tailwind/react";

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

  const [copied, setCopied] = useState(false);


  let tellToStayHome = 3;
  let extras = 2;
  const [adhoc, setAdhoc] = useState(0);
  const [sweeps, setSweeps] = useState(2);

  const [togglePage, setTogglePage] = useState(false);

  async function getHeraNotes(){

    const html = `
    <b><u>Call Outs</u></b><br>
    ${calloutsData.length === 0
      ? "NONE"
      : calloutsData.map(employee => employee.name).join("<br>")}
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

  return (
    <div className="flex flex-col justify-center items-center mb-50">
      <h1 className="mb-5">Day of Ops Assitant</h1>

      <ButtonGroup className="mt-5 mb-2 w-57 justify-between">
        <Button className="rounded-none border pt-2 pb-2 pl-5 pr-5 cursor-pointer hover:text-neutral-500" 
        onClick={() => {
          if(togglePage)
            setTogglePage(false);
          else setTogglePage(true);

          console.log(togglePage);
        }}>Employees</Button>
        <Button className="rounded-none border pt-2 pb-2 pl-5 pr-5 cursor-pointer hover:text-neutral-500">Ops File</Button>
      </ButtonGroup>

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
            <ExtrasData setEmployees={setEmployees} data={employeesData} setData={setEmployeesData}/>
          </div>
          <div className="flex flex-col">
          <div className="flex flex-row w-72 justify-between ml-5 mr-5">
              <h3>VTO</h3>
              <p>{VTO}</p>
            </div>
            <GenerateVTO tellToStayHome={tellToStayHome} sweeps={sweeps} extras={extras} VTO={VTO} setVTO={setVTO} ADHOC={adhoc} employees={employees} callouts={callouts} data={VTOData} setData={setVTOData}/>
          </div>
          <div className="flex flex-col">
          <div className="flex flex-row w-72 justify-between">
              <h3>Call Outs</h3>
              <p>{callouts}</p>
            </div>
            <CallOutsData setCallouts={setCallouts} data={calloutsData} setData={setCalloutsData}/>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-5 pt-5">
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
            <SweepsData sweeps={sweeps} data={sweepsData} setData={setSweepsData}/>
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
              <ADHOCData ADHOC={adhoc} data={adhocData} setData={setAdhocData}/>
            </div>
          </div>
          <Button className="rounded-none border p-1 mt-5 mb-2 w-35 h-10 cursor-pointer hover:text-neutral-500" onClick={getHeraNotes}>Hera Notes</Button>

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
