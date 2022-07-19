import { Injectable } from '@angular/core';
import {Produit} from '../Models/produit';
import {HttpClient} from '@angular/common/http';
import {Materiel} from '../Models/materiel';

@Injectable({
  providedIn: 'root'
})
export class MaterielserviceService {


  readonly rootURL = 'http://localhost:8081/article/';
  formData: Materiel;
  List: Materiel[];
  constructor(private http: HttpClient) { }
  postMateriel(form: Materiel){
    console.log(form);
    return this.http.post(this.rootURL + 'save/' , form);
  }
  putMateriel() {
    console.log(this.formData);
    return this.http.put(this.rootURL + 'update/',  this.formData);
  }
  getAll() {
    return this.http.get<Materiel[]>(this.rootURL + 'allmateriel' );
  }
  refreshList(){
    this.http.get(this.rootURL )
      .toPromise()
      .then(res => this.List = res as Materiel []);
  }

  deleteMateril(idArticle){
    return this.http.delete(this.rootURL + '/delete/' +  idArticle);
  }


  getfm() {
    return this.http.get<(Materiel[])>(this.rootURL + 'finm');

  }
}
