import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, filter, startWith } from 'rxjs';
import { Congressmen } from 'src/app/integration/congressmen/congressmen.model';
import { CongressmenService } from 'src/app/integration/congressmen/congressmen.service';
import { CongressmenStore } from 'src/app/store/congressmen.store';
import { CongressmanComponent } from '../congressman/congressman.component';

@Component({
  selector: 'app-congressmen',
  templateUrl: './congressmen.component.html',
})
export class CongressmenComponent implements OnInit {

  service = inject(CongressmenService);
  router = inject(Router);
  dialog = inject(MatDialog);
  congressmen!: Congressmen[];
  filteredCongressmen: Congressmen[] = [];
  parties!: Set<string>;
  ufs!: Set<string>;
  form!: FormGroup;

  constructor(private congressmenStore: CongressmenStore) {
    if (!this.congressmenStore.dataFetched) {
      this.congressmenStore.fetchCongressmen();
    }
  }

  ngOnInit(): void {
    this.congressmenStore.getCongressmen.pipe(
      filter((congressmen) => !!congressmen)
    ).subscribe((congressmen) => {
      this.congressmen = congressmen!;
      this.parties = new Set(congressmen!.map((congressman) => congressman.siglaPartido));
      this.ufs = new Set(congressmen!.map((congressman) => congressman.siglaUf));
    });
    
    this.form = new FormGroup({
      name: new FormControl(''),
      party: new FormControl(''),
      uf: new FormControl('')
    });

    this.filterListeners();
  }

  filterListeners() {
    const nameControl = this.form.get('name');
    const partyControl = this.form.get('party');
    const ufControl = this.form.get('uf');

    nameControl?.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300))
      .subscribe((value) => {
        this.filteredCongressmen = this.filterCongressmen(value, partyControl?.value, ufControl?.value);
      });

    partyControl?.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300))
      .subscribe((value) => {
        this.filteredCongressmen = this.filterCongressmen(nameControl?.value, value, ufControl?.value);
      });

    ufControl?.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300))
      .subscribe((value) => {
        this.filteredCongressmen = this.filterCongressmen(nameControl?.value, partyControl?.value, value);
      });
  }

  filterCongressmen(name: string, party: string, uf: string): Congressmen[] {
    return this.congressmen.filter((congressman) =>
      congressman.nome.toLowerCase().includes(name) && (party === '' || congressman.siglaPartido === party) && (uf === '' || congressman.siglaUf === uf)
    );
  }

  details(id: string) {
    const dialogRef = this.dialog.open(CongressmanComponent, 
      {
        data: id,
        height: '90vh',
        width: '90vw',
        autoFocus: false
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog Closed: ', result)
    })
  }

  resetForm() {
    this.form.get('name')?.setValue(''); 
    this.form.get('party')?.setValue('');
    this.form.get('uf')?.setValue('');
  }

}
