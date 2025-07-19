import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'comentarios',
    loadChildren: () => import('./comentarios/comentarios.module').then(m => m.ComentariosPageModule)
  },
  {
    path: 'comentarios/:id',
    loadChildren: () => import('./comentarios/comentarios.module').then(m => m.ComentariosPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'todas-recetas',
    loadChildren: () => import('./todas-recetas/todas-recetas.module').then( m => m.TodasRecetasPageModule)
  },
  {
    path: 'mis-favoritos',
    loadChildren: () => import('./mis-favoritos/mis-favoritos.module').then( m => m.MisFavoritosPageModule)
  },
  {
  path: 'todas-recetas',
  loadChildren: () => import('./todas-recetas/todas-recetas.module').then(m => m.TodasRecetasPageModule)
}

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
