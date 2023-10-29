import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, mergeMap, of } from "rxjs";
import { Expense, ExpenseResponse } from "./expenses.model";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  url!: string;

  constructor(private _http: HttpClient) {}

  fetchExpenses(id: string, years: string[], months: string[]): Observable<Expense[]> {
    const baseUrl = `api/${id}/despesas`;
    let url = baseUrl + '?';
  
    years.forEach((year) => {
      url += `ano=${year}&`;
    });
  
    months.forEach((month) => {
      url += `mes=${month}&`;
    });

    url += `itens=100`;

    this.url = url;

    return this.fetchAllExpenses(1);
  }

  private fetchAllExpenses(page: number, allExpenses: Expense[] = []): Observable<Expense[]> {
    return this._http.get<ExpenseResponse>(this.url + `&pagina=${page}`).pipe(mergeMap((response) => {
      const currentExpenses = response.dados;
      allExpenses = allExpenses.concat(currentExpenses);

      if (response.links.find(link => link.rel === 'next')) {
        return this.fetchAllExpenses(page + 1, allExpenses);
      } else {
        return of(allExpenses);
      }
    }));
  }
}
