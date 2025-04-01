import React from "react";

interface WageCalculationProps {
  totalWage: number;
  regularHours: number;
  overtime1Hours: number;
  overtime2Hours: number;
  calculate: () => void;
}

const WageCalculation: React.FC<WageCalculationProps> = ({
  totalWage,
  regularHours,
  overtime1Hours,
  overtime2Hours,
  calculate,
}) => {
  return (
    <div className="flex flex-col items-center gap-6 mt-6">
      {totalWage === -1 ? (
        <button
          className="bg-white text-black font-bold text-md px-6 py-3 rounded-xl w-full md:w-auto hover:bg-yellow-600 transition-all"
          onClick={calculate}
        >
          Calculate Wage
        </button>
      ) : (
        <div className="flex flex-col gap-4 text-white text-lg md:text-xl font-semibold items-center text-center">
          <div>
            Regular Hours (100%):{" "}
            <span className="text-yellow">{regularHours.toFixed(2)} hrs</span>
          </div>
          <div>
            Overtime 1 (125%):{" "}
            <span className="text-yellow">{overtime1Hours.toFixed(2)} hrs</span>
          </div>
          <div>
            Overtime 2 (150%):{" "}
            <span className="text-yellow">{overtime2Hours.toFixed(2)} hrs</span>
          </div>
          <div className="text-2xl font-bold mt-4">
            Total Wage:{" "}
            <span className="text-green-400">{totalWage.toFixed(2)} NIS</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WageCalculation;
