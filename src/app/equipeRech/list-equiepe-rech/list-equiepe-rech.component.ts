import {Component, OnInit, ViewChild} from '@angular/core';
import {Labo} from '../../Models/labo';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {LaboserviceService} from '../../services/laboservice.service';
import {EquipeRecherche} from '../../Models/equipe-recherche';
import {EquipeRechercheService} from '../../services/equipe-recherche.service';
import {Uniterecherche} from '../../Models/uniterecherche';
import {UniterechercheserviceService} from '../../services/uniterechercheservice.service';

@Component({
  selector: 'app-list-equiepe-rech',
  templateUrl: './list-equiepe-rech.component.html',
  styleUrls: ['./list-equiepe-rech.component.css']
})
export class ListEquiepeRechComponent implements OnInit {
  selectedUnite: Uniterecherche;
  listUnite: Uniterecherche[];

  list: EquipeRecherche[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [ 'libelle', 'uniterecherche','dateCreation' , 'action'];
  dataSource: MatTableDataSource< EquipeRecherche>;
  private readonly notifier: NotifierService;
  EquipeRechercheForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
              public service: EquipeRechercheService,public serviceunite: UniterechercheserviceService, notifierService: NotifierService) {
    this.notifier = notifierService;

  }

  ngOnInit() {
    this. EquipeRechercheForm = this.fb.group({
      'libelle': ['', [Validators.required]],
      'uniterecherche': ['', [Validators.required]],
      'dateCreation': ['', [Validators.required]]


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
    this.serviceunite.getAll().subscribe(
      res => {
        this.listUnite = res;
        console.log(this.list);
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



  populateForm(pd: EquipeRecherche) {
    this.service.formData = Object.assign({}, pd);
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      idRech: null,
      libelle: '',
      uniteRecherche: null ,
      dateCreation: null
    };
  }

  onSubmit(form: FormGroupDirective) {
    this.submitted = true;
     this.updateRecord(form);
  }
  get f() { return this.EquipeRechercheForm.controls; }
  onDelete(id) {

    this.service.deleteEquipeRecherche(id)
      .subscribe(res => {

          this.service.getAll().subscribe(
            res => {
              this.list = res;
              this.dataSource = new MatTableDataSource(this.list);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.notifier.notify("success", "equipe supprimée avec succès!");
            }
          );
        },
        err => {
          console.log(err);
        });

  }

  updateRecord(form: FormGroupDirective) {
    this.service.putEquipeRecherche().subscribe(res => {

        this.service.getAll().subscribe(
          res => {
            this.list = res;
            this.dataSource = new MatTableDataSource(this.list);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.notifier.notify("erreur", "equipe modifié avec succès!");
          }
        );
      },
      err => {
        console.log(err);
      });

  }



}
