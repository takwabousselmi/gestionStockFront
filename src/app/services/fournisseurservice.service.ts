import { Injectable } from '@angular/core';

import {Fournisseur} from '../Models/fournisseur';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FournisseurserviceService {

  readonly rootURL = 'http://localhost:8081/fournisseur/';
  formData: Fournisseur;
  List : Fournisseur[];
  constructor(private http: HttpClient) { }

  postFournisseur(form: Fournisseur){
    console.log(form);
    return this.http.post(this.rootURL + 'save/' , form);
  }
  putFournisseur() {
    console.log(this.formData);
    return this.http.put(this.rootURL + 'update/',  this.formData);
  }

  getAll() {
    return this.http.get<Fournisseur[]>(this.rootURL );
  }
  refreshList(){
    this.http.get(this.rootURL )
      .toPromise()
      .then(res => this.List = res as Fournisseur[]);
  }
  deleteFournisseur(idFournisseur){
    return this.http.delete(this.rootURL + '/delete/' +  idFournisseur);
  }



}
