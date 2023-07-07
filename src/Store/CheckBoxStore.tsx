import { makeAutoObservable } from "mobx";

class CheckBoxStore {
  checkedItems: Map<string, boolean> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  toggle(key: string) {
    const currentValue = this.checkedItems.get(key) || false;
    this.checkedItems.set(key, !currentValue);
  }

  isChecked(key: string) {
    if (this.checkedItems.has(key)) {
      return this.checkedItems.get(key);
    }

    this.checkedItems.set(key, false);
  }
}

export default CheckBoxStore;
