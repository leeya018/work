import { addAllApi } from "@/firestore/vegs/addAllApi";
import useFetchVegs from "@/hooks/useFetchVegs";
import GreenCheckMark from "@/ui/GreenCheckMark";
import RedXMark from "@/ui/RedXMark";
import { vegCodes } from "@/util";
import React, { useEffect, useState } from "react";

export default function Codes() {
  const { codes, isLoading, setCodes } = useFetchVegs();

  const handleInputChange = (index: number, value: string) => {
    const newCodes = [...codes];

    // Check if the input matches the code
    if (value === newCodes[index].code) {
      // Increment correctNum if the code matches
      newCodes[index] = {
        ...newCodes[index],
        correctNum: newCodes[index].correctNum + 1,
      };
    }

    // Update the input value
    newCodes[index].inputValue = value;

    setCodes(newCodes);
  };

  return (
    <div className="text-white mt-4">
      {/* <button
        onClick={() => {
          try {
            addAllApi(vegCodes);
          } catch (error) {
            console.log(error);
          }
        }}
        className="btn"
      >
        add
      </button> */}
      <ul className="flex flex-col gap-2">
        {codes.map((vegCode, index) => (
          <li key={index} className="">
            <div className="flex items-center gap-4">
              <div>{vegCode.title}</div>
              <input
                type="number"
                className="inp"
                value={vegCode.inputValue || ""}
                disabled={vegCode.inputValue === vegCode.code}
                placeholder="enter code"
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <div>
                {vegCode.inputValue === vegCode.code && <GreenCheckMark />}
              </div>
              <div>{vegCode.correctNum}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
