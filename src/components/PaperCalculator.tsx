import React, { useRef, useState } from "react";

const PaperCalculator: React.FC = () => {
  const [sumList, setSumList] = useState<number[]>([]);
  const [newSum, setNewSum] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (newSum === 0) return;
    setSumList((prev) => [...prev, newSum]);
    setNewSum(0);
    inputRef.current?.focus();
  };

  const getTotal = () => {
    return sumList.reduce((acc, item) => acc + item, 0);
  };

  const reverseList = () => {
    return [...sumList].reverse();
  };
  return (
    <div className="container mx-auto p-4 text-white">
      <h1>paper calculator</h1>
      <div className="flex flex-col gap-4 ">
        <label htmlFor="">add sum</label>
        <input
          className="inp"
          type="number"
          value={newSum}
          onChange={(e: any) => setNewSum(parseInt(e.target.value, 10) || 0)}
          ref={inputRef}
          min={0}
          max={10000}
        />
        <button
          className={`${newSum > 0 ? "btn" : "dis-btn"}`}
          disabled={newSum <= 0}
          onClick={handleClick}
        >
          add
        </button>
      </div>
      <div>
        <ul>
          {reverseList().map((sum, key) => (
            <li key={key}>{sum} ₪</li>
          ))}
        </ul>
      </div>
      <br />

      <div className="border-t-2 border-white">total: {getTotal()} ₪</div>
    </div>
  );
};

export default PaperCalculator;
