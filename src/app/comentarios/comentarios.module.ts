import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComentariosPage } from './comentarios.page';
import { ComentariosPageRoutingModule } from './comentarios-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentariosPageRoutingModule
  ],
  declarations: [ComentariosPage] // 👈 DEBE estar aquí si NO es standalone
})
export class ComentariosPageModule {}
