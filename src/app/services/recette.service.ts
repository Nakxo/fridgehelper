import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  constructor(private http: HttpClient) { }

  getRecettes(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.backendUrl}/recettes/getAllRecettes`);
  }

  getRecetteById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/recettes/${id}`);
  }

  rechercherRecettes(rechercheTerm: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.backendUrl}/recherche?term=${rechercheTerm}`);
  }

  deleteRecette(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendUrl}/recettes/${id}`);
  }

  updateRecette(id: number, recette: any): Observable<any> {
    return this.http.put<any>(`${environment.backendUrl}/recettes/${id}`, recette);
  }


  createRecette(recette: any): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/recettes/createRecette`, recette);
  }

  addEtapesToRecette(recetteId: number, etapes: any[]): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/recettes/${recetteId}/etapes`, etapes);
  }

  deleteEtape(recetteId: number, etapeId: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendUrl}/recettes/${recetteId}/etapes/${etapeId}`);
  }

  addProduitsToRecette(recetteId: number, produits: any[]): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/recettes/${recetteId}/produits`, produits);
  }

  deleteProduitRecette(recetteId: number, produitRecetteId: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendUrl}/recettes/produit-recette/${produitRecetteId}`);
  }
  addProduitRecette(recetteId: number, produitRecette: any): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/recettes/${recetteId}/produits-recette`, produitRecette);
  }

  getRecettesByProduitsInFrigo(produitsFrigoIds: number[]): Observable<any[]> {
    return this.http.get<any[]>(`${environment.backendUrl}/recettes/recettesByProduitsInFrigo`, {
      params: { produitsFrigoIds: produitsFrigoIds.join(",") }
    });
  }


}
