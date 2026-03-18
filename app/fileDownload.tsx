"use client";
import { parseJsonFile } from "next/dist/build/load-jsconfig";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function FileDownload() {

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "edited-file.xlsx");

    return (
    
    );
}



