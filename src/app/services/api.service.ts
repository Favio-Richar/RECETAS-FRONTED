import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private API = 'http://localhost:8000'; // URL base del backend

  constructor(private http: HttpClient) {}

  login(correo: string, clave: string): Observable<any> {
    return this.http.post(`${this.API}/login`, { correo, clave });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.API}/register`, data);
  }

  getRecetas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/recetas`);
  }

  crearReceta(data: any): Observable<any> {
    return this.http.post(`${this.API}/recetas`, data);
  }

  getComentarios(receta_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/comentarios/${receta_id}`);
  }

  comentar(data: any): Observable<any> {
    return this.http.post(`${this.API}/comentarios`, data);
  }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/usuarios`);
  }

  agregarFavorito(favorito: any): Observable<any> {
    return this.http.post(`${this.API}/favoritos/`, favorito);
  }

  getFavoritosUsuario(user_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/favoritos/usuario/${user_id}`);
  }

  getEstadisticas(): Observable<any> {
    return this.http.get(`${this.API}/estadisticas`);
  }
}
