"use client";
import DisplayEmployee from "./displayEmployee";
import { useEffect } from "react";

export default function SweepsData({sweeps, data, setData, syncCXReplacements }){

    useEffect(()=>{
        const newData = Array.from({ length: sweeps }, (_, i) => ({
            id: i,
            name: null,
            status: null,
            replacement: null,
            callOutReason: "",
            route: "sweep",
          }));

          setData(newData);
    }, [sweeps]);

    return<div>
        <DisplayEmployee data={data} setData={setData} syncCXReplacements={syncCXReplacements}/>
    </div>
}