import {Component, OnInit, ViewChild} from '@angular/core';
import {Lignedecommande} from '../Models/lignedecommande';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {LignedecommandeserviceService} from '../services/lignedecommandeservice.service';
import {Commande} from '../Models/commande';
import {CommandeserviceService} from '../services/commandeservice.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  list: Commande[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [ 'dateHeure', 'prixTotal','action'];
  dataSource: MatTableDataSource<Commande>;
  private readonly notifier: NotifierService;
  CommandeForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, public service: CommandeserviceService,
              notifierService: NotifierService) {
    this.notifier = notifierService;
  }
  ngOnInit() {
    this.CommandeForm = this.fb.group({
      'dateHeure': ['', [Validators.required]],
      'prixTotal': ['', [Validators.required]]


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



  populateForm(pd: Commande) {
    this.service.formData = Object.assign({}, pd);
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      idC: null,
      dateHeure: null,
      prixTotal: null,
      lignecommande: null
    };
  }

  onSubmit(form: FormGroupDirective) {
    this.submitted = true;

    if (this.CommandeForm.valid) {
      this.submitted = true;

      if (this.CommandeForm.valid) {

        this.updateRecord(form);

      }
      else       this.notifier.notify("error", "Remplir les champs SVP!");


    }


  }

  get f() { return this.CommandeForm.controls; }
  onDelete(idC) {

    this.service.deleteCommande(idC)
      .subscribe(res => {

          this.service.getAll().subscribe(
            res => {
              this.list = res;
              this.dataSource = new MatTableDataSource(this.list);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.notifier.notify("success", " Commande  supprimée avec succès!");
            }
          );
        },
        err => {
          console.log(err);
        });

  }

  updateRecord(form: FormGroupDirective) {
    this.service.putCommande() .subscribe(res => {

        this.service.getAll().subscribe(
          res => {
            this.list = res;
            this.dataSource = new MatTableDataSource(this.list);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.notifier.notify("erreur", " commande  modifié avec succès!");
          }
        );
      },
      err => {
        console.log(err);
      });

  }






}
