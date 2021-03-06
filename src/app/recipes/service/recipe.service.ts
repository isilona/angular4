import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shopping-list/service/shopping-list.service';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();


  private recipes: Recipe[] = [

    new Recipe(
      'Tasty Schnitzel',
      'Super Tasty Schnitzel - just awasome',
      'http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-7_edited.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),

    new Recipe(
      'Big Fat Burger',
      'What other to say',
      'http://aht.seriouseats.com/images/20100331-fatburger-large.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]),

  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

}
