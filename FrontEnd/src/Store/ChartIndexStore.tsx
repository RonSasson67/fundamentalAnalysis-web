import { makeAutoObservable } from "mobx";
import { GetIndexData } from "../Utils/ArraysLogic";

class ChartIndexStore {
    minIndex = 0;
    maxIndex = 0;
    data: any[] = [];
    
    constructor() {
        makeAutoObservable(this)
    }

    setMinIndex(index: number) {
        this.minIndex = index;
    }   

    setMaxIndex(index: number) {
        this.maxIndex = index;
    }
    
    setData(data: any[]) {
        this.data = data;
    }

    get getMinIndex() {
        return this.minIndex;
    }

    get getMaxIndex() {
        return this.maxIndex;
    }

    get getData() {
        return this.data;
    }

    get getIndexData() {
        return GetIndexData(this.data, this.minIndex, this.maxIndex);
    }
}

export default ChartIndexStore;
