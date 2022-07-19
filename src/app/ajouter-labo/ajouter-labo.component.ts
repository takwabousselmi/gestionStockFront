import { Component, OnInit } from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {LaboserviceService} from '../services/laboservice.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-ajouter-labo',
  templateUrl: './ajouter-labo.component.html',
  styleUrls: ['./ajouter-labo.component.css']
})
export class AjouterLaboComponent implements OnInit {

  private readonly notifier: NotifierService;

  laboForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, public service: LaboserviceService ,
              private router: Router, notifierService: NotifierService)
  {this.notifier = notifierService; }

  ngOnInit() {
    this.laboForm = this.fb.group({
      'name' : ['', [Validators.required]],
      'typeLabo': ['', [Validators.required]]
    });
    this.resetForm();
    this.service.refreshList();
  }

  resetForm(form?: NgForm){
    if (form != null)
      form.resetForm();

    this.service.formData = {
      id: null,
      name: '',
      typeLabo: ''
    };
  }

  onSubmit(){
    this.submitted = true;

    if (this.laboForm.valid) {

      this.insertRecord();

    }
  }
  get f() { return this.laboForm.controls; }

  insertRecord(){
console.log(this.laboForm.value);
    this.service.postLabo(this.laboForm.value).subscribe(
      res => {
        this.router.navigate(['labo']);
        this.notifier.notify("success", "labo ajoutée avec succès!");      },
      err =>{
        console.log(err);
        this.notifier.notify("error", "Erreur d'ajout du labo");
      }
    );
  }
  Retourner(){
    this.router.navigate(['labo']);
  }

}
