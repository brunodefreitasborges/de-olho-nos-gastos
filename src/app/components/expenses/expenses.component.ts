import { CurrencyPipe } from '@angular/common';
import { Component, Inject, Input, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Expense, Option } from 'src/app/integration/expenses/expenses.model';
import { ExpensesStore } from 'src/app/store/expenses.store';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
})
export class ExpensesComponent {
  
  @Input() id!: string;
  expenses?: Observable<Expense[] | undefined>;
  totalExpenses?: number;
  filteredYears!: Observable<string[]>;
  years: Option[] = [];
  selectedYears: Option[] = [{value: new Date().getFullYear().toString() ,description: new Date().getFullYear().toString()}]
  months: Option[] = [
    { value: '1', description: 'Janeiro' },
    { value: '2', description: 'Fevereiro' },
    { value: '3', description: 'Março' },
    { value: '4', description: 'Abril' },
    { value: '5', description: 'Maio' },
    { value: '6', description: 'Junho' },
    { value: '7', description: 'Julho' },
    { value: '8', description: 'Agosto' },
    { value: '9', description: 'Setembro' },
    { value: '10', description: 'Outubro' },
    { value: '11', description: 'Novembro' },
    { value: '12', description: 'Dezembro' }
  ];
  selectedMonths: Option[] = [this.getCurrentMonthOption()];

  expensesStore = inject(ExpensesStore);

  constructor() {
    this.expenses = this.expensesStore.getExpenses;
    this.years = this.generateYears(10);
  }

  ngOnInit(): void {
    this.expensesStore.fetchExpenses([
      this.id, 
      this.selectedYears.map(year => year.value),
      this.selectedMonths.map(month => month.value)
    ]);
    this.calculateTotalExpenses();
  }

  generateYears(count: number): Option[] {
    const currentYear = new Date().getFullYear();
    const years: Option[] = [];

    for (let i = 0; i < count; i++) {
      years.push({value: (currentYear - i).toString(), description: (currentYear - i).toString()});
    }

    return years;
  }

  filterExpenses() {
    this.expensesStore.fetchExpenses([this.id, this.selectedYears.map(year => year.value), this.selectedMonths.map(month => month.value)]);
  }

  handleYearsChanged(years: Option[]): void {
    this.selectedYears = years;
  }
  
  handleMonthsChanged(months: Option[]): void {
    this.selectedMonths = months;
  }

  calculateTotalExpenses() {
    this.expenses?.subscribe((expenses) => {
      if (expenses) {
        const total = expenses.reduce((acc, expense) => acc + expense.valorLiquido, 0);
        this.totalExpenses = total;
      } else {
        this.totalExpenses = 0;
      }
    });
  }

  getCurrentMonthOption(): Option {
    const currentMonth = new Date().getMonth() + 1;
    return this.months.find((month) => month.value === currentMonth.toString())!;
  }
}

