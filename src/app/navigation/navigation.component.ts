import { Component } from '@angular/core';
import { faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons' ;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  faSearch = faSearch;
  faBell = faBell;
  faUser = faUser;
  test:boolean;

}
