"use client";
import DisplayEmployee from "./displayEmployee";
import { useEffect } from "react";

export default function ADHOCData({ ADHOC, data, setData }){

    useEffect(()=>{
        const newData = Array.from({ length: ADHOC }, (_, i) => ({
            id: i,
            name: null,
            status: null,
            replacement: null,
            route: "ADHOC"
          }));
          
          setData(newData);
    }, [ADHOC]);

    return(<div>
        <DisplayEmployee data={data} setData={setData}/>
    </div>)
}