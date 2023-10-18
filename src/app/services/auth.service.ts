import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

interface LoginResponse {
  token: string;
  role: string;
  idUser : any ;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly ROLE = 'ROLE';
  private readonly IDUSER = 'IDUSER';
  private readonly NOMUTILISATEUR = 'NOMUTILISATEUR';
  private readonly PRENOMUTILISATEUR = 'PRENOMUTILISATEUR';

  public userLoggedIn = false;

  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {

    const token = localStorage.getItem(this.JWT_TOKEN);
    if(token){
      this.userLoggedIn = true;
      this.loggedIn.next(true);
    }
  }

  private storeTokens(res: LoginResponse) {
    localStorage.setItem(this.JWT_TOKEN, res.token);
    localStorage.setItem(this.ROLE, res.role);
    localStorage.setItem(this.IDUSER, res.idUser);
    localStorage.setItem(this.NOMUTILISATEUR, res.idUser);
    localStorage.setItem(this.PRENOMUTILISATEUR, res.idUser);

  }

  getRole(){
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (token){
      const decodedToken : any = jwt_decode(token);
      if(decodedToken && decodedToken.role){
        return decodedToken.role;
      }
    }
    return null;
  }

  getUserId(){
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (token){
      const decodedToken : any = jwt_decode(token);
      if(decodedToken && decodedToken.idUser){
        return decodedToken.idUser;
      }
    }
    return null;
  }

  getToken(){
    const token = localStorage.getItem(this.JWT_TOKEN);
    return token;
  }

  getNomUtilisateur(){
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (token){
      const decodedToken : any = jwt_decode(token);
      if(decodedToken && decodedToken.nomUtilisateur){
        return decodedToken.nomUtilisateur;
      }
    }
    return null;
  }

  getPrenomUtilisateur(){
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (token){
      const decodedToken : any = jwt_decode(token);
      if(decodedToken && decodedToken.prenomUtilisateur){
        return decodedToken.prenomUtilisateur;
      }
    }
    return null;
  }

  logout(): void{
    this.loggedIn.next(false);
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.ROLE);
    localStorage.removeItem(this.IDUSER);
    localStorage.removeItem(this.NOMUTILISATEUR);
    localStorage.removeItem(this.PRENOMUTILISATEUR);
    this.userLoggedIn = false;
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.backendUrl}/login`, {username, password}).pipe(
      tap((res: LoginResponse) => this.doLoginUser(res)),
      catchError(error => {
        console.error(error);
        throw error;
      })
    );
  }

  private doLoginUser(res: LoginResponse) {
    this.storeTokens(res);
    this.loggedIn.next(true);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }


}
