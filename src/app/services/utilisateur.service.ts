import { UtilisateurUpdate } from './../models/utilisateur-update.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  // private baseUrl = `${environment.backendUrl}/subscribe/`;

  constructor(private http: HttpClient) { }

  // createUser(utilisateur: Utilisateur): Observable<Utilisateur> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<Utilisateur>(this.baseUrl, utilisateur, { headers });
  // }

  createUser(utilisateur: Utilisateur): Observable<Utilisateur>{
    return this.http.post<Utilisateur>(`${environment.backendUrl}/subscribe`, utilisateur);
  }

  // Met à jour les informations de base de l'utilisateur
updateUserInfo(id: number, utilisateurUpdate: UtilisateurUpdate): Observable<Utilisateur> {
  return this.http.put<Utilisateur>(`${environment.backendUrl}/utilisateur/updateInfo/${id}`, utilisateurUpdate);
}

// Met à jour le mot de passe de l'utilisateur
updateUserPassword(id: number, passwordPayload: any): Observable<any> {
  return this.http.put<any>(`${environment.backendUrl}/utilisateur/updatePassword/${id}`, passwordPayload);
}

  getUtilisateurId(){
    return this.http.get('/idUtilisateurActuel');
  }

  getUtilisateurById(id: number){
    return this.http.get<Utilisateur>(`${environment.backendUrl}/utilisateur/${id}`)
  }
}
