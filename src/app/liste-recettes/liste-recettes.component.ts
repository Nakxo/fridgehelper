import { Component, OnInit } from '@angular/core';
import { ListeRecettesService} from '../services/liste-recettes.service';

@Component({
  selector: 'app-liste-recettes',
  templateUrl: './liste-recettes.component.html',
  styleUrls: ['./liste-recettes.component.scss']
})
export class ListeRecettesComponent implements OnInit {

  recettes: any[''];
  rechercheTerm: string = '';

  constructor(private listeRecettesService: ListeRecettesService) {}

  ngOnInit(): void {
    this.loadRecettes();
  }

  loadRecettes(): void {
    this.listeRecettesService.getRecettes().subscribe(data => {
      this.recettes = data;
    });
  }

  rechercherRecettes(): void {
    if (this.rechercheTerm.trim() === '') {
      this.loadRecettes();
    } else {
      this.listeRecettesService.rechercherRecettes(this.rechercheTerm).subscribe(data => {
        this.recettes = data;
      });
    }
  }

}
