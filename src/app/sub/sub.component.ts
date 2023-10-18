import { Component, OnInit, Renderer2 } from '@angular/core';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../models/utilisateur.model';
import { Router } from '@angular/router';


declare var $: any;

@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.scss']
})



export class SubComponent {
  user: Utilisateur = new Utilisateur();
  confirmPassword: string = '';
  errorMessage?: string;

  constructor(private utilisateurService: UtilisateurService, private router: Router) { }

  onSubmit(): void {
    this.utilisateurService.createUser(this.user).subscribe(
      response => {
        // Traitement en cas de succès
        console.log('Utilisateur enregistré :', response);

        // Réinitialiser les champs du formulaire
        this.user = new Utilisateur();
        this.showSuccessModal();
      },
      error => {
        // Traitement en cas d'erreur
        console.error('Erreur lors de l\'inscription :', error);
        this.errorMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
      }
    );
  }

  passwordsMatch(): boolean {
    return this.user.mdp === this.confirmPassword;
  }

  ngAfterViewInit(): void {
    this.initModal();
  }

  initModal(): void {
    $('#successModal').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  showSuccessModal(): void {
    $('#successModal').modal('show');
  }

  redirectToLogin(): void {
    $('#successModal').modal('hide');
    $('#successModal').on('hidden.bs.modal', () => {
        this.router.navigate(['/login']);
    });
}
}
