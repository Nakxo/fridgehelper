import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FrigoService } from '../services/frigo.service';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.scss']
})
export class AjoutProduitComponent implements OnInit {
  produitForm: any;
  typesProduit: any;
  idTypeSelected: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private frigoService: FrigoService
  ) {
    this.produitForm = this.fb.group({
      typeProduit: [''],
      nom: [''],
      possedePoidsEstime: [false],
      poidsEstime: [{ value: null, disabled: true }]
    });
  }

  ngOnInit(): void {


    this.frigoService.getTypeProduits().subscribe(data => {
      this.typesProduit = data;
    });

    this.produitForm.get('possedePoidsEstime').valueChanges.subscribe((val: any) => {
      if (val) {
        this.produitForm.get('poidsEstime').enable();
      } else {
        this.produitForm.get('poidsEstime').disable();
      }
    });
  }

  onSubmit() {
    const produit = {
      typeProduit:{
        idTypeProduit: this.produitForm.value.typeProduit
      },
      nom: this.produitForm.value.nom,
      possedePoidsEstime: this.produitForm.value.possedePoidsEstime,
      poidsEstime: this.produitForm.value.possedePoidsEstime ? this.produitForm.value.poidsEstime : null
    };


    this.http.post(`${environment.backendUrl}/produit/ajouterProduit`, produit).subscribe(
      (response: any) => {
        console.log('Produit ajouté avec succès !', response);
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout du produit:', error);
      }
    );
  }

}
