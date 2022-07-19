import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Lignedecommande} from '../Models/lignedecommande';


@Injectable({
  providedIn: 'root'
})
export class LignedecommandeserviceService {

  readonly rootURL = 'http://localhost:8081/lignedecommande/';
  formData: Lignedecommande;
  List : Lignedecommande[];
  constructor(private http: HttpClient) { }
  postLigne(form: Lignedecommande){
    console.log(form);
    return this.http.post(this.rootURL + 'save/' , form);
  }
  putLigne() {
    console.log(this.formData);
    return this.http.put(this.rootURL + 'update/',  this.formData);
  }
  getAll() {
    return this.http.get<Lignedecommande[]>(this.rootURL  );
  }
  refreshList(){
    this.http.get(this.rootURL )
      .toPromise()
      .then(res => this.List = res as Lignedecommande[]);
  }
  deleteLigne(idLine){
    return this.http.delete(this.rootURL + '/delete/' +  idLine);
  }


}
