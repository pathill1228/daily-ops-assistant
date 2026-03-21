"use client";
import { parseJsonFile } from "next/dist/build/load-jsconfig";
import { useState } from "react";
import * as XLSX from "xlsx";
import { Z_NO_COMPRESSION } from "zlib";
import DisplayFile from "./displayFile";

export default function UploadFile() {

  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  //putting excel file into json object 
  async function parseFile(file){
    const buffer = await file.arrayBuffer();

    const workbook = XLSX.read(buffer, {type: "array"});
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    const cleanedJson = cleanFile(json);
      console.log(cleanedJson);

  }

  //cleaning data
  function cleanFile(json){

    for (let i = json.length - 1; i >= 0; i--) {
      if (json[i].DSP !== "GNCT") {
        json.splice(i, 1);
      }
    }

    const columnsToRemove = ["DSP","Route Duration","Num Zones","Num Commercial Pkgs"];
    json.forEach(row => {
      columnsToRemove.forEach(column => {
        delete row[column];
      });
    });

    return json;
  }


  //Ensuring that only the correct file is imported
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

  //Removing possibility for multiple imports at a time
  function removeFileUpload(){
    if(uploaded){
      setFile(null);
      setUploaded(false);
      console.log('File Removed!')
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
      {/*<DisplayFile data={} />*/}
    </div>
  );
}