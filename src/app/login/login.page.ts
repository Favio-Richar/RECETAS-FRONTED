import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false  // ✅ Lo dejo como tú lo pusiste (aunque Angular lo ignora)
})
export class LoginPage {
  correo: string = '';
  contrasena: string = '';  // ✅ cambiado de "clave" a "contrasena"

  constructor(private router: Router, private http: HttpClient) {}

  iniciarSesion() {
    if (!this.correo || !this.contrasena) {
      alert('Completa todos los campos');
      return;
    }

    this.http.post<any>('http://localhost:8000/login', {
      correo: this.correo,
      contraseña: this.contrasena  // ✅ el backend espera "contraseña"
    }).subscribe({
      next: (res) => {
        localStorage.setItem('user_id', res.user_id);
        alert('Login exitoso');
        this.router.navigate(['/home']);
      },
      error: () => {
        alert('Correo o contraseña incorrecta');
      }
    });
  }

  irARegistro() {
    this.router.navigate(['/dashboard']); // ✅ NO /home

  }
}
