// stores/ShiftStore.ts
import { getShiftsApi } from "@/firestore/shifts/getShifts";
import { Shift } from "@/interfaces/Shift";
import { autorun, makeAutoObservable } from "mobx";
import userStore from "./userStore";
import { messageStore } from "./messageStore";
import { curr_m, curr_y } from "@/util";

class ShiftStore {
  shifts: Shift[] = [];
  chosen: Shift | null = null;
  isLoading: boolean = false;
  month: number = curr_m;
  year: number = curr_y;
  title: string = "";

  constructor() {
    makeAutoObservable(this);
    this.getData();
    autorun((): void => {
      console.log(`shifts data changed :`);
      this.getData();
    });
  }

  setTitle(title: string) {
    this.title = title;
  }
  resetMonth() {
    this.month = curr_m;
  }
  resetYear() {
    this.year = curr_y;
  }
  setMonth(month: number) {
    this.month = month;
  }
  setYear(year: number) {
    this.year = year;
  }
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
  setShifts(shifts: Shift[]) {
    this.shifts = shifts;
  }
  updateShift(updatedShift: Shift) {
    this.shifts = this.shifts.map((shift) =>
      shift.id === updatedShift.id ? updatedShift : shift
    );
  }
  setChosen(shift: Shift) {
    this.chosen = shift;
  }

  getData() {
    this.isLoading = true;

    if (userStore.user && this.title) {
      getShiftsApi(userStore.user.uid, this.title, this.year, this.month)
        .then((shiftsItems) => {
          this.shifts = shiftsItems;
          messageStore.setMessage({
            type: "success",
            text: "fetch shifts succesfully",
          });

          this.isLoading = false;

          this.shifts = shiftsItems;
        })
        .catch((err: any) => {
          console.log(err);
          this.isLoading = false;

          messageStore.setMessage({ type: "error", text: err.message });
        });
    }
  }
}

export const shiftStore = new ShiftStore();
