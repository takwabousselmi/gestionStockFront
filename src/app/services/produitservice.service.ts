import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Produit} from '../Models/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitserviceService {

  readonly rootURL = 'http://localhost:8081/article/';
  formData: Produit;
   List: Produit[];
  constructor(private http: HttpClient) { }
  postProduit(form: Produit){
    console.log(form);
    return this.http.post(this.rootURL + 'save/' , form);
  }
  putProduit() {
    console.log(this.formData);
    return this.http.put(this.rootURL + 'update/',  this.formData);
  }
  getAll() {
    return this.http.get<Produit[]>(this.rootURL + 'allproduit/' );
  }
  refreshList(){
    this.http.get(this.rootURL )
      .toPromise()
      .then(res => this.List = res as Produit []);
  }

  deleteProduit(idArticle){
    return this.http.delete(this.rootURL + '/delete/' +  idArticle);
  }



}
