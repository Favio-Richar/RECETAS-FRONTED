import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-mis-favoritos',
  templateUrl: './mis-favoritos.page.html',
  styleUrls: ['./mis-favoritos.page.scss'],
  standalone: false
})
export class MisFavoritosPage implements OnInit {
  favoritos: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      this.api.getFavoritosUsuario(Number(user_id)).subscribe((data: any[]) => {
        // Si cada favorito viene con su receta anidada, extraemos esa receta
        this.favoritos = data.map(f => ({
          ...f.receta,
          calificacion: f.calificacion // si deseas mostrar calificación
        }));
      });
    }
  }
}
