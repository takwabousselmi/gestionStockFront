import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {LaboserviceService} from '../services/laboservice.service';
import {Router} from '@angular/router';
import {Labo} from '../Models/labo';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-labo',
  templateUrl: './labo.component.html',
  styleUrls: ['./labo.component.css']
})
export class LaboComponent implements OnInit {
  list: Labo[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [ 'name', 'typeLabo' , 'action'];
  dataSource: MatTableDataSource<Labo>;
  private readonly notifier: NotifierService;
  LaboForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, public service: LaboserviceService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }


  ngOnInit() {
    this.LaboForm = this.fb.group({
      'name ': ['', [Validators.required]],
      'typeLabo ': ['', [Validators.required]]


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



  populateForm(pd: Labo) {
    this.service.formData = Object.assign({}, pd);
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      name: '',
      typeLabo: ''
    };
  }

  onSubmit(form: FormGroupDirective) {
    this.submitted = true;

    if (this.LaboForm.valid) {
      this.submitted = true;

      if (this.LaboForm.valid) {

        this.updateRecord(form);

      }
      else       this.notifier.notify("error", "Remplir les champs SVP!");


    }


  }
  get f() { return this.LaboForm.controls; }
  onDelete(id) {

    this.service.deleteLabo(id)
      .subscribe(res => {

          this.service.getAll().subscribe(
            res => {
              this.list = res;
              this.dataSource = new MatTableDataSource(this.list);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.notifier.notify("success", "Domaine supprimée avec succès!");
            }
          );
        },
        err => {
          console.log(err);
        });

  }

  updateRecord(form: FormGroupDirective) {
    this.service.putLabo() .subscribe(res => {

        this.service.getAll().subscribe(
          res => {
            this.list = res;
            this.dataSource = new MatTableDataSource(this.list);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.notifier.notify("erreur", "Domaine modifié avec succès!");
          }
        );
      },
      err => {
        console.log(err);
      });

  }


}
