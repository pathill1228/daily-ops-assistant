"use client";
import { parseJsonFile } from "next/dist/build/load-jsconfig";
import { useState } from "react";
import * as XLSX from "xlsx";


export default function DisplayFile({data}){

  if(!data) return <div></div>
  else return (
    <table>
    <thead>
      <tr>
        {Object.keys(data[0]).map((key) => (
          <th key={key}>{key}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {Object.values(row).map((value, j) => (
            <td key={j}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
    </table>
  );
}

