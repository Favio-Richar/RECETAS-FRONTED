import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-todas-recetas',
  templateUrl: './todas-recetas.page.html',
  styleUrls: ['./todas-recetas.page.scss'],
  standalone: false
})
export class TodasRecetasPage implements OnInit {
  recetas: any[] = [];
  recetasFiltradas: any[] = [];
  busqueda: string = '';
  categoriaSeleccionada: string = '';
  calificaciones: { [recetaId: number]: number } = {};

  constructor(private api: ApiService, private sanitizer: DomSanitizer) {}

ngOnInit() {
  this.api.getRecetas().subscribe((res: any[]) => {
    this.recetas = res;
    this.recetasFiltradas = res;
    console.log('Recetas cargadas:', res); // ← verifica que sí viene imagen
  });
}


  getSanitizedImage(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
    this.recetasFiltradas = this.recetas.filter(r =>
      !categoria || r.categoria?.toLowerCase() === categoria.toLowerCase()
    );
  }

  filtrarRecetas() {
    const texto = this.busqueda.toLowerCase();
    this.recetasFiltradas = this.recetas.filter(r =>
      r.titulo.toLowerCase().includes(texto)
    );
  }

  limpiarFiltros() {
    this.busqueda = '';
    this.categoriaSeleccionada = '';
    this.recetasFiltradas = [...this.recetas];
  }

  calificar(recetaId: number, estrellas: number) {
    this.calificaciones[recetaId] = estrellas;
  }

  marcarFavorito(recetaId: number) {
    const user_id = localStorage.getItem('user_id');
    const calificacion = this.calificaciones[recetaId];

    if (!user_id) {
      alert('Usuario no logueado');
      return;
    }

    if (!calificacion || calificacion < 1 || calificacion > 5) {
      alert('Selecciona una calificación entre 1 y 5 estrellas');
      return;
    }

    const favorito = {
      user_id: Number(user_id),
      receta_id: recetaId,
      calificacion: calificacion
    };

    this.api.agregarFavorito(favorito).subscribe({
      next: (res) => alert(res.msg || 'Agregado a favoritos'),
      error: (err) => {
        console.error('ERROR', err);
        if (err.error?.detail) {
          alert('⚠️ ' + err.error.detail);
        } else {
          alert('Error al guardar favorito');
        }
      }
    });
  }
}
