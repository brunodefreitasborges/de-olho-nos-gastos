import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";


export interface LoaderState {
    isLoadingExpenses: boolean;
};

const initialState: LoaderState = {
    isLoadingExpenses: false
};

@Injectable()
export class LoaderStore extends ComponentStore<LoaderState> {

    constructor() {
        super(initialState);
    }

    readonly setIsLoadingExpenses = this.updater((state: LoaderState, isLoadingExpenses: boolean) => {
        return {
          ...state,
          isLoadingExpenses,
        };
      });

    readonly getisLoadingExpenses = this.select((state) => state.isLoadingExpenses);

   
    
}