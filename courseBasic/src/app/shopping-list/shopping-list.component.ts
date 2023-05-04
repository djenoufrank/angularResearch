import { Component, OnInit } from '@angular/core';
import { Ingrediant } from '../shared/ingrediant.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
ingredients:Ingrediant[]=[
  new Ingrediant('Apple',5),
  new Ingrediant('tomates',9),
  new Ingrediant('orange',27),
];
  ngOnInit(): void {
  }
}
