import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: false
})
export class UsuariosPage {
  usuarios: any[] = [];

  constructor(private api: ApiService) {}

  ionViewWillEnter() {
    this.api.getUsuarios().subscribe((res: any) => {
      this.usuarios = res;
    });
  }
}
