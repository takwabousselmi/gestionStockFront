import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Lignedecommande} from '../Models/lignedecommande';
import {LignedecommandeserviceService} from '../services/lignedecommandeservice.service';

@Component({
  selector: 'app-lignedecommande',
  templateUrl: './lignedecommande.component.html',
  styleUrls: ['./lignedecommande.component.css']
})
export class LignedecommandeComponent implements OnInit {

  list: Lignedecommande[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [ 'quantite', 'prix' , 'action'];
  dataSource: MatTableDataSource<Lignedecommande>;
  private readonly notifier: NotifierService;
  LignedecommandeForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, public service: LignedecommandeserviceService,
              notifierService: NotifierService) {
    this.notifier = notifierService;
  }
  ngOnInit() {
    this.LignedecommandeForm = this.fb.group({
      'quantite': ['', [Validators.required]],
      'prix': ['', [Validators.required]]


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



  populateForm(pd: Lignedecommande) {
    this.service.formData = Object.assign({}, pd);
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      idLine: null,
      quantite: null,
      prix: null
    };
  }

  onSubmit(form: FormGroupDirective) {
    this.submitted = true;

    if (this.LignedecommandeForm.valid) {
      this.submitted = true;

      if (this.LignedecommandeForm.valid) {

        this.updateRecord(form);

      }
      else       this.notifier.notify("error", "Remplir les champs SVP!");


    }


  }

  get f() { return this.LignedecommandeForm.controls; }
  onDelete(idLine) {

    this.service.deleteLigne(idLine)
      .subscribe(res => {

          this.service.getAll().subscribe(
            res => {
              this.list = res;
              this.dataSource = new MatTableDataSource(this.list);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.notifier.notify("success", "Ligne de commande  supprimée avec succès!");
            }
          );
        },
        err => {
          console.log(err);
        });

  }

  updateRecord(form: FormGroupDirective) {
    this.service.putLigne() .subscribe(res => {

        this.service.getAll().subscribe(
          res => {
            this.list = res;
            this.dataSource = new MatTableDataSource(this.list);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.notifier.notify("erreur", "Ligne de commande  modifié avec succès!");
          }
        );
      },
      err => {
        console.log(err);
      });

  }





}
