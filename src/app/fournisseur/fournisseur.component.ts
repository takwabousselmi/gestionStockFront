import {Component, OnInit, ViewChild} from '@angular/core';
import {Labo} from '../Models/labo';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Fournisseur} from '../Models/fournisseur';
import {LaboserviceService} from '../services/laboservice.service';
import {FournisseurserviceService} from '../services/fournisseurservice.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {

  list: Fournisseur[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [ 'nom', 'prenom', 'numerotel' , 'email' , 'adresse' , 'action'];
  dataSource: MatTableDataSource<Fournisseur>;
  private readonly notifier: NotifierService;
  FournisseurForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
              public service: FournisseurserviceService,
              notifierService: NotifierService) {
    this.notifier = notifierService;
  }
  ngOnInit() {
    this.FournisseurForm = this.fb.group({
      'nom'  : ['', [Validators.required]],
      'prenom' : ['', [Validators.required]],
      'numerotel': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'adresse': ['', [Validators.required]]
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

  populateForm(pd: Fournisseur) {
    this.service.formData = Object.assign({}, pd);
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      idFournisseur: null,
      nom: '',
      prenom: '',
      adresse: '',
      email: '',
      numerotel: null
    };
  }

  onSubmit(form: FormGroupDirective) {
    this.submitted = true;

    if (this.FournisseurForm.valid) {
      this.submitted = true;

      if (this.FournisseurForm.valid) {

        this.updateRecord(form);

      }
       else   this.notifier.notify("error", "Remplir les champs SVP!");


    }


  }


  get f() { return this.FournisseurForm.controls; }
  onDelete(idFournisseur) {

    this.service.deleteFournisseur(idFournisseur)
      .subscribe(res => {


          this.service.getAll().subscribe(
            res => {
              this.list = res;
              this.dataSource = new MatTableDataSource(this.list);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.notifier.notify("success", "fournisseur supprimé avec succès!");
            }
          );
        },
        err => {
          console.log(err);
        });

  }
  updateRecord(form: FormGroupDirective) {
    this.service.putFournisseur() .subscribe(res => {

        this.service.getAll().subscribe(
          res => {
            this.list = res;
            this.dataSource = new MatTableDataSource(this.list);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.notifier.notify(" erreur ", "fournisseur modifié avec succès!");
          }
        );
      },
      err => {
        console.log(err);
      });

  }







}
