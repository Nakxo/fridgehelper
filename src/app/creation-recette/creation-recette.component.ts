import { Component, OnInit } from '@angular/core';
import { RecetteService } from '../services/recette.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-creation-recette',
  templateUrl: './creation-recette.component.html',
  styleUrls: ['./creation-recette.component.scss']
})
export class CreationRecetteComponent implements OnInit {

  recette: any = {};

  constructor(private recetteService: RecetteService, private router: Router) {}

  ngOnInit(): void {

  }

  onSubmit() {
    this.recetteService.createRecette(this.recette).subscribe((recette) => {
      this.router.navigate([`/recette-details/${recette.idRecette}`]);
    });
  }

}
