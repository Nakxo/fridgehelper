import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListeRecettesService {


  constructor(private http: HttpClient) { }

  getRecettes(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.backendUrl}/recettes/getAllRecettes`);
  }

  rechercherRecettes(rechercheTerm: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.backendUrl}/recherche?term=${rechercheTerm}`);
  }


}
