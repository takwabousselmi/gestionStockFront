import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Materiel} from '../Models/materiel';
import {MaterielserviceService} from '../services/materielservice.service';
import {convertUpdateArguments} from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css']
})
export class MaterielComponent implements OnInit {

  list: Materiel[];
  listMatPerim:Materiel[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [ 'nom', 'ref', 'quantite' , 'prix' , 'description' , 'codeMat', 'TypeMAt', 'action'];
  dataSource: MatTableDataSource<Materiel>;
  private readonly notifier: NotifierService;
  MaterielForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
              public service: MaterielserviceService,
              notifierService: NotifierService) {
    this.notifier = notifierService;
  }
  ngOnInit() {
    this.listMatPerim=[];
    this.MaterielForm = this.fb.group({
      nom  : ['', [Validators.required]],
      ref : ['', [Validators.required]],
      quantite: ['', [Validators.required]],
      prix: ['', [Validators.required]],
      description: ['', [Validators.required]],
      codeMat: ['', [Validators.required]],
      TypeMAt: ['', [Validators.required]]
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
    this.service.getfm().subscribe(
      res => {
        this.listMatPerim = res;
        console.log(this.listMatPerim);
        if (this.listMatPerim.length != 0) {
          for (let i= 0; i<this.listMatPerim.length;i++){
            this.notifier.notify("warning" ,"la quantité de materiel" + this.listMatPerim[i].nom + "est presque fini");
          }
        }
      }
        );

    this.function();


  }

  function() {
    console.log(this.listMatPerim);




  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  populateForm(pd: Materiel) {
    this.service.formData = Object.assign({}, pd);
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      idArticle: null,
      TypeArticle: 'MM',
      nom: '',
      ref: '',
      quantite: null,
      prix: null,
      description: '',
      codeMat: '',
      TypeMAt: ''
    };
  }



  onSubmit(form: FormGroupDirective) {
    this.submitted = true;

    if (this.MaterielForm.valid) {
      this.submitted = true;

      if (this.MaterielForm.valid) {

        this.updateRecord(form);

      } else {   this.notifier.notify('error', 'Remplir les champs SVP!'); }


    }


  }


  get f() { return this.MaterielForm.controls; }
  onDelete(idArticle) {

    this.service.deleteMateril(idArticle)
      .subscribe(res => {


          this.service.getAll().subscribe(
            res => {
              this.list = res;
              this.dataSource = new MatTableDataSource(this.list);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.notifier.notify('success', 'materiel supprimé avec succès!');
            }
          );
        },
        err => {
          console.log(err);
        });

  }
  updateRecord(form: FormGroupDirective) {
    this.service.putMateriel() .subscribe(res => {

        this.service.getAll().subscribe(
          res => {
            this.list = res;
            this.dataSource = new MatTableDataSource(this.list);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.notifier.notify(' erreur ', 'materiel modifié avec succès!');
          }
        );
      },
      err => {
        console.log(err);
      });

  }




























}
