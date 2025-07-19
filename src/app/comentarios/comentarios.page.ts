import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
  standalone: false
})
export class ComentariosPage {
  recetas: any[] = [];
  comentariosPorReceta: { [id: number]: any[] } = {}; // ✅ ya inicializado

  constructor(private api: ApiService, private alertCtrl: AlertController) {}

  // ✅ Cargar recetas y comentarios
  ionViewWillEnter() {
    this.api.getRecetas().subscribe(res => {
      this.recetas = res as any[];

      this.recetas.forEach(receta => {
        this.api.getComentarios(receta.id).subscribe(comentarios => {
          this.comentariosPorReceta[receta.id] = comentarios as any[];
        });
      });
    });
  }

  // ✅ Agregar comentario con alerta
  async comentar(recetaId: number) {
    const alert = await this.alertCtrl.create({
      header: 'Comentar receta',
      inputs: [{ name: 'contenido', type: 'text', placeholder: 'Tu comentario' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Enviar',
          handler: data => {
            const autor_id = localStorage.getItem('user_id');
            if (!autor_id) return window.alert('Usuario no identificado');

            this.api.comentar({
              receta_id: recetaId,
              contenido: data.contenido,
              autor_id: Number(autor_id)
            }).subscribe(() => {
              window.alert('Comentario enviado');
              this.api.getComentarios(recetaId).subscribe(comentarios => {
                this.comentariosPorReceta[recetaId] = comentarios as any[];
              });
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // ✅ Evitar errores en el HTML
  tieneComentarios(id: number): boolean {
    return !!(this.comentariosPorReceta[id] && this.comentariosPorReceta[id].length > 0);
  }

  noTieneComentarios(id: number): boolean {
    return this.comentariosPorReceta[id] && this.comentariosPorReceta[id].length === 0;
  }
}
