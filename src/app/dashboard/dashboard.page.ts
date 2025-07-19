import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage {
  usuario: string = '';

  constructor() {
    const user_id = localStorage.getItem('user_id');
    this.usuario = user_id ? `ID: ${user_id}` : 'Invitado';
  }
}
