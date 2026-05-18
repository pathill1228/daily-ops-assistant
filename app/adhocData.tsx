"use client";
import DisplayEmployee from "./displayEmployee";
import { useState, useEffect } from "react";

export default function ADHOCData({ADHOC}){

    const [data, setData] = useState();

    useEffect(()=>{
        const newData = Array.from({ length: ADHOC }, (_, i) => ({
            id: i,
            name: null,
            status: "ADHOC",
            route: null,
          }));
          
          setData(newData);
    }, [ADHOC]);

    return<div>
        <DisplayEmployee data={data}/>
    </div>
}