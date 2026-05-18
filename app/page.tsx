"use client";

import Image from "next/image";
import UploadFile from "./uploadFile";
import DisplayFile from "./displayFile";
import FileManager from "./fileManager";
import ExtrasData from "./extrasData";
import CallOutsData from "./callOutsData";
import GenerateVTO from "./generateVTO";
import SweepsData from "./sweepsData";
import ADHOCData from "./adhocData";


import { useState, useEffect } from "react";


export default function Home() {

  const [employees, setEmployees] = useState(0);
  const [callouts, setCallouts] = useState(0);

  let tellToStayHome = 3;
  let sweeps = 2;
  let extras = 2;
  let VTO = 0;
  let ADHOC = 0;

  return (
    <div>
      <h1>Day of Ops Assitant</h1>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <h3>Extras</h3>
          <ExtrasData setEmployees={setEmployees} employees={employees}/>
        </div>
        <div className="flex flex-col">
          <h3>VTO</h3>
          <GenerateVTO tellToStayHome={tellToStayHome} sweeps={sweeps} extras={extras} VTO={VTO} ADHOC={ADHOC} employees={employees} callouts={callouts}/>
        </div>
        <div className="flex flex-col">
          <h3>Call Outs</h3>
          <CallOutsData setCallouts={setCallouts} callouts={callouts}/>
        </div>
      </div>
      <div className="flex flex-row justify-end gap-17">
        <div className="flex flex-col">
          <h3>Sweep</h3>
          <SweepsData sweeps={sweeps}/>
        </div>
        <div className="flex flex-col">
          <h3>ADHOC</h3>
          <ADHOCData ADHOC={ADHOC}/>
        </div>
      </div>
      {/*<FileManager/>*/}
    </div>
  );
}
