import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FrigoService {

  constructor(private http: HttpClient) { }




  getTypeProduits(){
    return this.http.get(`${environment.backendUrl}/frigo/getTypesProduits`);
  }

  getProduitsParIdType(typeId: number){
    return this.http.get(`${environment.backendUrl}/frigo/getProduitByIdType?idTypeProduit=${typeId}`)
  }


  ajouterProduitAuFrigo(frigoRequest: any){
    const url =`${environment.backendUrl}/frigo/ajouterProduitFrigo`;
    return this.http.post(url, frigoRequest);
  }

  getProduitById(idProduit: number){
    return this.http.get(`${environment.backendUrl}/frigo/getProduitById?idProduit=${idProduit}`)
  }

  getFrigoByUtilisateurId(utilisateurId: number){
    return this.http.get(`${environment.backendUrl}/frigo/getProduitDansFrigoUtilisateur?utilisateurId=${utilisateurId}`)
  }

  deleteFrigoByUtilisateurIdAndProduitId(utilisateurId:number, produitId:number){
    return this.http.delete(`${environment.backendUrl}/frigo/deleteFrigoByUtilisateurIdAndProduitId?utilisateurId=${utilisateurId}&produitId=${produitId}`)
  }


  updateQuantiteAndPoidsReelFromIdProduitAndIdUtilisateur(newQuantite: number, newPoidsReel: number, idProduit: number, idUtilisateur: number) {
    const url = `${environment.backendUrl}/frigo/updateQuantiteAndPoidsReelFromIdProduitAndIdUtilisateur`;
    const params = new HttpParams()
      .set('newQuantite', newQuantite)
      .set('newPoidsReel', newPoidsReel)
      .set('idProduit', idProduit)
      .set('idUtilisateur', idUtilisateur);

    return this.http.put(url, null, { params });
  }
}
