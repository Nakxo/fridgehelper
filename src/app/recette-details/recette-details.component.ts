import { Recette } from './../models/recette.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { of } from 'rxjs';
import { FrigoService } from '../services/frigo.service';

@Component({
  selector: 'app-recette-details',
  templateUrl: './recette-details.component.html',
  styleUrls: ['./recette-details.component.scss']
})
export class RecetteDetailsComponent implements OnInit {
  selectedTypeProduit: any;
errorMessage: string | null = null;
recetteId: number = 0;
recette: any;
allProducts: any[] = [];
typesProduits: any;
selectedProduct: any;
  produits: any;
  unitesDeMesure: any;
  selectedUnit: any;
  produit: any;
  produitNom: any;
  produitId:any;
  quantite: any;
  poids: number | null = null;
constructor(
  private route: ActivatedRoute,
  private recetteService: RecetteService,
  private frigoService: FrigoService
) {}

ngOnInit() {
  this.loadRecette();
  this.frigoService.getTypeProduits().subscribe(data => {
    this.typesProduits = data;
  });
}

onTypeProduitSelected(event: any) {
  const typeId = event.target.value;
  this.frigoService.getProduitsParIdType(typeId).subscribe((produits: any[""]) => {

    this.produits = produits;

    this.selectedProduct = this.produits[0];



    this.selectedUnit = this.unitesDeMesure[0];



  });
}

onProduitSelected(event: any){
  const produitId = event.target.value;
  this.frigoService.getProduitById(produitId).subscribe((produit: any) => {
    this.produit = produit;
    this.produitNom = produit.nom;
    this.produitId = produitId;
  });
}



loadRecette(): void {
  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    const id = +idParam;
    this.recetteService.getRecetteById(id).subscribe(data => {
      this.recette = data;

      if (this.recette.etapes) {
        this.recette.etapes.sort((a: { numeroEtape: number; }, b: { numeroEtape: number; }) => a.numeroEtape - b.numeroEtape);
      }
    });
  } else {
    console.error('ID de recette non fourni');
  }
}

updateRecetteDetails(): void {
  if (this.recette) {
    if (this.recette.nom.length > 255) {
      this.errorMessage = "Le nom de la recette ne doit pas dépasser 255 caractères.";
      return;
    }

    if (this.recette.description.length > 255) {
      this.errorMessage = "La description de la recette ne doit pas dépasser 255 caractères.";
      return;
    }

    if (this.recette.image.length > 255) {
      this.errorMessage = "L'URL de l'image ne doit pas dépasser 255 caractères.";
      return;
    }

    this.recetteService.updateRecette(this.recette.idRecette, {
      nom: this.recette.nom,
      description: this.recette.description,
      image: this.recette.image,
      difficulte: this.recette.difficulte,
      duree: this.recette.duree,
      cmbPersonne: this.recette.cmbPersonne
    }).subscribe(
      updatedRecette => {
        this.recette = updatedRecette;
        this.errorMessage = null;  // Réinitialisation du message d'erreur
      },
      error => {
        console.error('Erreur lors de la mise à jour de la recette:', error);
        this.errorMessage = "Erreur lors de la mise à jour de la recette.";
      }
    );
  }
}

deleteEtape(index: number): void {
  if (this.recette) {
    const etapeId = this.recette.etapes[index].idEtape;

    if (etapeId) {
      this.recetteService.deleteEtape(this.recette.idRecette, etapeId).subscribe(response => {
        this.recette.etapes.splice(index, 1);
        // Réorganise les numéros d'étapes
        this.reorganizeStepNumbers();
      });
    } else {
      this.recette.etapes.splice(index, 1);
      // Réorganise les numéros d'étapes
      this.reorganizeStepNumbers();
    }
  }
}

reorganizeStepNumbers(): void {
  // Réassigne les numéros d'étapes pour qu'ils soient consécutifs
  for (let i = 0; i < this.recette.etapes.length; i++) {
    this.recette.etapes[i].numeroEtape = i + 1;
  }
}


addEtape(): void {
  if (this.recette) {
    // Détermine le numéro de la dernière étape
    const lastStepNumber = this.recette.etapes.length > 0 ?
                            this.recette.etapes[this.recette.etapes.length - 1].numeroEtape : 0;

    // Crée une nouvelle étape avec un numéro incrémenté
    const newEtape = {
      numeroEtape: lastStepNumber + 1,
      etape: '' // vide ou toute autre valeur initiale que tu souhaites
    };

    this.recette.etapes.push(newEtape);
  }
}

onSubmitEtapes(): void {
  if (this.recette) {
    this.recetteService.addEtapesToRecette(this.recette.idRecette, this.recette.etapes).subscribe(updatedRecette => {
      this.loadRecette();
    });
  }
}

addProduit(): void {
  if (this.recette) {
    const newProduit = {
    };
    this.recette.produitRecette.push(newProduit);
  }
}

onSubmitProduits(): void {
  if (this.recette) {
    this.recetteService.addProduitsToRecette(this.recette.idRecette, this.recette.produitRecette).subscribe(updatedRecette => {
      this.loadRecette();
    });
  }
}

deleteProduit(index: number): void {
  if (this.recette) {
    const produitRecetteId = this.recette.produitRecette[index].idProduitRecette;
    if (produitRecetteId) {
      this.recetteService.deleteProduitRecette(this.recette.idRecette, produitRecetteId).subscribe(
        response => {
          this.recette?.produitRecette.splice(index, 1);
          this.loadRecette();
        },
        error => {
          console.error('Erreur lors de la suppression du produitRecette :', error);
        }
      );
    } else {
      this.recette?.produitRecette.splice(index, 1);
    }
  }
}

addProduitRecette(): void {
  if (this.recette && this.produitId && (this.quantite || this.poids !== null)) {
    const newProduitRecette: any = {
      produit: {
        id: this.produitId,
      },
      recette: {
        idRecette: this.recette.idRecette
      }
    };

    if (this.quantite) {
      newProduitRecette.quantite = this.quantite;
    }

    if (this.poids !== null) {
      newProduitRecette.poids = this.poids;
    }

    this.recetteService.addProduitRecette(this.recette.idRecette, newProduitRecette).subscribe(response => {
      this.loadRecette();
    });

    // Réinitialisation des champs
    this.quantite = undefined;
    this.poids = null;
    this.produitId = undefined;
  }
}

}
