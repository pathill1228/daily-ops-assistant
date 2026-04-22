"use client";

import { useState } from "react";

export default function DailyData() {

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      console.log('Input Value: ', e.target.value);
    }
  }
  

  return (
    <div>
      <input className="border p-1 mb-2" placeholder="Employee Name" onKeyDown={handleKeyDown}></input>
    </div>
  );
} 