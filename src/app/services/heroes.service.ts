import { Injectable } from '@angular/core';
import { HeroModel } from '../models/heroe.model';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://loggin-app-2ba53.firebaseio.com';

  constructor( private http: HttpClient) { 
  }

  crearHeroe(heroeModel: HeroModel){
    console.log(heroeModel);
    return this.http.post(`${ this.url }/heroes.json`, heroeModel)
      .pipe(
        map( (resp: any) => {
          heroeModel.id = resp.name;
          return heroeModel;
      })
    );
  }

  actualizarHeroe(heroeModel: HeroModel){
    const HERO_TEMP = {
      ... heroeModel
    };

    delete HERO_TEMP.id;

    return this.http.put(`${ this.url }/heroes/${ heroeModel.id }.json`, HERO_TEMP);
  }

  obtenerHeroes() {
    return this.http.get(`${ this.url }/heroes.json`).pipe(
      map( this.crearArreglo ),
      delay(1500)
    );
  }

  obtenerHeroe(id){
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }

  eliminarHeroe(id){
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  }


  private crearArreglo(heroesObj: object){
    const heroes:  HeroModel[] = [];

    if(heroesObj === null ) { return []; }

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroModel = heroesObj[key];
      heroe.id = key;
      heroes.push( heroe );
    });

    return heroes;
  }
}
