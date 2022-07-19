import { Injectable } from '@angular/core';
import {Uniterecherche} from '../Models/uniterecherche';
import {HttpClient} from '@angular/common/http';
import {Labo} from '../Models/labo';

@Injectable({
  providedIn: 'root'
})
export class UniterechercheserviceService {

  readonly rootURL = 'http://localhost:8081/unite/';
  formData: Uniterecherche;
  List: Uniterecherche[];

  constructor(private http: HttpClient) { }


  postUniterecherche(form: Uniterecherche){
    console.log(form);
    return this.http.post(this.rootURL + 'save/' , form);
  }

  putUniterecherche(form: Uniterecherche) {
    return this.http.put(this.rootURL + 'update/',  form);
  }
  getAll() {
    return this.http.get<Uniterecherche[]>(this.rootURL + 'all' );
  }

  refreshList(){
    this.http.get(this.rootURL )
      .toPromise()
      .then(res => this.List = res as Uniterecherche[]);
  }
  deleteUniterecherche(id){
    return this.http.delete(this.rootURL + '/delete/' +  id);
  }






}
