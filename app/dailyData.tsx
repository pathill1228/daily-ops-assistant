"use client";

import { useState } from "react";

export default function DailyData() {
  const [inputValue, setInputValue] = useState("");
  const [extras, setExtras] = useState<{ AssociateName?: string }>({});

  function addExtra() {
    setExtras({
      AssociateName: inputValue
    });
  }

  return (
    <div>
      <input
        type="text"
        className="border mt-2 mb-2"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button className="border ml-2 pl-1 pr-1" onClick={addExtra}>
        +
      </button>

      <pre>{JSON.stringify(extras, null, 2)}</pre>
    </div>
  );
}