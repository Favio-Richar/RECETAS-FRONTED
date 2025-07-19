import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: false
})
export class AppComponent {
  logueado = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const user_id = localStorage.getItem('user_id');
    this.logueado = !!user_id;
  }

  cerrarSesion() {
    localStorage.clear();
    this.logueado = false;
    this.router.navigate(['/login']);
  }
}
