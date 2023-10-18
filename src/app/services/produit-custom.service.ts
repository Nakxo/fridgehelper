import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProduitCustom } from '../models/produitCustom.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProduitCustomService {

  constructor(private http: HttpClient) { }

  getAllProduitCustomByIdUtilisateur(idUtilisateur: number){
    return this.http.get(`${environment.backendUrl}/produitCustom/getAllProduitCustomByIdUtilisateur?idUtilisateur=${idUtilisateur}`);
  }

  createProduitCustom(produitCustom: any): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/produitCustom/createProduitCustom`, produitCustom);
}

  updateProduitCustom(
    newQuantite: number,
    newUniteDeMesure: string,
    newType: string,
    newNom: string,
    newPoids: number,
    idProduitCustom: number,
    idUtilisateur: number
  ) {
    const url = `${environment.backendUrl}/produitCustom/updateProduitCustom`;
    const params = new HttpParams()
      .set('newQuantite', newQuantite.toString()) // Convertir en chaîne
      .set('newPoids', newPoids.toString())
      .set('newNom', newNom)
      .set('newType', newType)
      .set('newUniteDeMesure', newUniteDeMesure)
      .set('idUtilisateur', idUtilisateur.toString()) // Convertir en chaîne
      .set('id', idProduitCustom.toString()); // Convertir en chaîne

    return this.http.put(url, null, { params });
  }

  updateProduitCustomById(
    id: number,
    isInListeCourse: boolean
  ){
    const url = `${environment.backendUrl}/produitCustom/updateProduitCustomById`;
    const params = new HttpParams()
    .set('id', id)
    .set('isInListeCourse', isInListeCourse)

    return this.http.put(url, null, {params});
  }

  deleteProduitCustom(idProduitCustom: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendUrl}/produitCustom/deleteProduitCustom/${idProduitCustom}`);
  }

}
