import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroModel[] = [];
  cargando = true;

  constructor(private heroesService: HeroesService) {
    this.heroesService.obtenerHeroes().subscribe(
      resp => {
        this.heroes = resp
        this.cargando = false;
      }
    );
  }

  ngOnInit() {
  }


  eliminarHeroe(heroe: HeroModel, i: number){
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea eliminar a ${heroe.nombre}`,
      type:'question',
      showCancelButton: true,
      showConfirmButton: true
    });
    
    this.heroesService.eliminarHeroe(heroe.id).subscribe(resp => {
      this.heroes.splice(i, 1);
    });
    console.log(this.heroes);
  }



}
