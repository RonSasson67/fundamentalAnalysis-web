import { makeAutoObservable } from "mobx";

class TextInputStore {
  inputsTexts: Map<string, string> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  addInput(name: string) {
    this.inputsTexts.set(name, "");
  }

  updateInput(name: string, value: string) {
    this.inputsTexts.set(name, value);
  }
}

export default TextInputStore;
