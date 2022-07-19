import {Lignedecommande} from './lignedecommande';

export class Commande {
  idC: number;
  dateHeure:Date;
  prixTotal:number;
  lignecommande: Lignedecommande[];
}
