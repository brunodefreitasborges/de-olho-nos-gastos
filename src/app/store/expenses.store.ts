import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { EMPTY, Observable, catchError, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Expense } from "../integration/expenses/expenses.model";
import { ExpensesService } from "../integration/expenses/expenses.service";


export interface ExpensesState {
    expenses?: Expense[]
};

const initialState: ExpensesState = {};

@Injectable()
export class ExpensesStore extends ComponentStore<ExpensesState> {

    constructor(private _service: ExpensesService) {
        super(initialState);
    }

    private readonly setExpenses = this.updater((state: ExpensesState, expenses: Expense[]) => ({
        ...state,
        expenses,
    }));

    readonly getExpenses = this.select((state) => state.expenses);

   
    readonly fetchExpenses = this.effect((query$: Observable<[string, string[], string[]]>) => {
        return query$.pipe(
            switchMap((query) => this._service.fetchExpenses(query[0], query[1], query[2]).pipe(
                tapResponse((response) => {
                    this.setExpenses(response);
                },
                    (error: HttpErrorResponse) => {
                        console.error('Error fetching Expenses');
                        
                    }),
                catchError(() => EMPTY),
            ))
        );
    });

    resetExpenses = this.updater((state: ExpensesState) => ({
        ...state,
        expenses: undefined,
    }));
}