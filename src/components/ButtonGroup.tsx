import React, { useState, useEffect } from "react";

interface ButtonGroupProps {
  chosen: string;
  setChosen: React.Dispatch<React.SetStateAction<string>>;
  shiftStore: {
    resetMonth: () => void;
    resetYear: () => void;
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

  const [localChosen, setLocalChosen] = useState<string>(() => {
    // Get the initial state from localStorage, if available
    const storedChosen = localStorage.getItem("chosenButton");
    return storedChosen || chosen; // Use localStorage or the prop's default
  });

  useEffect(() => {
    // Update localStorage whenever localChosen changes
    localStorage.setItem("chosenButton", localChosen);
    // Update the prop's state too, so other components know.
    setChosen(localChosen);
  }, [localChosen, setChosen]);

  return (
    <div
      className="flex justify-center gap-2 mt-5 mx-2 text-sm
     font-semibold text-white "
    >
      {buttons.map((button) => (
        <button
          key={button.id}
          className={`${
            localChosen === button.id && "bg-yellow p-3 rounded-lg text-black"
          } px-2 py-5 bg-gray-900 rounded-lg m-1 w-[30%]`}
          onClick={() => {
            setLocalChosen(button.id);
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
