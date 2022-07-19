import { Component, OnInit } from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {LaboserviceService} from '../services/laboservice.service';
import {Router} from '@angular/router';
import {UniterechercheserviceService} from '../services/uniterechercheservice.service';
import {Labo} from '../Models/labo';
import {Uniterecherche} from '../Models/uniterecherche';

@Component({
  selector: 'app-ajout-unite',
  templateUrl: './ajout-unite.component.html',
  styleUrls: ['./ajout-unite.component.css']
})
export class AjoutUniteComponent implements OnInit {

  private readonly notifier: NotifierService;
  UniterechercheForm: FormGroup;
  submitted = false;
  selectedLabo: Labo;
  listLabo: Labo[];
  uniteRecherche: Uniterecherche;
  constructor(private fb: FormBuilder,
              public service: UniterechercheserviceService , private laboService: LaboserviceService,
              private router: Router, notifierService: NotifierService)
  {this.notifier = notifierService; }



  ngOnInit() {
    this.UniterechercheForm = this.fb.group({
      'label' : ['', [Validators.required]],
    });
    this.laboService.getAll().subscribe(
      res => { this.listLabo = res;
      console.log(this.listLabo);
      }
    );
    this.resetForm();
  }


  resetForm(form?: NgForm){
    if (form != null)
      form.resetForm();

    this.service.formData = {
      id: null,
      label: '',
      labo: null

    };
  }



  onSubmit(){
    this.submitted = true;

    if (this.UniterechercheForm.valid) {

      this.insertRecord();

    }
  }
  get f() { return this.UniterechercheForm.controls; }

  insertRecord(){
    console.log(this.selectedLabo);
    this.uniteRecherche = this.UniterechercheForm.value;
    this.uniteRecherche.labo = this.selectedLabo;
    this.service.postUniterecherche(this.uniteRecherche).subscribe(
      res => {
        this.router.navigate(['unite-recherche']);
        this.notifier.notify("success", "unite ajoutée avec succès!");      },
      err =>{
        console.log(err);
        this.notifier.notify("error", "Erreur d'ajout du unité");
      }
    );
  }
  Retourner(){
    this.router.navigate(['Uniterecherche']);
  }









}
