import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TodasRecetasPageRoutingModule } from './todas-recetas-routing.module';
import { TodasRecetasPage } from './todas-recetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodasRecetasPageRoutingModule
  ],
  declarations: [TodasRecetasPage] // 👈 correcto
})
export class TodasRecetasPageModule {}
