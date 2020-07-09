import { Component, OnInit } from '@angular/core';
import { HeroModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroeModel: HeroModel = new HeroModel();
  constructor(private heroesService:  HeroesService,
              private route: ActivatedRoute
    ) {

    }

  ngOnInit() {
    const id  = this.route.snapshot.paramMap.get('id');
    if(id !== 'nuevo'){
      this.heroesService.obtenerHeroe(id).subscribe(
        (resp: HeroModel) => {
          this.heroeModel = resp;
          this.heroeModel.id = id;
        }
      );
    }
    
  }

  guardar( form: NgForm){

    if(!form.valid){
      console.log("Formulario Invalido");
      return; 
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroeModel.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroeModel);
    }
    else {
      peticion = this.heroesService.crearHeroe(this.heroeModel);
    }

    peticion.subscribe(resp => {
        Swal.fire({
          title: this.heroeModel.nombre,
          text: 'Se actualizo correctamente',
          type: 'success'
        });
    });





  }
}
