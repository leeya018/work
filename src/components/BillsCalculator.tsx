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
  const [selectedBillIndex, setSelectedBillIndex] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [billList, setBillList] = useState<
    { bill: Bill; amount: number; total: number }[]
  >([]);
  const [billOptions, setBillOptions] = useState<Bill[]>(bills);

  const handleAmountChange = (value: string) => {
    setAmount(parseInt(value, 10) || 0);
  };

  const handleAddBill = () => {
    const selectedBill = billOptions[selectedBillIndex];
    const total = amount * selectedBill.value;

    setBillList([{ bill: selectedBill, amount, total }, ...billList]);

    // Remove the selected bill from options and reset inputs
    const updatedBillOptions = billOptions.filter(
      (item, ind) => ind !== selectedBillIndex
    );
    setBillOptions(updatedBillOptions);
    setSelectedBillIndex(0);
    setAmount(0);
  };

  const handleRemoveBill = (index: number) => {
    const removedBill = billList[index].bill;

    // Remove the bill from the list and add it back to the options
    const updatedBillList = billList.filter((_, ind) => ind !== index);
    setBillList(updatedBillList);

    const updatedBillOptions = [...billOptions, removedBill].sort(
      (b1, b2) => b1.value - b2.value
    );
    setBillOptions(updatedBillOptions);

    // Reset the selected bill index
    setSelectedBillIndex(0);
  };

  const handleFocus = () => {
    if (amount === 0) {
      setAmount(NaN); // Clear the input by setting it to NaN
    }
  };

  const handleBlur = () => {
    if (isNaN(amount) || amount === 0) {
      setAmount(0); // Reset to 0 if the input is empty or NaN
    }
  };

  const totalSum = billList.reduce((total, item) => total + item.total, 0);

  return (
    <div className="container mx-auto p-4 text-white">
      <h2 className="text-xl font-bold mb-4 text-center">Bills Calculator</h2>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-between w-full gap-2">
          {billOptions.length > 0 && (
            <>
              <img
                src={billOptions[selectedBillIndex].image}
                alt={billOptions[selectedBillIndex].name}
                className="w-12 h-12 mr-2"
              />
              <select
                className="inp"
                value={selectedBillIndex}
                onChange={(e) => {
                  setSelectedBillIndex(parseInt(e.target.value, 10));
                  setAmount(0);
                }}
              >
                {billOptions.map((bill, index) => (
                  <option key={bill.name} value={index}>
                    {bill.name}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        {billOptions.length > 0 && (
          <>
            <div className="flex items-center gap-2">
              <span>Number of Bills: </span>
              <input
                type="number"
                value={isNaN(amount) ? "" : amount}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="inp mt-2"
                placeholder="0"
              />
            </div>

            <button
              className={` mt-4 bg-gray-500 ${amount == 0 ? "dis-btn" : "btn"}`}
              disabled={amount === 0}
              onClick={handleAddBill}
            >
              Add Bill to List
            </button>
          </>
        )}

        <div className="w-full mt-6">
          {billList.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-2 p-2 border-b border-gray-500"
            >
              <div className="flex flex-col w-full pb-2">
                <div className="flex gap-2 items-center justify-between">
                  <img
                    src={item.bill.image}
                    alt={item.bill.name}
                    className="w-12 h-12 mr-2"
                  />
                  <div>{item.bill.name}</div>
                  <div>
                    <button
                      onClick={() => handleRemoveBill(index)}
                      className="btn bg-red-400 ml-3"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>{item.amount} bills</div>
                  <div>{item.total.toFixed(2)} ₪</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="font-semibold text-xl text-white">
          Total Value of All Bills: {totalSum.toFixed(2)} ₪
        </div>
      </div>
    </div>
  );
};

export default BillsCalculator;
