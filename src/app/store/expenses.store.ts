import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { EMPTY, Observable, catchError, finalize, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Expense } from "../integration/expenses/expenses.model";
import { ExpensesService } from "../integration/expenses/expenses.service";
import { LoaderStore } from "./loader.store";


export interface ExpensesState {
    expenses?: Expense[]
};

const initialState: ExpensesState = {};

@Injectable()
export class ExpensesStore extends ComponentStore<ExpensesState> {

    constructor(private _service: ExpensesService, private _loaderStore: LoaderStore) {
        super(initialState);
    }

    private readonly setExpenses = this.updater((state: ExpensesState, expenses: Expense[]) => ({
        ...state,
        expenses,
    }));

    readonly getExpenses = this.select((state) => state.expenses);

   
    readonly fetchExpenses = this.effect((query$: Observable<[string, string[], string[]]>) => {
        return query$.pipe(
          tap(() => this._loaderStore.setIsLoadingExpenses(true)),
          switchMap((query) => this._service.fetchExpenses(query[0], query[1], query[2]).pipe(
            tapResponse((response) => {
              this.setExpenses(response);
              this._loaderStore.setIsLoadingExpenses(false);
            },
            (error: HttpErrorResponse) => {
              console.error('Error fetching Expenses');
              this._loaderStore.setIsLoadingExpenses(false);
            }),
            catchError(() => EMPTY)
          ))
        );
      });

    resetExpenses = this.updater((state: ExpensesState) => ({
        ...state,
        expenses: undefined,
    }));
}