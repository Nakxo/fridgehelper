import { ProduitCustom } from './../models/produitCustom.model';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ListeCourseService } from '../services/liste-course.service';
import { FrigoService } from '../services/frigo.service';
import { ProduitCustomService } from '../services/produit-custom.service';

@Component({
  selector: 'app-liste-course',
  templateUrl: './liste-course.component.html',
  styleUrls: ['./liste-course.component.scss']
})
export class ListeCourseComponent implements OnInit {

  listeCourses: any[] = []; // Liste de courses
  userId: any;
  selectedUnit: any;
  frigos: any[] = [];
  produitsCustom: any[] = [];
  showList: boolean = false;
  allProduits: any[] = [];
  showListeCourses: boolean = false;
  produitsListeCourse: any;

  constructor(
    private listeCourseService: ListeCourseService,
    private authService: AuthService,
    private frigoService: FrigoService,
    private produitCustomService: ProduitCustomService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.userId = userId;

    this.listeCourseService.getListeCourseByIdUtilisateur(userId).subscribe((data: any) => {
      this.listeCourses = data;
      console.log('Liste des courses récupérées:', data);
      this.tryMergeProductLists();
    });

    this.produitCustomService.getAllProduitCustomByIdUtilisateur(userId).subscribe((data: any) => {
      console.log('Produits personnalisés récupérés:', data);
      // Filtrer ici pour n'inclure que ceux avec isInListeCourse = true
      this.produitsCustom = data.filter((produit: { isInListeCourse: boolean }) => produit.isInListeCourse);
      this.produitsCustom.forEach((produitCustom: any) => {
        produitCustom.isProduitDuFrigo = false;
      });
      this.tryMergeProductLists();
    });
  }

  tryMergeProductLists(): void {
    if (this.produitsCustom && this.listeCourses) {
      console.log('Fusion des listes de produits...');
      this.allProduits = [
        ...this.listeCourses.map(item => ({
          ...item,
          origin: 'listeCourses'  // Ajout d'un champ pour distinguer l'origine
        })),
        ...this.produitsCustom.map(item => ({
          ...item,
          origin: 'produitsCustom' // Ajout d'un champ pour distinguer l'origine
        }))
      ];
      console.log('Liste de produits fusionnée:', this.allProduits);
    } else {
      console.log('Les données ne sont pas encore prêtes pour la fusion.');
    }
  }

  toggleBarrerProduit(produit: any) {
    produit.barre = !produit.barre;
  }

  barrerProduit(produit: any, isListeCourse: boolean) {
    if (isListeCourse) {
      this.produitsListeCourse.forEach((item: { barre: boolean; }) => {
        if (item === produit) {
          item.barre = !item.barre;
        }
      });
    } else {
      this.produitsCustom.forEach(item => {
        if (item === produit) {
          item.barre = !item.barre;
        }
      });
    }
  }

  supprimerProduitCustom(item: any){
    if (this.authService.isLoggedIn()){
      const utilisateurId = this.authService.getUserId();

      if(utilisateurId){
        this.produitCustomService.deleteProduitCustom(item.id).subscribe(
          () => {
            console.log('Produit supprimé avec sccuès de la liste course');

            window.location.reload();
          },
          (error: any) => {
            console.error('Erreur lors de la suppression du produit de la liste de courses:', error);
          }
        )
      }
    }
  }

  supprimerProduitDeListe(item: any) {
    // Vérifier si l'utilisateur est authentifié (vous pouvez utiliser votre propre logique ici)
    if (this.authService.isLoggedIn()) {
      const utilisateurId = this.authService.getUserId();

      if (utilisateurId) {
        this.listeCourseService.deleteListeCourseProduitByUtilisateurIdAndProduitId(utilisateurId, item.produit.id).subscribe(
          () => {
            console.log('Produit supprimé avec succès de la liste de courses');

            // Actualiser la page
            window.location.reload();
          },
          (error: any) => {
            console.error('Erreur lors de la suppression du produit de la liste de courses :', error);
          }
        );
      } else {
        console.error('Erreur : L\'ID utilisateur est manquant ou invalide.');
      }
    } else {
      console.warn('L\'utilisateur doit être connecté pour supprimer un produit.');
    }
  }

  ajouterAuFrigo() {
    const produitsBarres = this.allProduits.filter(item => item.barre);
    produitsBarres.forEach(produitBarre => {
      // Vérification si l'utilisateur est authentifié
      if (this.authService.isLoggedIn()) {
        const utilisateurId = this.authService.getUserId(); // Récupérer l'ID utilisateur

        if (utilisateurId) {
          let frigoRequest;

          if (produitBarre.origin === 'listeCourses') {
            // Le produit provient de la liste de courses
            frigoRequest = {
              utilisateur: {
                idUtilisateur: utilisateurId
              },
              produit: {
                id: produitBarre.produit.id
              },
              quantite: produitBarre.quantite, // Assurez-vous que cela renvoie la bonne quantité
              poidsReel: produitBarre.poids // Assurez-vous que cela renvoie le poids réel
            };

            console.log("FRIGOREQUEST ", frigoRequest);

            // Étape 1 : Ajouter le produit au frigo
            this.frigoService.ajouterProduitAuFrigo(frigoRequest).subscribe(
              (frigoResponse) => {
                console.log('Produit ajouté avec succès au frigo!', frigoResponse);

                // Étape 2 : Supprimer le produit de la liste de courses après l'ajout au frigo
                this.listeCourseService.deleteListeCourseProduitByUtilisateurIdAndProduitId(utilisateurId, produitBarre.produit.id).subscribe(
                  () => {
                    console.log('Produit supprimé avec succès de la liste de courses');
                    // Supprimer le produit de this.allProduits
                    this.allProduits = this.allProduits.filter(item => item !== produitBarre);
                    // this.refreshListeCourses(); // Rafraîchir la liste de courses ici
                  },
                  (deleteError) => {
                    console.error('Erreur lors de la suppression du produit de la liste de courses:', deleteError);
                    // Gérer l'erreur de suppression, par exemple, en affichant un message d'erreur à l'utilisateur
                  }
                );
              },
              (frigoError) => {
                console.error('Erreur lors de l\'ajout du produit au frigo:', frigoError);
                // Gérer l'erreur d'ajout au frigo, par exemple, en affichant un message d'erreur à l'utilisateur
              }
            );
          } else if (produitBarre.origin === 'produitsCustom') {
            this.produitCustomService.updateProduitCustomById(produitBarre.id, false).subscribe(
              () => {
                console.log('Produit custom barré mis à jour avec succès');
                this.refreshListeCourses(); // Rafraîchir la liste de courses ici
              },
              (updateError) => {
                console.error('Erreur lors de la mise à jour du produit custom barré :', updateError);
              }
            );

          }
        } else {
          console.error('Erreur: L\'ID utilisateur est manquant ou invalide.');
        }
      } else {
        console.warn('L\'utilisateur doit être connecté pour ajouter un produit.');
      }
    });
  }

  refreshListeCourses() {
    const userId = this.authService.getUserId();
    this.listeCourseService.getListeCourseByIdUtilisateur(userId).subscribe((data: any) => {
      this.listeCourses = data;
      console.log('Liste des courses récupérées:', data);
      this.tryMergeProductLists();
    });
  }

}

