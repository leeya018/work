import React, { useState } from "react";

interface Coin {
  name: string;
  weight: number; // Weight in grams
  value: number;
  image: string;
}

const coins: Coin[] = [
  {
    name: "10 Agorot",
    weight: 4,
    value: 0.1,
    image: "/images/cash/10agorot.png",
  },
  {
    name: "50 Agorot",
    weight: 6.5,
    value: 0.5,
    image: "/images/cash/50agorot.png",
  },
  { name: "1 Shekel", weight: 8, value: 1, image: "/images/cash/1shekel.png" },
  {
    name: "2 Shekels",
    weight: 5.7,
    value: 2,
    image: "/images/cash/2shekels.png",
  },
  {
    name: "5 Shekels",
    weight: 8.2,
    value: 5,
    image: "/images/cash/5shekels.png",
  },
  {
    name: "10 Shekels",
    weight: 7,
    value: 10,
    image: "/images/cash/10shekels.png",
  },
];

const CoinCalculator: React.FC = () => {
  const [weights, setWeights] = useState<number[]>(Array(coins.length).fill(0));
  const [amounts, setAmounts] = useState<number[]>(Array(coins.length).fill(0));

  const handleWeightChange = (index: number, value: string) => {
    const newWeights = [...weights];
    newWeights[index] = parseFloat(value) || 0;
    setWeights(newWeights);

    const newAmounts = [...amounts];
    newAmounts[index] = Math.floor(newWeights[index] / coins[index].weight);
    setAmounts(newAmounts);
  };

  const handleAmountChange = (index: number, value: string) => {
    const newAmounts = [...amounts];
    newAmounts[index] = parseInt(value, 10) || 0;
    setAmounts(newAmounts);

    const newWeights = [...weights];
    newWeights[index] = newAmounts[index] * coins[index].weight;
    setWeights(newWeights);
  };

  const calculateTotal = (amount: number, coinValue: number) => {
    return amount * coinValue;
  };

  const totalValue = amounts.reduce(
    (total, amount, index) =>
      total + calculateTotal(amount, coins[index].value),
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Coin Calculator</h2>
      <div className="flex flex-col gap-4">
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4"> */}
        {/* <div className="hidden md:block font-semibold">Coin Type</div>
        <div className="hidden md:block font-semibold">Weight (grams)</div>
        <div className="hidden md:block font-semibold">Amount of Coins</div>
        <div className="hidden md:block font-semibold">Total Value (₪)</div> */}
        {coins.map((coin, index) => {
          const total = calculateTotal(amounts[index], coin.value);
          return (
            <div className="flex flex-col items-center" key={coin.name}>
              <React.Fragment>
                <div className="flex items-center">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-12 h-12 mr-2"
                  />
                  <div>{coin.name}</div>
                </div>
                <div>
                  <span>weight (g)</span>
                  <input
                    type="number"
                    value={weights[index]}
                    onChange={(e) => handleWeightChange(index, e.target.value)}
                    className="border p-2 w-full md:w-auto"
                    placeholder="0"
                  />
                </div>
                <div>
                  <span>coins num (g)</span>
                  <input
                    type="number"
                    value={amounts[index]}
                    onChange={(e) => handleAmountChange(index, e.target.value)}
                    className="border p-2 w-full md:w-auto"
                  />
                </div>

                <div className="md:mt-0">{total.toFixed(2)} ₪</div>
              </React.Fragment>
            </div>
          );
        })}
        <div className="col-span-3 md:col-span-3 font-semibold">
          Total Value of All Coins:
        </div>
        <div className="font-semibold">{totalValue.toFixed(2)} ₪</div>
      </div>
    </div>
  );
};

export default CoinCalculator;
