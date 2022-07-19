import { Component, OnInit } from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {LaboserviceService} from '../services/laboservice.service';
import {Router} from '@angular/router';
import {FournisseurserviceService} from '../services/fournisseurservice.service';

@Component({
  selector: 'app-ajouter-fournisseur',
  templateUrl: './ajouter-fournisseur.component.html',
  styleUrls: ['./ajouter-fournisseur.component.css']
})
export class AjouterFournisseurComponent implements OnInit {
  private readonly notifier: NotifierService;

  FournisseurForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, public service: FournisseurserviceService ,
              private router: Router, notifierService: NotifierService)
  {this.notifier = notifierService; }

  ngOnInit() {
    this.FournisseurForm = this.fb.group({
      'nom' : ['', [Validators.required]],
      'prenom': ['', [Validators.required]],
      'adresse': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'numerotel': ['', [Validators.required]]
    });
    this.resetForm();
    this.service.refreshList();
  }

  resetForm(form?: NgForm){
    if (form != null)
      form.resetForm();

    this.service.formData = {
      idFournisseur: null,
      nom: '',
      prenom: '',
      adresse: '',
      email: '',
      numerotel: null };
  }

  onSubmit(){
    this.submitted = true;

    if (this.FournisseurForm.valid) {

      this.insertRecord();

    }
  }
  get f() { return this.FournisseurForm.controls; }

  insertRecord(){
    console.log(this.FournisseurForm.value);
    this.service.postFournisseur(this.FournisseurForm.value).subscribe(
      res => {
        this.router.navigate(['fournisseur']);
        this.notifier.notify("success", "fournisseur ajoutée avec succès!");      },
      err =>{
        console.log(err);
        this.notifier.notify("error", "Erreur d'ajout du fournisseur");
      }
    );
  }
  Retourner(){
    this.router.navigate(['fournisseur']);
  }
















}
