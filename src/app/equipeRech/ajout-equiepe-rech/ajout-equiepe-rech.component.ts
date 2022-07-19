import { Component, OnInit } from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Labo} from '../../Models/labo';
import {Uniterecherche} from '../../Models/uniterecherche';
import {UniterechercheserviceService} from '../../services/uniterechercheservice.service';
import {LaboserviceService} from '../../services/laboservice.service';
import {Router} from '@angular/router';
import {EquipeRecherche} from '../../Models/equipe-recherche';
import {EquipeRechercheService} from '../../services/equipe-recherche.service';

@Component({
  selector: 'app-ajout-equiepe-rech',
  templateUrl: './ajout-equiepe-rech.component.html',
  styleUrls: ['./ajout-equiepe-rech.component.css']
})
export class AjoutEquiepeRechComponent implements OnInit {

  private readonly notifier: NotifierService;
  EquipeRechForm: FormGroup;
  submitted = false;
  selectedunite: Uniterecherche;
  listunite: Uniterecherche[];
  equiperech: EquipeRecherche;
  constructor(private fb: FormBuilder,
              public service: EquipeRechercheService , private uniteService: UniterechercheserviceService,
              private router: Router, notifierService: NotifierService)
  {this.notifier = notifierService; }



  ngOnInit() {
    this.EquipeRechForm = this.fb.group({
      'libelle' : ['', [Validators.required]],
      'dateCreation' :['', [Validators.required]],
    });
    this.uniteService.getAll().subscribe(
      res => { this.listunite = res;
        console.log(this.listunite);
      }
    );
    this.resetForm();
  }


  resetForm(form?: NgForm){
    if (form != null)
      form.resetForm();

    this.service.formData = {
      idRech: null,
      libelle: '',
      uniteRecherche: null,
      dateCreation: null

    };
  }



  onSubmit(){
    this.submitted = true;

    if (this.EquipeRechForm.valid) {

      this.insertRecord();

    }
  }
  get f() { return this.EquipeRechForm.controls; }

  insertRecord(){
    console.log(this.selectedunite);
    this.equiperech = this.EquipeRechForm.value;
    this.equiperech.uniteRecherche= this.selectedunite;
    this.service.postEquipeRecherche(this.equiperech).subscribe(
      res => {
        this.router.navigate(['equiperech']);
        this.notifier.notify("success", "equipe ajoutée avec succès!");      },
      err =>{
        console.log(err);
        this.notifier.notify("error", "Erreur d'ajout du equipe");
      }
    );
  }
  Retourner(){
    this.router.navigate(['equiperech']);
  }



}
