"use client";
import Alert from "@/components/Alert";
import ProtectedRoute from "@/components/protectedRoute";
import { updateUserApi } from "@/firestore/user/userDB";
import { messageStore } from "@/stores/messageStore";
import userStore from "@/stores/userStore";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

function SettingsPage() {
  const [employeeNumber, setEmployeeNumber] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Start in view mode

  // Load initial employee number from userStore
  useEffect(() => {
    if (userStore.user) {
      setEmployeeNumber(userStore.user.employeeNumber);
    }
  }, [userStore.user]);

  const handleEmployeeNumberChange = (value: string) => {
    if (value === "") {
      setEmployeeNumber(undefined);
    } else {
      const parsedValue = parseInt(value);
      if (!isNaN(parsedValue)) {
        setEmployeeNumber(parsedValue);
      }
    }
  };

  const updateUser = async () => {
    try {
      if (employeeNumber === undefined || employeeNumber <= 0) {
        throw new Error("You must enter a valid employee number.");
      }

      if (!userStore.user?.uid) {
        throw new Error("No user ID found.");
      }

      setIsLoading(true);

      // Update in Firestore
      await updateUserApi(userStore.user.uid, { employeeNumber });

      // Update MobX store
      userStore.updateUser({ employeeNumber });

      messageStore.setMessage({
        type: "success",
        text: "Employee number updated successfully",
      });

      // Exit edit mode
      setIsEditMode(false);
    } catch (error: any) {
      messageStore.setMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const resetEdit = () => {
    if (userStore.user) {
      setEmployeeNumber(userStore.user.employeeNumber);
    }
    setIsEditMode(true);
  };

  return (
    <ProtectedRoute>
      <div className="p-10 pt-20">
        <h1 className="text-lg font-bold text-white mb-2">
          Employee Number Settings
        </h1>

        {/* EDIT MODE */}
        {isEditMode ? (
          <div>
            <input
              type="number"
              value={employeeNumber === undefined ? "" : employeeNumber}
              onFocus={() => {}}
              onBlur={() => {}}
              onChange={(e) => handleEmployeeNumberChange(e.target.value)}
              className="inp mt-2 border px-4 py-2 rounded-md shadow-sm"
              placeholder="Enter employee number"
            />

            <button
              className={`${
                employeeNumber && !isLoading
                  ? "bg-yellow text-black p-5 rounded-xl cursor-pointer"
                  : "bg-gray-900 text-white cursor-not-allowed"
              } px-3 py-2 rounded-xl mt-10`}
              onClick={updateUser}
              disabled={!employeeNumber || isLoading}
            >
              {isLoading ? "Updating..." : "Update Employee Number"}
            </button>
          </div>
        ) : (
          // VIEW MODE
          <div className="flex flex-col gap-4">
            <p className="text-white text-xl">
              Your Employee Number:{" "}
              <span className="font-bold text-yellow">
                {employeeNumber || "Not Set"}
              </span>
            </p>

            <button
              onClick={resetEdit}
              className="bg-yellow text-black px-4 py-2 rounded-xl w-fit"
            >
              Edit Employee Number
            </button>
          </div>
        )}

        <Alert />
      </div>
    </ProtectedRoute>
  );
}

export default observer(SettingsPage);
