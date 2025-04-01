import React from "react";

interface ButtonGroupProps {
  chosen: string;
  setChosen: React.Dispatch<React.SetStateAction<string>>;
  shiftStore: {
    resetMonth: () => void;
    resetYear: () => void;
    // Add other methods or properties of shiftStore if needed
  };
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  chosen,
  setChosen,
  shiftStore,
}) => {
  const buttons = [
    { id: "add_shift", label: "add shift" },
    {
      id: "last month shifts",
      label: "last month shifts",
      resetMonth: true,
      resetYear: true,
    },
    { id: "shifts_per_m", label: "shifts per month" },
  ];

  console.log({ chosen });
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-5 mx-2 text-sm font-semibold text-white">
      {buttons.map((button) => (
        <button
          key={button.id}
          className={`${
            chosen === button.id && "bg-yellow p-3  rounded-lg text-black"
          } px-2  bg-gray-900 rounded-lg m-1 py-5`}
          onClick={() => {
            setChosen(button.id);
            if (button.resetMonth) {
              shiftStore.resetMonth();
            }
            if (button.resetYear) {
              shiftStore.resetYear();
            }
          }}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
