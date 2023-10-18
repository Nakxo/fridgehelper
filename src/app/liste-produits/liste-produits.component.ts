import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { FormBuilder, FormGroup } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.scss']
})
export class ListeProduitsComponent implements OnInit {


  constructor(private produitService: ProduitService, private fb: FormBuilder) {
    this.produitForm = this.fb.group({
      nom: [''],
      possedePoidsEstime: [false],
      poidsEstime: ['']
    });
  }

  ngOnInit(): void {
    this.fetchProduits();
  }

    produits: any[] = [];
    typesProduit: any[] = [];
    selectedTypeProduit: number = 0;
    searchText: string = '';
    sortAsc: boolean = true;
    selectedProduct: any;
    produitForm: FormGroup<any>;


    sortProducts() {
        this.sortAsc = !this.sortAsc;
        this.produits.sort((a, b) => this.sortAsc ? a.nom.localeCompare(b.nom) : b.nom.localeCompare(a.nom));
    }

    deleteProduct(id: number) {
      if (confirm('Voulez-vous vraiment supprimer ce produit?')) {
          this.produitService.deleteProduit(id).subscribe(
              () => {
                  this.fetchProduits();
                  alert('Produit supprimé avec succès.');
              },
              error => {
                  console.error('Erreur lors de la suppression du produit:', error);
                  alert('Une erreur est survenue lors de la suppression du produit.');
              }
          );
      }
  }

    fetchProduits() {
      this.produitService.getAllProduits().subscribe(
        (data: any['']) => {
          this.produits = data;
          this.sortProducts();
        },
        error => {
          console.error('Erreur lors de la récupération des produits:', error);
        }
      );
    }

    updateProduct() {
      const updatedProduct = {
        ...this.selectedProduct,
        ...this.produitForm.value
      };

      this.produitService.updateProduit(updatedProduct).subscribe(
          response => {
              alert('Produit mis à jour avec succès.');
              this.fetchProduits();
              $('#editModal').modal('hide');
          },
          error => {
              console.error('Erreur lors de la mise à jour du produit:', error);
              alert('Une erreur est survenue lors de la mise à jour du produit.');
          }
      );
    }

    openEditModal(produit: any) {
      this.selectedProduct = produit;

      this.produitForm.patchValue({
        nom: produit.nom,
        possedePoidsEstime: produit.possedePoidsEstime,
        poidsEstime: produit.possedePoidsEstime ? produit.poidsEstime : ''
      });
      $('#editModal').modal('show');
  }

  closeModal() {
    $('#editModal').modal('hide');
  }


}
