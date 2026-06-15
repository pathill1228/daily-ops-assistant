import { useState } from "react";
import { supabase } from "@/lib/supabase/client";


export default function VanInput({ cleanedJson, setCleanedJson }) {

  const [vanInput, setVanInput] = useState("");
  const [uploadedFile, setUploadedFile] = useState<{ van: string }[]>([]);

  function getVanNumber(vanName: string) {
    return Number(vanName.match(/\d+$/)?.[0] ?? 0);
  }

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
  
    const updatedJson = cleanedJson.map((row, index) => ({
      ...row,
      Van: remainingVans[index]?.van_name ?? "",
    }));
  
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
              removeVansAndAddRestToFile();
            }
          }}
          placeholder="Do not use"
          className="border p-1 mb-2"
        />
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