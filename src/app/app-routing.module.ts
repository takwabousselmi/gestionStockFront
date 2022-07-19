import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LaboComponent} from './labo/labo.component';
import {AjouterLaboComponent} from './ajouter-labo/ajouter-labo.component';
import {UniterechercheComponent} from './uniterecherche/uniterecherche.component';
import {AjoutUniteComponent} from './ajout-unite/ajout-unite.component';
import {AjoutEquiepeRechComponent} from './equipeRech/ajout-equiepe-rech/ajout-equiepe-rech.component';
import {ListEquiepeRechComponent} from './equipeRech/list-equiepe-rech/list-equiepe-rech.component';
import {FournisseurComponent} from './fournisseur/fournisseur.component';
import {AjouterFournisseurComponent} from './ajouter-fournisseur/ajouter-fournisseur.component';
import {ArticleComponent} from './article/article.component';
import {ProduitComponent} from './produit/produit.component';
import {AjouterProduitComponent} from './ajoutarticle/ajouter-produit/ajouter-produit.component';
import {MaterielComponent} from './materiel/materiel.component';
import {AjouterMaterielComponent} from './ajoutarticle/ajouter-materiel/ajouter-materiel.component';
import {AjoutligneComponent} from './ajoutligne/ajoutligne.component';
import {LignedecommandeComponent} from './lignedecommande/lignedecommande.component';
import {CommandeComponent} from './commande/commande.component';
import {AjoutcommandeComponent} from './commande/ajoutcommande/ajoutcommande.component';


const routes: Routes = [
  {path: 'labo' , component: LaboComponent},
  {path: 'ajout-labo' , component: AjouterLaboComponent},
  {path: 'unite-recherche' , component: UniterechercheComponent},
  {path: 'ajout-unite' , component: AjoutUniteComponent},
  {path: 'ajout-equipe' , component: AjoutEquiepeRechComponent},
  {path: 'equiperech' , component: ListEquiepeRechComponent},
  {path: 'fournisseur' , component: FournisseurComponent},
  {path: 'ajout-fournisseur' , component: AjouterFournisseurComponent},
  {path: 'article' , component: ArticleComponent},
  {path: 'produit' , component: ProduitComponent},
  {path: 'ajouter-produit',component: AjouterProduitComponent},
  {path: 'materiel' , component: MaterielComponent},
  {path: 'ajouter-mat',component: AjouterMaterielComponent},
  {path: 'lignedecommande',component: LignedecommandeComponent},
  {path: 'ajoutligne',component: AjoutligneComponent},
  {path: 'ajoutcommande',component: AjoutcommandeComponent},
  {path: 'commande',component: CommandeComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
