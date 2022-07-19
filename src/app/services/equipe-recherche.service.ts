import { Injectable } from '@angular/core';
import {Labo} from '../Models/labo';
import {HttpClient} from '@angular/common/http';
import {EquipeRecherche} from '../Models/equipe-recherche';

@Injectable({
  providedIn: 'root'
})
export class EquipeRechercheService {
  readonly rootURL = 'http://localhost:8081/equiperech/';
  formData: EquipeRecherche;
  List: EquipeRecherche[];
  constructor(private http: HttpClient) { }

  postEquipeRecherche(form: EquipeRecherche){
    console.log(form);
    return this.http.post(this.rootURL + 'save/' , form);
  }
  putEquipeRecherche() {
    console.log(this.formData);
    return this.http.put(this.rootURL + 'update/',  this.formData);
  }
  getAll() {
    return this.http.get<EquipeRecherche[]>(this.rootURL );
  }
  refreshList(){
    this.http.get(this.rootURL )
      .toPromise()
      .then(res => this.List = res as EquipeRecherche[]);
  }
  deleteEquipeRecherche(id){
    return this.http.delete(this.rootURL + '/delete/' +  id);
  }

}
