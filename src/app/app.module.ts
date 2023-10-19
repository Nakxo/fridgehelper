import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { SubComponent } from './sub/sub.component';
import { FrigoComponent } from './frigo/frigo.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MatTableModule } from '@angular/material/table';
import { ConvertToHigherUnitPipe } from './pipe/convert-to-higher-unit.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListeRecettesComponent } from './liste-recettes/liste-recettes.component';
import { RecetteComponent } from './recette/recette.component';
import { ListeCourseComponent } from './liste-course/liste-course.component';
import { OrderByPipe } from './pipe/shared/order-by.pipe';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { AjoutRecetteComponent } from './ajout-recette/ajout-recette.component';
import { GestionProduitComponent } from './gestion-produit/gestion-produit.component';
import { ListeProduitsComponent } from './liste-produits/liste-produits.component';
import { FilterTypePipe } from './pipe/filter-type.pipe';
import { FilterTextPipe } from './pipe/filter-text.pipe';
import { GestionRecetteComponent } from './gestion-recette/gestion-recette.component';
import { CreationRecetteComponent } from './creation-recette/creation-recette.component';
import { RecetteDetailsComponent } from './recette-details/recette-details.component';
import { DifficultePipe } from './pipe/difficulte.pipe';
import { GestionCompteComponent } from './gestion-compte/gestion-compte.component';
import { RecettesAvecProduitsFrigoComponent } from './recettes-avec-produits-frigo/recettes-avec-produits-frigo.component';
import { BurgerMenuComponent } from './burger-menu/burger-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NotAuthorizedComponent,
    NavbarComponent,
    SubComponent,
    FrigoComponent,
    ConvertToHigherUnitPipe,
    ListeRecettesComponent,
    RecetteComponent,
    ListeCourseComponent,
    OrderByPipe,
    AjoutProduitComponent,
    AjoutRecetteComponent,
    GestionProduitComponent,
    ListeProduitsComponent,
    FilterTypePipe,
    FilterTextPipe,
    GestionRecetteComponent,
    CreationRecetteComponent,
    RecetteDetailsComponent,
    DifficultePipe,
    GestionCompteComponent,
    RecettesAvecProduitsFrigoComponent,
    BurgerMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxPageScrollModule
  ],
  providers: [
    AuthService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
