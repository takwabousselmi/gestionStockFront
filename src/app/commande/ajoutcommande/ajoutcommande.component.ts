import { Component, OnInit } from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {LignedecommandeserviceService} from '../../services/lignedecommandeservice.service';
import {Router} from '@angular/router';
import {CommandeserviceService} from '../../services/commandeservice.service';
import {SelectItem} from 'primeng';
import {Lignedecommande} from '../../Models/lignedecommande';
import {Commande} from '../../Models/commande';

@Component({
  selector: 'app-ajoutcommande',
  templateUrl: './ajoutcommande.component.html',
  styleUrls: ['./ajoutcommande.component.css']
})
export class AjoutcommandeComponent implements OnInit {


  private readonly notifier: NotifierService;
  listlignecommande: Lignedecommande[];
  com: Commande;

  selectedlignecommande: Lignedecommande[] = [];

  CommandeForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, public service: CommandeserviceService ,
              private router: Router, notifierService: NotifierService, public serviceligne: LignedecommandeserviceService)
  {this.notifier = notifierService; }

  ngOnInit() {
    this.CommandeForm = this.fb.group({
      dateHeure : ['', [Validators.required]],
      prixTotal: ['', [Validators.required]]
    });
    this.resetForm();
    this.service.refreshList();
    this.serviceligne.getAll().subscribe(
      res => {
        this.listlignecommande = res;
      }
    );
  }

  resetForm(form?: NgForm){
    if (form != null) {
      form.resetForm();
    }

    this.service.formData = {
      idC: null,
      dateHeure: null,
      prixTotal: null,
      lignecommande: null
    };
  }

  onSubmit(){
    this.submitted = true;

    if (this.CommandeForm.valid) {

      this.insertRecord();

    }
  }
  get f() { return this.CommandeForm.controls; }

  insertRecord(){
   this.com = this.CommandeForm.value;
   this.com.lignecommande=this.selectedlignecommande;
   console.log(this.com);
   console.log(this.CommandeForm.value);
   this.service.postCommande(this.com).subscribe(
      res => {
        this.router.navigate(['commande']);
        this.notifier.notify('success', ' commande  ajoutée avec succès!');      },
      err => {
        console.log(err);
        this.notifier.notify('error', 'Erreur d\'ajout  de commande');
      }
    );
  }
  Retourner(){
    this.router.navigate(['commande']);
  }


}
