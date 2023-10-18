import { AuthService } from './../services/auth.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FrigoService } from '../services/frigo.service';
import { UtilisateurService } from '../services/utilisateur.service';
import { Token } from '@angular/compiler';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListeCourseComponent } from '../liste-course/liste-course.component';
import { ListeCourseService } from '../services/liste-course.service';
import { ProduitCustomService } from '../services/produit-custom.service';
import { ProduitCustom } from '../models/produitCustom.model';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

declare var $: any;




@Component({
  selector: 'app-frigo',
  templateUrl: './frigo.component.html',
  styleUrls: ['./frigo.component.scss']
})
export class FrigoComponent implements OnInit {
  typesProduits: any[] = [];
  produits: any[''];
  produit: any[''];
  produitCustom: any[''];
  userId: number = 0;
  quantite: any;
  poidsReel: any;
  produitId: number = 0;
  uniteDeMesure: string = '';
  unitesDeMesure: string[] = [];

  selectedProduct: any;
  selectedUnit: string = '';
  quantiteFinale: any;
  utilisateurId: any;
  public frigos: any[] = [];
  showQuantityAndEstimatedWeight: boolean = true;
  poidsEstime:any;
  isProductSelected: boolean = false;
  produitNom: any;
  poidsModal: any;
  editModal: any;
  frigo: any;
  listeCourses: any;
  isListeCourseOpen: any;

  allProduits: any[] = [];

  nouveauProduitCustom = {
    typeProduitCustom: '',
    nomCustom: '',
    quantiteCustom: 0,
    poidsCustom: 0,
    uniteDeMesureCustom: 'gr'
  };
  typeProduitCustom: any;

  quantiteCustom: any;
  poidsCustom: any;
  selectedCustomProduct: any; // Pour stocker le produit personnalisé sélectionné
  customQuantite: number = 0; // Pour stocker la quantité mise à jour
  customPoids: any; // Pour stocker le poids réel mis à jour
  customUniteDeMesure: any;
  customNom: any;
  customTypes: string[] = ["Viande", "Légume", "Poisson", "Oeuf", "Lait", "Huile", "Autre"];
  customUnitesDeMesure: string[] = ["gr", "Kg", "ml", "cl"];
  selectedCustomType: string ='';


