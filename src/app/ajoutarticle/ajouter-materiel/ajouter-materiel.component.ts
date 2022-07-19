import { Component, OnInit } from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ProduitserviceService} from '../../services/produitservice.service';
import {Router} from '@angular/router';
import {MaterielserviceService} from '../../services/materielservice.service';
import {Materiel} from '../../Models/materiel';

@Component({
  selector: 'app-ajouter-materiel',
  templateUrl: './ajouter-materiel.component.html',
  styleUrls: ['./ajouter-materiel.component.css']
})
export class AjouterMaterielComponent implements OnInit {

  private readonly notifier: NotifierService;
private materiel:Materiel;
  MaterielForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, public service: MaterielserviceService ,
              private router: Router, notifierService: NotifierService)
  {this.notifier = notifierService; }

  ngOnInit() {
    this.MaterielForm = this.fb.group({
      'nom' : ['', [Validators.required]],
      'ref': ['', [Validators.required]],
      'quantite': ['', [Validators.required]],
      'prix': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'codeMat': ['', [Validators.required]],
      'TypeMAt': ['', [Validators.required]]
    });
    this.resetForm();
    this.service.refreshList();
  }

  resetForm(form?: NgForm){
    if (form != null)
      form.resetForm();

    this.service.formData = {
      TypeArticle: 'MM',

      idArticle: null,
      nom: '',
      ref: '',
      quantite: null,
      prix: null,
      description: '',
      codeMat: '' ,
      TypeMAt: ''
    };
  }

  onSubmit(){
    this.submitted = true;

    if (this.MaterielForm.valid) {

      this.insertRecord();

    }
  }
  get f() { return this.MaterielForm.controls; }

  insertRecord(){
    this.materiel = this.MaterielForm.value;
    this.MaterielForm.value.TypeArticle = 'MM';
    console.log(this.MaterielForm.value);
    this.service.postMateriel(this.MaterielForm.value).subscribe(
      res => {
        this.router.navigate(['materiel']);
        this.notifier.notify("success", "materiel ajouté avec succès!");      },
      err =>{
        console.log(err);
        this.notifier.notify("error", "Erreur d'ajout du materiel");
      }
    );
  }
  Retourner(){
    this.router.navigate(['materiel']);
  }

















}
