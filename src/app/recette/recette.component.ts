import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecetteService } from '../services/recette.service';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.scss']
})
export class RecetteComponent implements OnInit {

  cette: any;
  recette: any;

  constructor(
    private route: ActivatedRoute,
    private recetteService: RecetteService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

  if (idParam) {
    const id = +idParam;
    this.recetteService.getRecetteById(id).subscribe(data => {
      this.recette = data;
      this.recette.etapes.sort((a: { numeroEtape: number; }, b: { numeroEtape: number; }) => a.numeroEtape - b.numeroEtape);
    });
  } else {
    console.error('ID de recette non fourni');
  }



}
}