  constructor(
    private frigoService : FrigoService,
    private utilisateurService : UtilisateurService,
    private produitCustomService: ProduitCustomService,
    private authService: AuthService,
    private modalService: NgbModal,
    private listeCourseService: ListeCourseService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const utilisateurIdFrigo = this.authService.getUserId();

    // Récupération des types de produits
    this.frigoService.getTypeProduits().subscribe((types: any['']) => {
      this.typesProduits = types;
    });

    // Récupération des produits du frigo
    this.frigoService.getFrigoByUtilisateurId(utilisateurIdFrigo).subscribe((data: any) => {
      this.frigos = data;

      // Ajouter l'attribut isProduitDuFrigo: true à chaque élément du tableau
      this.frigos.forEach((produit) => {
        produit.isProduitDuFrigo = true;
      });

      // Fusionner avec les produits custom après que les produits du frigo soient récupérés
      this.mergeProductLists();
    });

    // Récupération des produits custom
  this.produitCustomService.getAllProduitCustomByIdUtilisateur(utilisateurIdFrigo).subscribe((data: any) => {
  this.produitCustom = data.filter((produit: { isInListeCourse: any; }) => !produit.isInListeCourse); // Filtrer ceux qui ne sont pas dans la liste de courses.
  this.produitCustom.forEach((produitCustom: any) => {
    produitCustom.isProduitDuFrigo = false;
  });

      // Fusionner avec les produits du frigo après que les produits custom soient récupérés
      this.mergeProductLists();
    });

}

mergeProductLists(): void {
  if (this.frigos && this.produitCustom) {
      this.allProduits = [
          ...this.frigos.map(p => ({
              ...p,
              ...p.produit,
              ...p.produit.typeProduit
          })),
          ...this.produitCustom.filter((produit: { isInListeCourse: any; }) => !produit.isInListeCourse) // Assure-toi que seuls les produits qui ne sont pas dans la liste de courses sont inclus.
      ];
  }
}

ajouterProduit() {
    // Assurez-vous que l'utilisateur est authentifié
    if (this.authService.isLoggedIn()) {
      const utilisateurId = this.authService.getUserId(); // Récupérer l'ID utilisateur

      // Vérifiez si l'utilisateurId n'est pas null ou undefined
      if (utilisateurId) {
        // Convertir le poids réel en grammes ou millilitres en fonction de l'unité de mesure choisie
        let poidsReelEnGrammes = this.poidsReel;
        if (this.selectedUnit === 'Kg') {
          poidsReelEnGrammes *= 1000;
        } else if (this.selectedUnit === 'L') {
          poidsReelEnGrammes *= 1000;
        }

        this.poidsModal = poidsReelEnGrammes

        const frigoRequest = {
          utilisateur: {
            idUtilisateur: utilisateurId
          },
          produit: {
            id: this.produitId
          },
          quantite: this.quantite,
          poidsReel: poidsReelEnGrammes
        };

        this.frigoService.ajouterProduitAuFrigo(frigoRequest)
        .subscribe(
          data => {
            console.log('Produit ajouté avec succès!', data);
            console.log('selectedProduct', this.selectedProduct.typeProduit.uniteDeMesure)

            const nouveauProduit = {
              produit: {
                id: this.produitId,
                nom: this.selectedProduct.nom,
                typeProduit: {
                  uniteDeMesure: this.selectedUnit
                }
              },
              quantite: this.quantite,
              poidsReel: poidsReelEnGrammes
            };

            this.frigos.push(nouveauProduit); // Ajoute le nouveau produit à frigos

            this.selectedProduct = this.produits.find((product: any) => product.id === this.produitId);
            //this.selectedUnit = this.selectedProduct.typeProduit.uniteDeMesure;


            // Réinitialisez les champs après l'ajout
            this.produitId = 0;
            this.quantite = null;
            this.poidsReel = null;
            this.selectedUnit = this.unitesDeMesure[0];


            this.showSuccessModal();

            setTimeout(() => { // Fermer la modal après 3 secondes
              window.location.reload(); // Rafraîchir la page
            }, 1800);


          },
          error => {
            console.error('Erreur lors de l\'ajout du produit:', error);
            this.showErrorModal();
          }
        );
      } else {
        console.error('Erreur: L\'ID utilisateur est manquant ou invalide.');
      }
    } else {
      console.warn('L\'utilisateur doit être connecté pour ajouter un produit.');
    }
  }

  ajouterProduitListeCourse() {

    if (this.authService.isLoggedIn()) {
      const utilisateurId = this.authService.getUserId(); // Récupérer l'ID utilisateur
      console.log("utilisateurID liste de course: ", utilisateurId);

      // Vérifier si l'utilisateurId n'est pas null ou undefined
      if (utilisateurId) {

        let poidsReelEnGrammes = this.poidsReel;
        if (this.selectedUnit === 'Kg') {
          poidsReelEnGrammes *= 1000;
        } else if (this.selectedUnit === 'L') {
          poidsReelEnGrammes *= 1000;
        }


        const listeCourseRequest = {
          utilisateur: {
            idUtilisateur: utilisateurId
          },
          produit: {
            id: this.produitId
          },
          quantite: this.quantite,
          poids: poidsReelEnGrammes
        };

        console.log("listeCourseRequest : ", listeCourseRequest);

        this.listeCourseService.ajouterProduitListeCourse(listeCourseRequest)
          .subscribe(
            data => {
              console.log('Produit ajouté à la liste de courses avec succès!', data);
              console.log("Je suis entré dns le sub : ", data)

              const nouveauProduit = {
                produit: {
                  id: this.produitId,
                  nom: this.selectedProduct.nom,
                  typeProduit: {
                    uniteDeMesure: this.selectedUnit
                  }
                },
                quantite: this.quantite,
                poids: poidsReelEnGrammes
              };
              console.log(nouveauProduit);
           //   this.listeCourses.push(nouveauProduit); // Ajoute le nouveau produit à la liste de courses

              // Réinitialisez les champs après l'ajout
              this.produitId = 0;
              this.quantite = null;
              this.poidsReel = null;
              this.selectedUnit = this.unitesDeMesure[0];

              console.log("nouveau produit:", nouveauProduit)
              this.showSuccessModal();

              setTimeout(() => { // Fermer la modal après 3 secondes
                window.location.reload(); // Rafraîchir la page
              }, 1800);
            },
            (error: any) => {
              console.error("Erreur lors de l'ajout du produit à la liste de courses:", error);

              this.showErrorModal();
            }
          );
      } else {
        console.error("Erreur: L'ID utilisateur est manquant ou invalide.");
      }
    } else {
      console.warn("L'utilisateur doit être connecté pour ajouter un produit à la liste de courses.");
    }
  }

