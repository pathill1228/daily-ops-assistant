"use client";

import Image from "next/image";
import UploadFile from "./uploadFile";
import DisplayFile from "./displayFile";
import FileManager from "./fileManager";
import ExtrasData from "./extrasData";
import CallOutsData from "./callOutsData";
import GenerateVTO from "./generateVTO";

import { useState, useEffect } from "react";


export default function Home() {

  const [employees, setEmployees] = useState(0);
  const [callouts, setCallouts] = useState(0);

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
          <GenerateVTO employees={employees} callouts={callouts}/>
        </div>
        <div className="flex flex-col pl-2">
          <h3>Call Outs</h3>
          <CallOutsData setCallouts={setCallouts} callouts={callouts}/>
        </div>
      </div>
      <FileManager/>
    </div>
  );
}
