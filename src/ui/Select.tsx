import React from "react";
type SelectProps = {
  options: any;
  onChange: any;
  name: string;
  id: string;
  value: any;
};
export default function Select({
  options,
  onChange,
  name,
  id,
  value,
}: SelectProps) {
  return (
    <div className="relative">
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="appearance-none w-full bg-gray-900 text-white p-3 rounded-md border-none shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        {options.map((op: any) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-white">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>
  );
}
