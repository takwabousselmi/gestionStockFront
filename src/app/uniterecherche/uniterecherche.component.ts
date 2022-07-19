import {Component, OnInit, ViewChild} from '@angular/core';
import {Labo} from '../Models/labo';
import {Uniterecherche} from '../Models/uniterecherche';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {LaboserviceService} from '../services/laboservice.service';
import {UniterechercheserviceService} from '../services/uniterechercheservice.service';

@Component({
  selector: 'app-uniterecherche',
  templateUrl: './uniterecherche.component.html',
  styleUrls: ['./uniterecherche.component.css']
})
export class UniterechercheComponent implements OnInit {
  list: Uniterecherche[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [  'label','labo' , 'action'];
  dataSource: MatTableDataSource<Uniterecherche>;
  private readonly notifier: NotifierService;
  UniterechercheForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, public service: UniterechercheserviceService,
              notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.UniterechercheForm = this.fb.group({
      ' label': ['', [Validators.required]]

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

  populateForm(pd: Uniterecherche) {
    this.service.formData = Object.assign({}, pd);
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      label: '',
      labo: null

    };
  }


  onSubmit(form: NgForm) {
    this.submitted = true;

    if (this.UniterechercheForm.valid) {}
  }


  get f() { return this.UniterechercheForm.controls; }
  onDelete(id) {

    this.service.deleteUniterecherche(id)
      .subscribe(res => {

          this.service.getAll().subscribe(
            res => {
              this.list = res;
              this.dataSource = new MatTableDataSource(this.list);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.notifier.notify("success", "Unité supprimée avec succès!");
            }
          );
        },
        err => {
          console.log(err);
        });

  }









  }
