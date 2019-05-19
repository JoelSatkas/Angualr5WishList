import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Category} from '../Models/Category';
import {WishList} from '../Models/WishList';
import {catchError, tap} from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Item} from '../Models/Item';

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  constructor(private http: HttpClient) { }
  private itemsUrl = 'api/items';  // URL to web api
  private LSKeyForWishList = 'wishList';
  private wishListItems: WishList;
  private categoryItems: Category[];
  private initialized: boolean;

  /***
   * This method is responsible for keeping track of the drag and drop between lists
   * @param event - The drop event of  items
   */
  static drop(event: CdkDragDrop<Item[], any>) {
    if (event.container.id === event.previousContainer.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  /***
   * This method initializes the service
   * 1) It pulls the items JSON from the fake database using HTTP get
   * 2) It pulls the array if items for the wish list form the local storage model
   * 3) It assigns itself these items and is responsible for their management and delegation throughout the app.
   */
  initialize() {
    if (!this.initialized) {
      this.pullItemsFromServer();
      this.wishListItems = JSON.parse(localStorage.getItem(this.LSKeyForWishList));
      if (this.wishListItems === null) {
        this.wishListItems = new WishList();
        this.wishListItems.items = [];
      }
      this.initialized = true;
    }
  }

  /***
   * This method is responsible for pulling the fake server with HTTP and getting back the items JSON.
   * Modularized this for testing and future use.
   */
  pullItemsFromServer(): Observable<Category[]> {
    return this.http.get<Category[]>(this.itemsUrl).pipe(
      tap(cat => this.categoryItems = cat),
      catchError(this.handleError<Category[]>('pullItemsFromServer', []))
    );
  }

  getWishListItems(): WishList {
    return this.wishListItems;
  }

  /***
   * This method is responsible for adding a new category to the current list.
   * @param name - Name of the new category to create
   */
  addNewCategory(name: string) {
    const newCategory: Category = {
      name,
      items: []
    };
    this.categoryItems.push(newCategory);
  }

  /***
   * Method responsible for creating a new Item and adding it to an existing category.
   * @param itemName - Name of the new Item
   * @param categoryName - Name of the category that the new item must be created under. This cannot be a non existent category.
   */
  addNewItem(itemName: string, categoryName: string) {
    const categoryToAddTo = this.categoryItems.find((category: Category) => {
      return category.name === categoryName;
    });
    categoryToAddTo.items.push({name: itemName});
  }

  /***
   * This method is responsible for removing the item from what ever list asks
   * @param itemName - Name of the item to remove
   * @param itemListType - The type of list the item will be removed from
   * @param categoryForItem - OPTIONAL - The name of the category the item belongs to if it is in a category list.
   */
  deleteItemFromListType(itemName: string, itemListType: string, categoryForItem?: string) {
    // In case we have more types of lists in the future, this should make it easier to add.
    switch (itemListType) {
      case 'category':
        const selectedCategory = this.categoryItems.find((category) => {
          return category.name === categoryForItem;
        });
        selectedCategory.items = selectedCategory.items.filter(item => item.name !== itemName);
        break;
      case 'wishList':
        this.wishListItems.items = this.wishListItems.items.filter(item => item.name !== itemName);
        this.saveWishList();
        break;
    }
  }

  /***
   * Save the wish list into local storage model.
   */
  public saveWishList() {
    localStorage.setItem(this.LSKeyForWishList, JSON.stringify(this.wishListItems));
  }

  /***
   * Empty the wish list of all of its items
   */
  clearWishList() {
    this.wishListItems.items = [];
    this.saveWishList();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
