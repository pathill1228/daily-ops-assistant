"use client";

import { useState } from "react";

export default function DailyData() {
  const [extrasNum, setExtrasNum] = useState(null);
  const numOfExtras = document.getElementById("numOfExtras");

  function createExtrasList(){
    console.log(numOfExtras);
  }

  return (
    <div>
      <h5>Number of Extras</h5>
      <input type="number" className="border pl-1 pr-1 w-8 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" id="numOfExtras"></input>
      <button onClick={createExtrasList} className="border mb-2 ml-2 pl-1 pr-1">Submit</button>
    </div>
  );
} 