"use client";
import AddShift from "@/components/AddShift";
import Alert from "@/components/Alert";
import ButtonGroup from "@/components/ButtonGroup";
import ProtectedRoute from "@/components/protectedRoute";
import SettingsInfo from "@/components/settingsInfo";
import Shifts from "@/components/Shifts";
import ShiftsPerMonth from "@/components/ShiftsPerMonth";
import { shiftStore } from "@/stores/shiftStore";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";

const ShiftsInfo = () => {
  const [chosen, setChosen] = useState<string>("add_shift");

  return (
    <ProtectedRoute>
      <div className="w-screen">
        <SettingsInfo />
        <div className="overflow-y-auto">
          {" "}
          {/* Add overflow-y-auto here */}
          <ButtonGroup
            chosen={chosen}
            setChosen={setChosen}
            shiftStore={shiftStore}
          />
          {chosen === "add_shift" && <AddShift />}
          {chosen === "last month shifts" && <Shifts />}
          {chosen === "shifts_per_m" && <ShiftsPerMonth />}
          <Alert />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default observer(ShiftsInfo);
