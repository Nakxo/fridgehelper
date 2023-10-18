import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListeCourseService {


  constructor(private http: HttpClient) {}

  getListeCourseByIdUtilisateur(userId: number): Observable<any[]> {
    const url = `${environment.backendUrl}/listeCourse/getListeCourseProduitByIdUtilisateur?idUtilisateur=${userId}`;
    return this.http.get<any[]>(url);
  }

  ajouterProduitListeCourse(listeCourseRequest: any){
    const url =`${environment.backendUrl}/listeCourse/ajouterProduitListeCourse`;
    console.log(listeCourseRequest);
    return this.http.post(url, listeCourseRequest);
  }

  deleteListeCourseProduitByUtilisateurIdAndProduitId(utilisateurId: number, produitId: number){
    return this.http.delete(`${environment.backendUrl}/listeCourse/deleteListeCourseProduitByUtilisateurIdAndProduitId?utilisateurId=${utilisateurId}&produitId=${produitId}`);
  }
}
