import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  recetas: any[] = [];

  // Variables del formulario
  titulo = '';
  ingredientes = '';
  preparacion = '';
  imagen = '';
  fecha_publicacion = '';
  categoria = '';

  constructor(
    private api: ApiService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private router: Router
  ) {}

  // ✅ Al cargar la vista, traer recetas
  ionViewWillEnter() {
    this.api.getRecetas().subscribe(res => this.recetas = res as any[]);
  }

  // ✅ Crear nueva receta con validaciones
  crearReceta() {
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      alert('Usuario no identificado. Inicie sesión.');
      return;
    }

    if (!this.titulo || !this.ingredientes || !this.preparacion || !this.imagen || !this.fecha_publicacion || !this.categoria) {
      alert('Completa todos los campos');
      return;
    }

    if (!this.imagen.startsWith('http') || (!this.imagen.endsWith('.jpg') && !this.imagen.endsWith('.png'))) {
      alert('La imagen debe ser un link válido que termine en .jpg o .png');
      return;
    }

    const nueva = {
      titulo: this.titulo,
      ingredientes: this.ingredientes,
      preparacion: this.preparacion,
      imagen: this.imagen,
      fecha_publicacion: this.fecha_publicacion,
      categoria: this.categoria,
      autor_id: Number(user_id)
    };

    this.api.crearReceta(nueva).subscribe(() => {
      alert('Receta guardada correctamente');
      this.ionViewWillEnter(); // Recargar recetas
      // Limpiar formulario
      this.titulo = this.ingredientes = this.preparacion = this.imagen = this.fecha_publicacion = this.categoria = '';
    }, () => alert('Error al guardar receta'));
  }

  // ✅ Comentar una receta
  async comentar(recetaId: number) {
    const alert = await this.alertCtrl.create({
      header: 'Comentar receta',
      inputs: [{ name: 'contenido', type: 'text', placeholder: 'Tu comentario' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Enviar',
          handler: data => {
            const user_id = localStorage.getItem('user_id');
            if (!user_id) return window.alert('Usuario no identificado');

            this.api.comentar({
              receta_id: recetaId,
              contenido: data.contenido,
              autor_id: Number(user_id)
            }).subscribe(() => window.alert('Comentario enviado'));
          }
        }
      ]
    });

    await alert.present();
  }

  // ✅ Ver comentarios
  verComentarios(id: number) {
    this.navCtrl.navigateForward(`/comentarios/${id}`);
  }

  // ✅ Cerrar sesión
  cerrarSesion() {
    localStorage.removeItem('user_id');
    this.router.navigate(['/login']);
  }

  // ✅ Opcional: Mostrar preview de imagen al escribirla
  mostrarImagen() {
    console.log('Preview imagen:', this.imagen);
  }
}
