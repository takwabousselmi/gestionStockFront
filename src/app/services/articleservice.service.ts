import { Injectable } from '@angular/core';
import {Article} from '../Models/article';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleserviceService {

  readonly rootURL = 'http://localhost:8081/labo/';
  formData: Article;
  List: Article[];
  constructor(private http: HttpClient) { }
  postArticle(form: Article){
    console.log(form);
    return this.http.post(this.rootURL + 'save/' , form);
  }
  putArticle() {
    console.log(this.formData);
    return this.http.put(this.rootURL + 'update/',  this.formData);
  }
  getAll() {
    return this.http.get<Article[]>(this.rootURL );
  }
  refreshList(){
    this.http.get(this.rootURL )
      .toPromise()
      .then(res => this.List = res as Article[]);
  }
  deleteArticle(idArticle){
    return this.http.delete(this.rootURL + '/delete/' +  idArticle);
  }


}
