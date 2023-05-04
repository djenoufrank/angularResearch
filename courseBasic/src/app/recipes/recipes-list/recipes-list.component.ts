import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit{
  recipes: Recipe[]=[
    new Recipe('a test Recipe','description long','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bonappetit.com%2Frecipes&psig=AOvVaw0FZlnYe0VtizPFRWw9IsnH&ust=1683191632448000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNCDnM3n2P4CFQAAAAAdAAAAABAO'),
    new Recipe('a test Rec','description  très large','assets/recipe.jpeg')
  ];
  constructor(){}
ngOnInit(){}
}
