import { Component, ElementRef, Output, EventEmitter, Input, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, startWith } from 'rxjs';
import { Option } from '../../integration/expenses/expenses.model';

@Component({
  selector: 'app-chips-input',
  template: `
    <form [formGroup]="form">
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>{{ label }}</mat-label>
        <mat-chip-grid #chipGrid>
          <mat-chip-row *ngFor="let item of selectedItems" (removed)="remove(item.value)">
            {{ item.description }}
            <button matChipRemove>
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip-row>
          <input placeholder="{{ placeholder }}" #input formControlName="inputControl" [matChipInputFor]="chipGrid"
            [matAutocomplete]="complete" (matChipInputTokenEnd)="add($event)" />
          <mat-autocomplete #complete="matAutocomplete" (optionSelected)="selected($event)">
            <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
              {{ option.description }}
            </mat-option>
          </mat-autocomplete>
        </mat-chip-grid>
      </mat-form-field>
    </form>
  `,
})
export class ChipsInputComponent implements OnInit {
  @Input() options: Option[] = [];
  @Input() placeholder: string = '';
  @Input() label: string = '';

  @Output() selectedItemsChanged = new EventEmitter<Option[]>();

  form!: FormGroup;
  filteredOptions!: Observable<Option[]>;
  @Input() selectedItems: Option[] = [];

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.form = new FormGroup({
      inputControl: new FormControl(''),
    });

    this.filteredOptions = this.form.controls['inputControl'].valueChanges.pipe(
      startWith(null),
      map((value: string | null) => (value ? this._filter(value) : this.options.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const newOption = this.options.find(option => option.value === value);
      if (newOption) {
        this.selectedItems.push(newOption);
        this.selectedItemsChanged.emit(this.selectedItems);
      }
    }

    event.chipInput!.clear();
    this.form.controls['inputControl'].setValue(null);
  }

  remove(value: string): void {
    const index = this.selectedItems.findIndex(item => item.value === value);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);
      this.selectedItemsChanged.emit(this.selectedItems);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedItems.push(event.option.value);
    this.input.nativeElement.value = '';
    this.form.controls['inputControl'].setValue(null);
    this.selectedItemsChanged.emit(this.selectedItems);
  }

  private _filter(value: string): Option[] {
    const filterValue = value;

    return this.options.filter(option => option.description.includes(filterValue));
  }
}
