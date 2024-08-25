import React, { useRef, useState } from "react";

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
  { name: "1 Shekel", weight: 4, value: 1, image: "/images/cash/1shekel.png" },
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
  const [selectedCoinIndex, setSelectedCoinIndex] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [coinList, setCoinList] = useState<
    { coin: Coin; weight: number; amount: number; total: number }[]
  >([]);
  const [coinOptions, setCoinOptions] = useState<Coin[]>(coins);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleWeightChange = (value: string) => {
    const newWeight = parseFloat(value) || 0;
    setWeight(newWeight);
    setAmount(Math.floor(newWeight / coinOptions[selectedCoinIndex].weight));
  };

  const handleAmountChange = (value: string) => {
    const newAmount = parseInt(value, 10) || 0;
    setAmount(newAmount);
    setWeight(newAmount * coinOptions[selectedCoinIndex].weight);
  };

  const handleAddCoin = () => {
    const selectedCoin = coinOptions[selectedCoinIndex];
    const total = amount * selectedCoin.value;

    setCoinList([...coinList, { coin: selectedCoin, weight, amount, total }]);

    // Update coin options and reset inputs
    const updatedCoinOptions = coinOptions.filter(
      (item, ind) => ind !== selectedCoinIndex
    );
    setCoinOptions(updatedCoinOptions);
    setSelectedCoinIndex(0);
    setWeight(0);
    setAmount(0);
    // focus
    inputRef.current?.focus();
  };

  const handleRemoveCoin = (index: number) => {
    const removedCoin = coinList[index].coin;

    // Update the coin list by removing the selected coin
    const updatedCoinList = coinList.filter((_, ind) => ind !== index);
    setCoinList(updatedCoinList);

    // Add the removed coin back to the options list
    const updatedCoinOptions = [...coinOptions, removedCoin].sort(
      (c1, c2) => c1.value - c2.value
    );
    setCoinOptions(updatedCoinOptions);

    // Reset the selected coin index
    setSelectedCoinIndex(0);
  };

  const handleFocus = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number
  ) => {
    if (value === 0) {
      setter(NaN); // Set the value to NaN (not a number) to clear the input
    }
  };

  const handleBlur = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number
  ) => {
    if (isNaN(value)) {
      setter(0); // Reset to 0 if the input is empty or NaN
    }
  };

  const totalValue = coinList.reduce((total, item) => total + item.total, 0);

  return (
    <div className="container mx-auto p-4 text-white">
      <h2 className="text-xl font-bold mb-4 text-center">Coin Calculator</h2>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-between w-full gap-2">
          {coinOptions.length > 0 && (
            <>
              <img
                src={coinOptions[selectedCoinIndex].image}
                alt={coinOptions[selectedCoinIndex].name}
                className="w-12 h-12 mr-2"
              />
              <select
                className="inp"
                value={selectedCoinIndex}
                onChange={(e) => {
                  setSelectedCoinIndex(parseInt(e.target.value, 10));
                  setAmount(0);
                  setWeight(0);
                }}
              >
                {coinOptions.map((coin, index) => (
                  <option key={coin.name} value={index}>
                    {coin.name}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        {coinOptions.length > 0 && (
          <>
            <div className="flex items-center gap-2">
              <span>Weight (g): </span>
              <input
                ref={inputRef}
                type="number"
                value={isNaN(weight) ? "" : weight}
                onFocus={() => handleFocus(setWeight, weight)}
                onBlur={() => handleBlur(setWeight, weight)}
                onChange={(e) => {
                  handleWeightChange(e.target.value);
                }}
                className="inp mt-2"
                placeholder="0"
              />
            </div>

            <div className="flex items-center gap-2">
              <span>Number of Coins: </span>
              <input
                type="number"
                value={isNaN(amount) ? "" : amount}
                onFocus={() => handleFocus(setAmount, amount)}
                onBlur={() => handleBlur(setAmount, amount)}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="inp mt-2"
                placeholder="0"
              />
            </div>

            <button
              className={` mt-4 bg-gray-500 ${amount == 0 ? "dis-btn" : "btn"}`}
              disabled={amount === 0}
              onClick={handleAddCoin}
            >
              Add Coin to List
            </button>
          </>
        )}

        <div className="w-full mt-6">
          {coinList.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-2 p-2 border-b border-gray-500"
            >
              <div className="flex flex-col w-full pb-2">
                <div className="flex gap-2 items-center justify-between">
                  <img
                    src={item.coin.image}
                    alt={item.coin.name}
                    className="w-12 h-12 mr-2"
                  />
                  <div>{item.coin.name}</div>
                  <div>
                    <button
                      onClick={() => handleRemoveCoin(index)}
                      className="btn bg-red-400 ml-3"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>{item.weight} g</div>
                  <div>{item.amount} coins</div>
                  <div>{item.total.toFixed(2)} ₪</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="font-semibold text-xl text-white">
          Total Value of All Coins: {totalValue.toFixed(2)} ₪
        </div>
      </div>
    </div>
  );
};

export default CoinCalculator;
