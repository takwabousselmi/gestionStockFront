import { Injectable } from '@angular/core';
import {Lignedecommande} from '../Models/lignedecommande';
import {HttpClient} from '@angular/common/http';
import {Commande} from '../Models/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeserviceService {

  readonly rootURL = 'http://localhost:8081/commande/';
  formData: Commande;
  List : Commande[];
  constructor(private http: HttpClient) { }
  postCommande(form: Commande){
    console.log(form);
    return this.http.post(this.rootURL + 'save/' , form);
  }
  putCommande() {
    console.log(this.formData);
    return this.http.put(this.rootURL + 'update/',  this.formData);
  }
  getAll() {
    return this.http.get<Commande[]>(this.rootURL  );
  }
  refreshList(){
    this.http.get(this.rootURL )
      .toPromise()
      .then(res => this.List = res as Commande[]);
  }
  deleteCommande(idC){
    return this.http.delete(this.rootURL + '/delete/' +  idC);
  }

}
