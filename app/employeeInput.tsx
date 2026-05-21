"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Employee = {
  id: string;
  name: string;
  status: string;
};

export default function EmployeeInput({ handleKeyDown, data, setData }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    async function getEmployees() {
      const { data, error } = await supabase
        .from("employees")
        .select("*");
        /*.eq("status", "active")
        .order("name");*/

        console.log("Employees from Supabase:", data);
        console.log("Supabase error:", error);  

      if (error) {
        console.error(error);
        return;
      }

      setEmployees(data || []);
    }

    getEmployees();
  }, []);

  const suggestions = employees.filter((employee) =>
    employee.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  function formatName(name: string) {
    const splitName = name.trim().split(" ");
  
    if (splitName.length < 2) {
      return splitName[0];
    }
  
    return `${splitName[0]} ${splitName[1][0]}`;
  }

  return (
    <div className="relative w-72">
      <input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Employee Name"
        className="w-full rounded border px-3 py-2"
        onKeyDown={(e) => {
            handleKeyDown(e, data, setData);
          
            if (e.key === "Enter") {
                setInputValue("");
                setShowSuggestions(false);
            }
            if (e.key === "Tab" && suggestions.length > 0) {
                e.preventDefault();
            
                setInputValue(formatName(suggestions[0].name));
                setShowSuggestions(false);
            
                return;
              }
          }}
      />

      {showSuggestions && inputValue && (
        <div className="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded border bg-white shadow">
          {suggestions.length > 0 ? (
            suggestions.map((employee) => (
              <button
                key={employee.id}
                type="button"
                onClick={() => {
                  setInputValue(employee.name);
                  setShowSuggestions(false);
                }}
                className="block w-full px-3 py-2 text-left text-black hover:bg-gray-100"
              >
                {formatName(employee.name)}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">
              No employee found
            </div>
          )}
        </div>
      )}
    </div>
  );
}