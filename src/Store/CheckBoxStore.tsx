import { makeAutoObservable } from "mobx";

class CheckBoxStore {
  checkedItems: Map<string, boolean> = new Map();
  defaultValue: boolean = true;

  constructor(defaultValue: boolean) {
    makeAutoObservable(this);
    this.defaultValue = defaultValue;
  }

  toggle(key: string) {
    const currentValue = this.checkedItems.get(key);
    this.checkedItems.set(key, !currentValue);
  }

  isChecked(key: string) {
    if (this.checkedItems.has(key)) {
      return this.checkedItems.get(key);
    }

    this.checkedItems.set(key, this.defaultValue);
    return this.defaultValue;
  }
}

export default CheckBoxStore;
