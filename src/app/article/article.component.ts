import {Component, OnInit, ViewChild} from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Article} from '../Models/article';
import {MatTableDataSource} from '@angular/material/table';
import {Fournisseur} from '../Models/fournisseur';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  list: Article[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  prod: boolean;
  mat: boolean;
  //dataSource: any;
  ArticleForm: FormGroup;
  dataSource: MatTableDataSource<Article>;
  displayedColumns: string[] ;


  constructor() { }

  ngOnInit(): void {

  }

  affichProduit() {





    this.prod = true;
    this.mat = false;
  }

  affichmat() {
    this.prod = false;
    this.mat = true;
  }
}
