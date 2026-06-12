"use client";

import { useState } from "react";
import UploadFile from "./uploadFile";
import DisplayFile from "./displayFile";
import VanInput from "./vanInput";
import * as XLSX from "xlsx";


export default function FileManager() {
  const [cleanedJson, setCleanedJson] = useState<any[]>([]);

  function downloadCSV() {
    console.log("cleanedJson:", cleanedJson);
  
    if (!cleanedJson || cleanedJson.length === 0) {
      console.log("No data to download");
      return;
    }
  
    const worksheet = XLSX.utils.json_to_sheet(cleanedJson);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
  
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });
  
    const url = window.URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "cleaned-file.csv");
  
    document.body.appendChild(link);
    link.click();
  
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  return (
    <div>
      <DisplayFile cleanedJson={cleanedJson} 
      setCleanedJson={setCleanedJson}
      />
      <UploadFile cleanedJson={cleanedJson} 
      setCleanedJson={setCleanedJson} 
      />
      <VanInput/>
      <button
        onClick={downloadCSV}
        disabled={cleanedJson.length === 0}
        className="rounded-none border pt-2 pb-2 pl-5 pr-5 mb-10 cursor-pointer hover:text-neutral-500 disabled:opacity-50"
      >
        Download CSV
      </button>
    </div>
  );
}