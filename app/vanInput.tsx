import { useState } from "react";


export default function VanInput() {

  function inputVan(){
    
  }

    return (
      <div className="flex flex-col gap-1">
        <input className="border p-1 mb-2" placeholder="Do Not Use"></input>
        <input className="border p-1 mb-2" placeholder="Use"></input>
        {/* 
          stickers input so you can just copy paste it in 
            - put cx values in
        */}
        <input className="border p-1 mb-2" placeholder="ADHOC"></input>
        <input className="border p-1 mb-2" placeholder="Sweep"></input>
        {/* 
          Toggle for beginging from first van vs last van
        */}
        <button
          onClick={inputVan}
          className="rounded-none border pt-2 pb-2 pl-5 pr-5 mb-10 cursor-pointer hover:text-neutral-500 disabled:opacity-50"
        >
        Submit
      </button>
      </div>
    );
  }