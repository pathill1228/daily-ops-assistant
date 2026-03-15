"use client";
import { parseJsonFile } from "next/dist/build/load-jsconfig";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function FileUpload() {

  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  async function parseFile(file){
    const buffer = await file.arrayBuffer();

    const workbook = XLSX.read(buffer, {type: "array"});

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const json = XLSX.utils.sheet_to_json(sheet);

    console.log(json);
  }

  function handleFileUpload(e){
    const selectedFile = e.target.files[0];
    if(!uploaded){
      if(selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || selectedFile.type === 'text/csv'){
        console.log('correct file type');
        setUploaded(true);
        setFile(selectedFile);
        parseFile(selectedFile);
      }
      else if(selectedFile.type === null){
        console.log('please upload a file');
      }
      else{
        console.log('Incorrect file type');
        selectedFile.pop;
      }
    }
    else{
      console.log('You have already uploaded a file!');
      selectedFile.pop;
    }
  }

  function removeFileUpload(){
    if(uploaded){
      setFile(null);
      setUploaded(false);
    }
    else{
      console.log('No files have been uploaded!');
    }
  }

  return (
    <div>
      <h1 className="">Day of Ops Assistant</h1>
      <label htmlFor="fileUpload" className="border p-1">Choose File</label>
      <input type="file" className="hidden" id="fileUpload" onChange={handleFileUpload}/>
      <button className="border ml-2 pl-1 pr-1" onClick={removeFileUpload}>X</button>
    </div>
  );
}