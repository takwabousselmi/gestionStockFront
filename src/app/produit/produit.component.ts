import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Produit} from '../Models/produit';
import {ProduitserviceService} from '../services/produitservice.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  list: Produit[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [ 'nom', 'ref', 'quantite' , 'prix' , 'description' , 'dateF','dateE','action'];
  dataSource: MatTableDataSource<Produit>;
  private readonly notifier: NotifierService;
  ProduitForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
             public service: ProduitserviceService,
             notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.ProduitForm = this.fb.group({
      'nom'  : ['', [Validators.required]],
      'ref' : ['', [Validators.required]],
      'quantite': ['', [Validators.required]],
      'prix': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'dateF': ['', [Validators.required]],
      'dateE': ['', [Validators.required]]
    });
    this.service.getAll().subscribe(
      res => {
        this.list = res;
        console.log(this.list);
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );

    this.resetForm();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  populateForm(pd: Produit) {
    this.service.formData = Object.assign({}, pd);
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      TypeArticle: 'PR',
      idArticle: null,
      nom: '',
      ref: '',
      quantite: null,
      prix: null,
      description: '',
      dateF:null,
      dateE:null
    };
  }





  onSubmit(form: FormGroupDirective) {
    this.submitted = true;

    if (this.ProduitForm.valid) {
      this.submitted = true;

      if (this.ProduitForm.valid) {

        this.updateRecord(form);

      }
      else   this.notifier.notify("error", "Remplir les champs SVP!");


    }


  }


  get f() { return this.ProduitForm.controls; }
  onDelete(idArticle) {

    this.service.deleteProduit(idArticle)
      .subscribe(res => {


          this.service.getAll().subscribe(
            res => {
              this.list = res;
              this.dataSource = new MatTableDataSource(this.list);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.notifier.notify("success", "produit supprimé avec succès!");
            }
          );
        },
        err => {
          console.log(err);
        });

  }
  updateRecord(form: FormGroupDirective) {
    this.service.putProduit() .subscribe(res => {

        this.service.getAll().subscribe(
          res => {
            this.list = res;
            this.dataSource = new MatTableDataSource(this.list);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.notifier.notify(" erreur ", "produit modifié avec succès!");
          }
        );
      },
      err => {
        console.log(err);
      });

  }

























}
