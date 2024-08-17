import React, { useState } from "react";

interface Bill {
  name: string;
  value: number;
  image: string;
}

const bills: Bill[] = [
  { name: "20 Shekels", value: 20, image: "/images/cash/20shekels.png" },
  { name: "50 Shekels", value: 50, image: "/images/cash/50shekels.png" },
  { name: "100 Shekels", value: 100, image: "/images/cash/100shekels.png" },
  { name: "200 Shekels", value: 200, image: "/images/cash/200shekels.png" },
];
const BillsCalculator: React.FC = () => {
  const [amounts, setAmounts] = useState<number[]>(Array(bills.length).fill(0));

  const handleAmountChange = (index: number, value: string) => {
    const newAmounts = [...amounts];
    newAmounts[index] = parseInt(value, 10) || 0;
    setAmounts(newAmounts);
  };

  const calculateTotal = (amount: number, billValue: number) => {
    return amount * billValue;
  };

  const totalSum = amounts.reduce(
    (total, amount, index) =>
      total + calculateTotal(amount, bills[index].value),
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Bills Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="hidden md:block font-semibold">Bill Type</div>
        <div className="hidden md:block font-semibold">Amount of Bills</div>
        <div className="hidden md:block font-semibold">Total Value (₪)</div>
        {bills.map((bill, index) => {
          const total = calculateTotal(amounts[index], bill.value);
          return (
            <React.Fragment key={bill.name}>
              <div className="flex items-center">
                <img
                  src={bill.image}
                  alt={bill.name}
                  className="w-12 h-12 mr-2"
                />
                <div>{bill.name}</div>
              </div>
              <input
                type="number"
                value={amounts[index]}
                onChange={(e) => handleAmountChange(index, e.target.value)}
                className="border p-2 w-full md:w-auto"
                placeholder="0"
              />
              <div className="md:mt-0">{total.toFixed(2)} ₪</div>
            </React.Fragment>
          );
        })}
        <div className="col-span-2 md:col-span-2 font-semibold">
          Total Sum of All Bills:
        </div>
        <div className="font-semibold">{totalSum.toFixed(2)} ₪</div>
      </div>
    </div>
  );
};

export default BillsCalculator;
