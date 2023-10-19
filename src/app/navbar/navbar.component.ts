import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BurgerMenuComponent } from '../burger-menu/burger-menu.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$?: Observable<boolean>;
  nomUtilisateur: string = '';
  prenomUtilisateur: string= '';
  utilisateurRole: string='';
  utilisateurId: any;

  @ViewChild(BurgerMenuComponent)
  private burgerMenu!: BurgerMenuComponent;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.nomUtilisateur = this.authService.getNomUtilisateur();
    this.prenomUtilisateur = this.authService.getPrenomUtilisateur();
    this.utilisateurRole = this.authService.getRole();
    const userId = this.authService.getUserId();
    if (userId) {
        this.utilisateurId = userId;
    } else {
        this.handleError();
    }

  }
  onLogoutClick(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private handleError(): void {
    console.error('L\'ID utilisateur n\'est pas disponible ou invalide.');
    this.router.navigate(['/error-page']);
  }

  toggleNavbar(){
    this.burgerMenu.toggleMenu();
  }

}
