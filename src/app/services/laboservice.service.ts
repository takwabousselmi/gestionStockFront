import { Injectable } from '@angular/core';
import {Labo} from '../Models/labo';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaboserviceService {

  readonly rootURL = 'http://localhost:8081/labo/';
  formData: Labo;
  List: Labo[];
  constructor(private http: HttpClient) { }

  postLabo(form: Labo){
    console.log(form);
    return this.http.post(this.rootURL + 'save/' , form);
  }
  putLabo() {
    console.log(this.formData);
    return this.http.put(this.rootURL + 'update/',  this.formData);
  }
  getAll() {
    return this.http.get<Labo[]>(this.rootURL );
  }
  refreshList(){
    this.http.get(this.rootURL )
      .toPromise()
      .then(res => this.List = res as Labo[]);
  }
  deleteLabo(id){
    return this.http.delete(this.rootURL + '/delete/' +  id);
  }
}
