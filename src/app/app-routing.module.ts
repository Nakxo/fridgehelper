import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { FrigoComponent } from './frigo/frigo.component';
import { SubComponent } from './sub/sub.component';
import { ListeRecettesComponent } from './liste-recettes/liste-recettes.component';
import { RecetteComponent } from './recette/recette.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { GestionProduitComponent } from './gestion-produit/gestion-produit.component';
import { ListeProduitsComponent } from './liste-produits/liste-produits.component';
import { GestionRecetteComponent } from './gestion-recette/gestion-recette.component';
import { CreationRecetteComponent } from './creation-recette/creation-recette.component';
import { RecetteDetailsComponent } from './recette-details/recette-details.component';
import { GestionCompteComponent } from './gestion-compte/gestion-compte.component';
import { RecettesAvecProduitsFrigoComponent } from './recettes-avec-produits-frigo/recettes-avec-produits-frigo.component';

const routes: Routes = [
  { path : '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    data: { role: 'Utilisateur'}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent
  },
  {
    path: 'frigo',
    component: FrigoComponent, canActivate: [AuthGuardService]
  },
  {
    path : 'sub',
    component: SubComponent
  },
  {
    path: 'liste-recettes',
    component: ListeRecettesComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'recette/:id', component: RecetteComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'gestion-produit', component: GestionProduitComponent, canActivate: [AuthGuardService], data: {role: 'Administrateur'}
  },
  {
    path: 'ajout-produit', component: AjoutProduitComponent, canActivate: [AuthGuardService], data: {role: 'Administrateur'}
  },
  {
    path: 'liste-produits', component: ListeProduitsComponent, canActivate: [AuthGuardService], data: {role: 'Administrateur'}
  },
  {
    path: 'gestion-recette', component: GestionRecetteComponent, canActivate: [AuthGuardService], data: {role: 'Administrateur'}
  },
  {
    path: 'creation-recette', component: CreationRecetteComponent, canActivate: [AuthGuardService], data: {role: 'Administrateur'}
  },
  {
    path: 'recette-details/:id', component: RecetteDetailsComponent, canActivate: [AuthGuardService], data: {role: 'Administrateur'}
  },
  {
    path : 'gestion-compte/:id', component: GestionCompteComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'recette-avec-produits-frigo', component: RecettesAvecProduitsFrigoComponent, canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
