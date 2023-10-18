import { Component, OnInit } from '@angular/core';
import { FrigoService } from '../services/frigo.service';
import { RecetteService } from '../services/recette.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recettes-avec-produits-frigo',
  templateUrl: './recettes-avec-produits-frigo.component.html',
  styleUrls: ['./recettes-avec-produits-frigo.component.scss']
})
export class RecettesAvecProduitsFrigoComponent implements OnInit {

  constructor(
    private frigoService: FrigoService,
    private recetteService: RecetteService,
    private authService: AuthService
    ) { }

  frigos: any[] = [];
  recettesAvecProduitsFrigo: any[] = [];
  ngOnInit() {
    const utilisateurIdFrigo = this.authService.getUserId();

    this.frigoService.getFrigoByUtilisateurId(utilisateurIdFrigo).subscribe((data: any) => {
      this.frigos = data;
      const produitsFrigoIds = this.frigos.map(f => f.produit.id);
      this.recetteService.getRecettesByProduitsInFrigo(produitsFrigoIds).subscribe((recettes: any[]) => {
        this.recettesAvecProduitsFrigo = recettes;
      });
    });

  }

}