  showSuccessModal(): void {
    $('#successModal').modal('show');
  }

  calculateEstimatedWeight(): number | null {
    if (this.produit.possedePoidsEstime) {
      return this.quantite * this.produit.poidsEstime;
    }
    return null;
  }



onTypeProduitSelected(event: any) {
  const typeId = event.target.value;
  this.frigoService.getProduitsParIdType(typeId).subscribe((produits: any[""]) => {

    this.produits = produits;

    this.selectedProduct = this.produits[0];


    // Vérifier l'unité de mesure et définir les options de sélection
    if (this.selectedProduct.typeProduit.uniteDeMesure === 'gr') {
      this.unitesDeMesure = ['gr', 'Kg'];
    } else if (this.selectedProduct.typeProduit.uniteDeMesure === 'ml') {
      this.unitesDeMesure = ['ml', 'L'];
    }

    // Définir l'unité de mesure sélectionnée comme la première option
    this.selectedUnit = this.unitesDeMesure[0];

      // Vérifier si le type de produit possède un poids estimé
  if (this.selectedProduct.typeProduit.possedePoidsEstime) {
    this.showQuantityAndEstimatedWeight = true;
  } else {
    this.showQuantityAndEstimatedWeight = false;
    this.quantite = null;
    this.selectedProduct.poidsEstime = null;
  }

  });
}

onProduitSelected(event: any){
  const produitId = event.target.value;
  this.frigoService.getProduitById(produitId).subscribe((produit: any) => {
    this.produit = produit;
    this.produitNom = produit.nom;
    this.selectedUnit = this.produit.typeProduit.uniteDeMesure;
  });
}

isValidToAdd(): boolean {
  if (this.selectedUnit && (this.poidsReel || this.quantite)) {
    return true; // Bouton activé si les champs sont remplis
  } else {
    return false; // Bouton désactivé sinon
  }
}




// MODAL
showErrorModal(): void {
  $('#errorModal').modal('show');
}



deleteProductFromFridge(productId: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer de votre frigo?")) {
      const utilisateurId = this.authService.getUserId(); // Récupérer l'ID de l'utilisateur connecté

      if (utilisateurId) {
        this.frigoService.deleteFrigoByUtilisateurIdAndProduitId(utilisateurId, productId)
          .subscribe(
            () => {
              console.log('Produit supprimé avec succès!');
              this.frigos = this.frigos.filter((frigo: any) => frigo.produit.id !== productId);
              window.location.reload();
            },
            error => {
              console.error('Erreur lors de la suppression du produit:', error);
            }
          );
      } else {
        console.error('Erreur: L\'ID utilisateur est manquant ou invalide.');
      }
    }
  }

deleteProduitCustom(produitId: any) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit personnalisé de votre frigo?")) {
        this.produitCustomService.deleteProduitCustom(produitId)
            .subscribe(
                () => {
                    console.log('Produit custom supprimé avec succès!');
                    this.frigos = this.frigos.filter((frigo: any) => frigo.produit.id !== produitId);
                    window.location.reload();
                },
                error => {
                    console.error('Erreur lors de la suppression du produit custom:', error);
                }
            );
    }
}



  refreshFrigoList() {
    const utilisateurIdFrigo = this.authService.getUserId();
    this.frigoService.getFrigoByUtilisateurId(utilisateurIdFrigo).subscribe((data: any) => {
      this.frigos = data;
    });
  }

  updateProduct() {

    this.frigoService.updateQuantiteAndPoidsReelFromIdProduitAndIdUtilisateur(
      this.quantite,
      this.poidsReel,
      this.produitId,
      this.utilisateurId
    ).subscribe(
      () => {
        console.log('Produit mis à jour avec succès.');

        this.modalService.dismissAll();

        this.refreshFrigoList();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du produit:', error);
      }
    );
  }

  openEditModal(content: any, frigo: any) {

    this.selectedProduct = frigo.produit;
    this.selectedUnit = frigo.produit.typeProduit.uniteDeMesure;
    this.produitId = frigo.produit.id;
    this.quantite = frigo.quantite;
    this.poidsReel = frigo.poidsReel;
    this.utilisateurId = this.authService.getUserId();

    this.modalService.open(content).result.then(

      () => {
        this.updateProduct();
      },

      () => {
      }
    );
  }

  ajouterProduitCustom() {
    if (this.authService.isLoggedIn()) {
        const utilisateurId = this.authService.getUserId();

        if (utilisateurId) {
          const produitCustomData = {
            utilisateur: {
                idUtilisateur: utilisateurId
            },
            type: this.nouveauProduitCustom.typeProduitCustom,
            nom: this.nouveauProduitCustom.nomCustom,
            quantite: this.nouveauProduitCustom.quantiteCustom,
            poids: this.nouveauProduitCustom.poidsCustom,
            uniteDeMesure: this.nouveauProduitCustom.uniteDeMesureCustom,
            isInListeCourse: false
        };
            this.produitCustomService.createProduitCustom(produitCustomData)
            .subscribe(
                data => {
                  console.log('Produit custom ajouté avec succès');
                  window.location.reload();
                },
                error => {
                    // Gérez les erreurs ici
                }
            );
        } else {
            console.error('Erreur: L\'ID utilisateur est manquant ou invalide.');
        }
    } else {
        console.warn('L\'utilisateur doit être connecté pour ajouter un produit.');
    }
}

