import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import  { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationComponent } from './navigation/navigation.component';
import { LaboComponent } from './labo/labo.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HttpClientModule} from '@angular/common/http';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import { AjouterLaboComponent } from './ajouter-labo/ajouter-labo.component';
import { UniterechercheComponent } from './uniterecherche/uniterecherche.component';
import { AjoutUniteComponent } from './ajout-unite/ajout-unite.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ListEquiepeRechComponent } from './equipeRech/list-equiepe-rech/list-equiepe-rech.component';
import { AjoutEquiepeRechComponent } from './equipeRech/ajout-equiepe-rech/ajout-equiepe-rech.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { AjouterFournisseurComponent } from './ajouter-fournisseur/ajouter-fournisseur.component';
import { ArticleComponent } from './article/article.component';
import { ProduitComponent } from './produit/produit.component';
import { AjouterProduitComponent } from './ajoutarticle/ajouter-produit/ajouter-produit.component';
import { MaterielComponent } from './materiel/materiel.component';
import { AjouterMaterielComponent } from './ajoutarticle/ajouter-materiel/ajouter-materiel.component';
import { LignedecommandeComponent } from './lignedecommande/lignedecommande.component';
import { AjoutligneComponent } from './ajoutligne/ajoutligne.component';
import { CommandeComponent } from './commande/commande.component';
import { AjoutcommandeComponent } from './commande/ajoutcommande/ajoutcommande.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {ListboxModule} from 'primeng';



const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LaboComponent,
    AjouterLaboComponent,
    UniterechercheComponent,
    AjoutUniteComponent,
    ListEquiepeRechComponent,
    AjoutEquiepeRechComponent,
    FournisseurComponent,
    AjouterFournisseurComponent,
    ArticleComponent,
    ProduitComponent,
    AjouterProduitComponent,
    MaterielComponent,
    AjouterMaterielComponent,
    LignedecommandeComponent,
    AjoutligneComponent,
    CommandeComponent,
    AjoutcommandeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    FormsModule,
    MatFormFieldModule,
    MultiSelectModule,
    ListboxModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
