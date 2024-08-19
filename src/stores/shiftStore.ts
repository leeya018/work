// stores/ShiftStore.ts
import { Shift } from "@/interfaces/Shift";
import { makeAutoObservable } from "mobx";

class ShiftStore {
  shifts: Shift[] = [];
  chosen: Shift | null = null;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
  setShifts(shifts: Shift[]) {
    this.shifts = shifts;
  }
  setChosen(shift: Shift) {
    this.chosen = shift;
  }
}

export const shiftStore = new ShiftStore();
