import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.backendUrl}/subscribe`; // Utilisez environment.backendUrl

  constructor(private http: HttpClient) {}

  createUser(user: Utilisateur): Observable<Utilisateur> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Utilisateur>(this.baseUrl, user, { headers });
  }
}
