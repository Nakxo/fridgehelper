import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  getAllProduits() {
    return this.http.get(`${environment.backendUrl}/produit/getAllProduits`);
  }

  updateProduit(produit: any) {
    return this.http.put(`${environment.backendUrl}/produit`, produit);
  }

  deleteProduit(id: number) {
    return this.http.delete(`${environment.backendUrl}/produit/${id}`);
  }

}
