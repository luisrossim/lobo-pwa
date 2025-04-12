import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { NovaContagemComponent } from './pages/nova-contagem/nova-contagem.component';
import { novaContagemGuard } from './core/guards/nova-contagem.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
      path: '',
      canActivate: [authGuard],
      children: [
        { 
          path: 'estoque', 
          component: EstoqueComponent, 
          data: { animation: 'Estoque' } 
        },
        { 
          path: 'estoque/contagem', 
          canActivate: [novaContagemGuard], 
          component: NovaContagemComponent, 
          data: { animation: 'Contagem' } 
        },
        { 
          path: 'dashboard', 
          component: HomeComponent, 
          data: { animation: 'Dashboard' } 
        }
      ]
    },
    { path: 'notfound', component: NotFoundComponent },
    { path: '**', redirectTo: 'notfound', pathMatch: 'full' },
];
