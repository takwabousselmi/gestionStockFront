import { Component, OnInit } from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

import {Router} from '@angular/router';
import {ProduitserviceService} from '../../services/produitservice.service';


@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})
export class AjouterProduitComponent implements OnInit {


  private readonly notifier: NotifierService;

  ProduitForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, public service: ProduitserviceService ,
              private router: Router, notifierService: NotifierService)
  {this.notifier = notifierService; }

  ngOnInit() {
    this.ProduitForm = this.fb.group({
      'nom' : ['', [Validators.required]],
      'ref': ['', [Validators.required]],
      'quantite': ['', [Validators.required]],
      'prix': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'dateF': ['', [Validators.required]],
      'dateE': ['', [Validators.required]]
    });
    this.resetForm();
    this.service.refreshList();
  }

  resetForm(form?: NgForm){
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
      dateF: null ,
      dateE: null
    };
  }

  onSubmit(){
    this.submitted = true;

    if (this.ProduitForm.valid) {

      this.insertRecord();

    }
  }
  get f() { return this.ProduitForm.controls; }

  insertRecord(){
    this.ProduitForm.value.TypeArticle= 'PR';
    console.log(this.ProduitForm.value);
    this.service.postProduit(this.ProduitForm.value).subscribe(
      res => {
        this.router.navigate(['produit']);
        this.notifier.notify("success", "produit ajouté avec succès!");      },
      err =>{
        console.log(err);
        this.notifier.notify("error", "Erreur d'ajout du produit");
      }
    );
  }
  Retourner(){
    this.router.navigate(['produit']);
  }
















}
