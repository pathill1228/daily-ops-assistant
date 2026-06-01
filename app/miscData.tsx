"use client";
import DisplayEmployee from "./displayEmployee";
import { useEffect } from "react";

export default function miscData({ misc, data, setData }){

    useEffect(()=>{
        const newData = Array.from({ length: misc }, (_, i) => ({
            id: i,
            name: null,
            status: null,
            replacement: null,
            callOutReason: "",
            route: null
          }));
          
          setData(newData);
    }, [misc]);

    return(<div>
        <DisplayEmployee data={data} setData={setData}/>
    </div>)
}