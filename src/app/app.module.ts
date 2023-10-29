import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CongressmenComponent } from './components/congressmen/congressmen.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CongressmanCardComponent } from './components/congressman-card/congressman-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CongressmanComponent } from './components/congressman/congressman.component';
import { SocialIconPipe } from './pipes/social-icon.pipe';
import { CongressmenStore } from './store/congressmen.store';
import { ExpensesCardComponent } from './components/expenses-card/expenses-card.component';
import { ExpensesStore } from './store/expenses.store';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { ChipsInputComponent } from './components/chips-input/chips-input.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LoaderStore } from './store/loader.store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    CongressmenComponent,
    HeaderComponent,
    CongressmanCardComponent,
    CongressmanComponent,
    SocialIconPipe,
    ExpensesCardComponent,
    ExpensesComponent,
    ChipsInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxSkeletonLoaderModule
  ],
  providers: [CongressmenStore, ExpensesStore, LoaderStore, {provide: LOCALE_ID, useValue: 'pt'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
