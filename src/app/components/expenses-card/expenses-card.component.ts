import { Component, Input } from '@angular/core';
import { Expense } from 'src/app/integration/expenses/expenses.model';

@Component({
  selector: 'app-expenses-card',
  templateUrl: './expenses-card.component.html',
})
export class ExpensesCardComponent {
  @Input() expense?: Expense;
}
