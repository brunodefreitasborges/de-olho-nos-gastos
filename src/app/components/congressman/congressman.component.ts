import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Congressman } from 'src/app/integration/congressmen/congressmen.model';
import { Expense } from 'src/app/integration/expenses/expenses.model';
import { CongressmenStore } from 'src/app/store/congressmen.store';
import { ExpensesStore } from 'src/app/store/expenses.store';

@Component({
  selector: 'app-congressman',
  templateUrl: './congressman.component.html',
})
export class CongressmanComponent implements OnInit{
  congressman?: Observable<Congressman | undefined>;
  id!: string;

  congressmanStore = inject(CongressmenStore);

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, public dialogRef: MatDialogRef<CongressmanComponent>) {
    this.congressman = this.congressmanStore.getSelectedCongressman;
  }

  ngOnInit(): void {
    this.id = this.data;
    this.congressmanStore.fetchCongressmanById(this.data);
  }

  formatDate(date: string): string {
    const dateParts = date.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  close() {
    this.congressmanStore.resetSelectedCongressmanState();
    this.dialogRef.close();
  }

}
