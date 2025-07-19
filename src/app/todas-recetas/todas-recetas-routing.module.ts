import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodasRecetasPage } from './todas-recetas.page';

const routes: Routes = [
  {
    path: '',
    component: TodasRecetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodasRecetasPageRoutingModule {}
