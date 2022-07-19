import { Component, OnInit } from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LignedecommandeserviceService} from '../services/lignedecommandeservice.service';

@Component({
  selector: 'app-ajoutligne',
  templateUrl: './ajoutligne.component.html',
  styleUrls: ['./ajoutligne.component.css']
})
export class AjoutligneComponent implements OnInit {

  private readonly notifier: NotifierService;

  LignedecommandeForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, public service: LignedecommandeserviceService ,
              private router: Router, notifierService: NotifierService)
  {this.notifier = notifierService; }

  ngOnInit() {
    this.LignedecommandeForm = this.fb.group({
      'quantite' : ['', [Validators.required]],
      'prix': ['', [Validators.required]]
    });
    this.resetForm();
    this.service.refreshList();
  }

  resetForm(form?: NgForm){
    if (form != null)
      form.resetForm();

    this.service.formData = {
      idLine: null,
      quantite: null,
      prix: null
    };
  }

  onSubmit(){
    this.submitted = true;

    if (this.LignedecommandeForm.valid) {

      this.insertRecord();

    }
  }
  get f() { return this.LignedecommandeForm.controls; }

  insertRecord(){
    console.log(this.LignedecommandeForm.value);
    this.service.postLigne(this.LignedecommandeForm.value).subscribe(
      res => {
        this.router.navigate(['lignedecommande']);
        this.notifier.notify("success", "Ligne de commande  ajoutée avec succès!");      },
      err =>{
        console.log(err);
        this.notifier.notify("error", "Erreur d'ajout du ligne de commande");
      }
    );
  }
  Retourner(){
    this.router.navigate(['ligne']);
  }

}
