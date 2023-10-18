import { Recette } from '../models/recette.model';
import { RecetteService } from './../services/recette.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-recette',
  templateUrl: './gestion-recette.component.html',
  styleUrls: ['./gestion-recette.component.scss']
})
export class GestionRecetteComponent implements OnInit {

  recettes: Recette[] = [];

  constructor(private recetteService: RecetteService) { }

  ngOnInit(): void {
    this.fetchRecettes();
  }

  fetchRecettes(): void {
    this.recetteService.getRecettes().subscribe(
      (recettes) => {
        this.recettes = recettes;
      },
      (error) => {
        console.error('Erreur lors de la récupération des recettes:', error);
        alert('Une erreur est survenue lors de la récupération des recettes.');
      }
    );
  }

  onDelete(id: number): void {
    const isConfirmed = confirm('Êtes-vous sûr de vouloir supprimer cette recette ?');

    if (isConfirmed) {
      this.recetteService.deleteRecette(id).subscribe(
        () => {
          this.fetchRecettes();  // Re-fetch the list after deletion
        },
        (error) => {
          console.error('Erreur lors de la suppression de la recette:', error);
          alert('Une erreur est survenue lors de la suppression de la recette.');
        }
      );
    }
  }

  currentRecette: Recette | null = null;

onAddOrUpdateRecette(): void {
    if (this.currentRecette) {

        this.recetteService.updateRecette(this.currentRecette.idRecette as number, this.currentRecette).subscribe(
            () => {
                this.fetchRecettes();
                this.currentRecette = null;
            },
            error => {
                console.error('Erreur lors de la mise à jour de la recette:', error);
                alert('Une erreur est survenue lors de la mise à jour de la recette.');
            }
        );
    } else {
        this.recetteService.createRecette(this.currentRecette).subscribe(
            () => {
                this.fetchRecettes();
                this.currentRecette = null;
            },
            error => {
                console.error('Erreur lors de la création de la recette:', error);
                alert('Une erreur est survenue lors de la création de la recette.');
            }
        );
    }
}

onSelectRecette(recette: Recette): void {
    this.currentRecette = { ...recette };
}

onNewRecette(): void {
    this.currentRecette = new Recette();
}

}