ajouterProduitCustomListeCourse() {
  if (this.authService.isLoggedIn()) {
      const utilisateurId = this.authService.getUserId();

      if (utilisateurId) {
        const produitCustomData = {
          utilisateur: {
              idUtilisateur: utilisateurId
          },
          type: this.nouveauProduitCustom.typeProduitCustom,
          nom: this.nouveauProduitCustom.nomCustom,
          quantite: this.nouveauProduitCustom.quantiteCustom,
          poids: this.nouveauProduitCustom.poidsCustom,
          uniteDeMesure: this.nouveauProduitCustom.uniteDeMesureCustom,
          isInListeCourse: true
      };
          this.produitCustomService.createProduitCustom(produitCustomData)
          .subscribe(
              data => {
                console.log('Produit custom ajouté avec succès à la liste de courses');
                window.location.reload();
              },
              error => {
                  // Gérez les erreurs ici
              }
          );
      } else {
          console.error('Erreur: L\'ID utilisateur est manquant ou invalide.');
      }
  } else {
      console.warn('L\'utilisateur doit être connecté pour ajouter un produit.');
  }
}

openModal(): void {
  $('#ajoutProduitModal').modal('show');
}

closeModalAndRefresh(): void {
  $('#ajoutProduitModal').modal('hide');
  location.reload(); // Rafraîchir la page
}
closeOnClick(): void {
  $('#ajoutProduitModal').modal('hide');
}

updateCustomProduct() {
  // Obtenez l'ID du produit personnalisé sélectionné
  const idProduitCustom = this.selectedCustomProduct.id;

  // Appelez le service pour mettre à jour le produit personnalisé
  this.produitCustomService.updateProduitCustom(
    this.customQuantite,
    this.customUniteDeMesure,
    this.selectedCustomType,
    this.customNom,
    this.customPoids,
    idProduitCustom,
    this.authService.getUserId()
  ).subscribe(
    () => {
      console.log('Produit personnalisé mis à jour avec succès.');

      this.modalService.dismissAll();

      // Rechargez la liste des produits personnalisés après la mise à jour
      this.refreshFrigoList();
      window.location.reload();
    },
    (error) => {
      console.error('Erreur lors de la mise à jour du produit personnalisé:', error);
    }
  );
}

openEditModalCustom(content: any, customProduct: any) {
  this.selectedCustomProduct = customProduct;
  // Récupérez les autres valeurs nécessaires depuis customProduct
  this.customQuantite = customProduct.quantite;
  this.customPoids = customProduct.poids;
  this.customNom = customProduct.nom; // Préremplir le champ du nom
  this.selectedCustomType  = customProduct.type;
  this.customUniteDeMesure = customProduct.uniteDeMesure; // Préremplir le champ du type (suppose que type est un objet avec un champ id)

  console.log("selectedCustomProduct", customProduct);
  console.log("type", customProduct.type);
  console.log("nom", customProduct.nom);
  console.log("uniteDeMesure", customProduct.uniteDeMesure);
  // Ouvrez la modal de modification
  this.modalService.open(content).result.then(
    () => {
      this.updateCustomProduct();
    },
    () => {
      // Gérez l'annulation si nécessaire
    }
  );
}

afficherRecettesAvecProduitsFrigo() {
  this.router.navigate(['/recette-avec-produits-frigo']);
}


  }

