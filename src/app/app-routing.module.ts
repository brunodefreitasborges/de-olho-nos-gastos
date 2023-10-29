import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongressmenComponent } from './components/congressmen/congressmen.component';
import { CongressmanComponent } from './components/congressman/congressman.component';


const routes: Routes = [
  {
    path: 'congressmen',
    component: CongressmenComponent
  },
  {
    path: 'congressman/:id',
    component: CongressmanComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'congressmen'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
