"use client";
import DisplayEmployee from "./displayEmployee";
import { useEffect } from "react";

export default function SweepsData({sweeps, data, setData}){

    useEffect(()=>{
        const newData = Array.from({ length: sweeps }, (_, i) => ({
            id: i,
            name: null,
            status: "Sweep",
            route: null,
          }));

          setData(newData);
    }, [sweeps]);

    return<div>
        <DisplayEmployee data={data} setData={setData}/>
    </div>
}