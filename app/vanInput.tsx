"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function VanInput({
  cleanedJson,
  setCleanedJson,
  adhoc,
  sweeps,
}) {
  const [vanInput, setVanInput] = useState("");

  async function inputVan() {
    const numbersToRemove = vanInput
      .split(/[\s,]+/)
      .map((num) => num.trim())
      .filter(Boolean);

    const { data: vans, error } = await supabase
      .from("vans")
      .select("van_name")
      .eq("status", "active")
      .eq("dot_required", false);

    if (error) {
      console.error(error);
      return;
    }

    const remainingVans = vans
    .filter((van) => {
      const vanNumber = van.van_name.match(/\d+$/)?.[0];
      return !numbersToRemove.includes(vanNumber ?? "");
    })
    .sort((a, b) => {
      const aNum = Number(a.van_name.match(/\d+$/)?.[0] ?? 0);
      const bNum = Number(b.van_name.match(/\d+$/)?.[0] ?? 0);
  
      return aNum - bNum;
    });
  
  const reservedSweepVans = ["3", "7"];
  
  const availableVans = remainingVans.filter((van) => {
    const vanNumber = van.van_name.match(/\d+$/)?.[0];
    return !reservedSweepVans.includes(vanNumber ?? "");
  });

    const sweepRows = Array.from({ length: Number(sweeps) || 0 }, (_, i) => ({
      "Associate Name": "",
      Van: i === 0 ? "3" : i === 1 ? "7" : "",
      "Route Code": "Sweep",
      "Service Type": "",
      "Wave": "",
      "Staging Location": "",
      "Num Packages": "",
    }));

    const adhocRows = Array.from({ length: Number(adhoc) || 0 }, () => ({
      "Associate Name": "",
      Van: "",
      "Route Code": "ADHOC",
      "Service Type": "",
      "Wave": "",
      "Staging Location": "",
      "Num Packages": "",
    }));

    const fileWithExtraRows = [...cleanedJson, ...sweepRows, ...adhocRows];

    const usedVans = new Set();

    const updatedJson = fileWithExtraRows.map((row) => {
      // Keep vans already assigned to sweep rows
      if (row["Route Code"] === "Sweep" && row.Van) {
        usedVans.add(row.Van);
        return row;
      }
    
      const nextVan = availableVans.find(
        (van) => !usedVans.has(van.van_name)
      );
    
      if (!nextVan) {
        return {
          ...row,
          Van: "",
        };
      }
    
      usedVans.add(nextVan.van_name);
    
      return {
        ...row,
        Van: nextVan.van_name,
      };
    });

    setCleanedJson(updatedJson);
    setVanInput("");
  }

  return (
    <div className="flex flex-col gap-1">
      <input
        value={vanInput}
        onChange={(e) => setVanInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            inputVan();
          }
        }}
        placeholder="Do not use"
        className="border p-1 mb-2"
      />

      {/*<input className="border p-1 mb-2" placeholder="Use" />*/}

      {/*<input className="border p-1 mb-2" placeholder="ADHOC" />*/}

      {/*<input className="border p-1 mb-2" placeholder="Sweep" />*/}

      {/*Stickers*/}

      <button
        onClick={inputVan}
        className="rounded-none border pt-2 pb-2 pl-5 pr-5 mb-10 cursor-pointer hover:text-neutral-500 disabled:opacity-50"
      >
        Submit
      </button>
    </div>
  );
}