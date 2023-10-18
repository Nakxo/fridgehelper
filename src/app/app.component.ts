import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { constructor(private auth: AuthService, private router: Router) {

}
  title = 'FridgeHelperFinal';
  private userLoggedIn = false;

  ngOnInit(){
    // if(this.auth.isLoggedIn()){
    //   this.router.navigate(['/frigo']);
    // }
  }

  isUserLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  login() {
    this.userLoggedIn = true;
  }


  logout() {
    this.userLoggedIn = false;
  }
}
