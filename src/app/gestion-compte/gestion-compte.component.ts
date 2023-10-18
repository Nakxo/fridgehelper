import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../models/utilisateur.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UtilisateurUpdate } from '../models/utilisateur-update.model';

@Component({
  selector: 'app-gestion-compte',
  templateUrl: './gestion-compte.component.html',
  styleUrls: ['./gestion-compte.component.scss']
})
export class GestionCompteComponent implements OnInit {
  utilisateurId?: any;
  user: Utilisateur = new Utilisateur();
  oldPassword: string = '';
  confirmPassword: string = '';
  errorMessage?: string;
  newPassword: any;
  successMessage?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utilisateurService: UtilisateurService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
        this.utilisateurId = userId;
        this.loadUserData(this.utilisateurId);
    } else {
        this.handleError();
    }
  }

  private loadUserData(id: number): void {
    this.utilisateurService.getUtilisateurById(id).subscribe(
      (data: Utilisateur) => {
        this.user = data;
      },
      (error) => {
        console.error('Erreur de chargement des données utilisateur', error);
        this.handleError();
      }
    );
  }

  private handleError(): void {
    console.error('L\'ID utilisateur n\'est pas disponible ou invalide.');
    this.router.navigate(['/error-page']);
  }

  onSubmitInfo(): void {
    if(!this.validateUserData()) {
      this.errorMessage = "Les données utilisateur ne sont pas valides.";
      return;
    }

    // Création d'un objet avec seulement les champs autorisés à être mis à jour
    const updatedUserInfo: UtilisateurUpdate = {
      email: this.user.email,
      nom: this.user.nom,
      prenom: this.user.prenom,
      tel: this.user.tel
    };

    // Envoi du nouvel objet lors de la mise à jour des informations utilisateur
    this.utilisateurService.updateUserInfo(this.utilisateurId!, updatedUserInfo).subscribe(
      response => {
        this.successMessage = 'Les informations de l\'utilisateur ont été mises à jour avec succès.';
        setTimeout(() => {
          this.successMessage = undefined;
        }, 5000);
        this.errorMessage = undefined;
        //console.log('Utilisateur mis à jour :', response);
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        this.errorMessage = 'Erreur lors de la mise à jour de l\'utilisateur. Veuillez réessayer.';
      }
    );
  }

  onSubmitPassword(): void {
    if (!this.passwordsValid()) {
      this.errorMessage = "Les mots de passe ne correspondent pas ou sont invalides.";
      return;
    }

    const passwordPayload = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };

    this.utilisateurService.updateUserPassword(this.utilisateurId!, passwordPayload).subscribe(
      response => {
        this.successMessage = 'Le mot de passe a été changé avec succès.';
        setTimeout(() => {
          this.successMessage = undefined;
        }, 5000);
        this.errorMessage = undefined;
        //console.log('Mot de passe mis à jour :', response);
        this.newPassword = '';
        this.confirmPassword = '';
        this.oldPassword = '';
      },
      error => {
        console.error('Erreur lors de la mise à jour du mot de passe :', error);
        this.errorMessage = 'Erreur lors de la mise à jour du mot de passe. Veuillez réessayer.';
      }
    );
  }

  validateUserData(): boolean {
    // Validation de base, ajouter plus si nécessaire
    return this.user.nom.length > 0 && this.user.prenom.length > 0 && this.user.email.includes('@');
  }

  passwordsValid(): boolean {
    return this.newPassword === this.confirmPassword && this.newPassword.length >= 6;
  }
}
