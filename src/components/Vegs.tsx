import { Veg } from "@/interfaces/Veg";
import GreenCheckMark from "@/ui/GreenCheckMark";
import RedXMark from "@/ui/RedXMark";
import { VEG_CODES } from "@/util";
import React, { useEffect, useRef, useState } from "react";

export default function Vegs() {
  const [vegCodes, setVegCodes] = useState(VEG_CODES);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const storageVegs = localStorage.getItem("vegCodes");
    if (storageVegs) {
      const storageVegsIn = JSON.parse(storageVegs).map((veg: Veg) => ({
        ...veg,
        inputValue: "",
      }));
      if (!storageVegs) return;
      const sortedVegs = storageVegsIn.sort(
        (v1: Veg, v2: Veg) => v1.correctNum - v2.correctNum
      );
      setVegCodes(sortedVegs);
    }
    // Focus on the first input after loading
    inputRefs.current[0]?.focus();
  }, []);

  const reload = () => {
    const vegCodesNoInp = vegCodes.map((veg: Veg) => ({
      ...veg,
      inputValue: "",
    }));
    const sortedVegs = vegCodesNoInp.sort(
      (v1: Veg, v2: Veg) => v1.correctNum - v2.correctNum
    );
    setVegCodes(sortedVegs);
    inputRefs.current[0]?.focus(); // Focus on the first input after reload
  };

  const handleInputChange = (index: number, value: string) => {
    const newVegCodes = [...vegCodes];

    let newCorrectNum = newVegCodes[index].correctNum;
    // Check if the input matches the code
    if (value === newVegCodes[index].code) {
      // Increment correctNum if the code matches
      newCorrectNum += 1;
      // Move focus to the next input
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    } else if (
      newVegCodes[index].inputValue.length === 2 &&
      newVegCodes[index].inputValue !== newVegCodes[index].code
    ) {
      newCorrectNum -= 1;
    }

    newVegCodes[index] = {
      ...newVegCodes[index],
      correctNum: newCorrectNum,
      inputValue: (newVegCodes[index].inputValue = value),
    };
    localStorage.setItem("vegCodes", JSON.stringify(newVegCodes));

    // Update the input value
    newVegCodes[index].inputValue = value;

    setVegCodes(newVegCodes);
  };

  const isBtnActive =
    vegCodes.filter((veg) => veg.correctNum == 0).length === 0;

  return (
    <div className="text-white mt-4">
      <div className="flex justify-center items-center my-5 gap-2">
        <button className="btn" onClick={reload}>
          reload
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {vegCodes.map((vegCode, index) => (
          <li key={index} className="">
            <div className="flex items-center gap-4">
              <div>{vegCode.title}</div>
              <input
                type="number"
                max={2}
                ref={(el: HTMLInputElement | null) => {
                  inputRefs.current[index] = el;
                }} // Correctly typed ref callback without return value
                className="inp"
                value={vegCode.inputValue || ""}
                disabled={vegCode.inputValue === vegCode.code}
                placeholder="enter code"
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <div>
                {vegCode.inputValue === vegCode.code && <GreenCheckMark />}
                {vegCode.inputValue.length === 2 &&
                  vegCode.inputValue !== vegCode.code && <RedXMark />}
              </div>
              <div>{vegCode.correctNum}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
