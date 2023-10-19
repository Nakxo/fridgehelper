import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent implements OnInit {

  isMenuOpen = false;
  utilisateurId: any;

  @Input() utilisateurRole: string = '';

  constructor(private authService: AuthService) { }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {

    this.utilisateurId = this.authService.getUserId();
  }

}
