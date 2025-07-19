import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';  // 👈 SIN Ñ

  constructor(private api: ApiService, private router: Router) {}

  registrar() {
    if (!this.nombre || !this.correo || !this.contrasena) {
      alert('Completa todos los campos');
      return;
    }

    this.api.register({
      nombre: this.nombre,
      correo: this.correo,
      contraseña: this.contrasena  // 👈 backend espera "contraseña", pero tú usas "contrasena" en el frontend
    }).subscribe(
      () => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      () => alert('Error al registrar')
    );
  }
}
