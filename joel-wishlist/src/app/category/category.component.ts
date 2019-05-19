import { Component, OnInit } from '@angular/core';
import {Category} from '../../Models/Category';
import {ItemService} from '../item.service';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Item} from '../../Models/Item';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

/***
 * This component is responsible for displaying the available list of items to add into the wish list
 */
export class CategoryComponent implements OnInit {
  categories: Category[];
  selectedCategory: string;
  showInputForItem: boolean;
  showInputForCat: boolean;
  constructor(private itemService: ItemService) { }

  getItems(): void {
    this.itemService.pullItemsFromServer()
      .subscribe(categories => this.categories = categories);
  }

  ngOnInit() {
    this.itemService.initialize();
    this.getItems();
  }

  addItem(categoryName: string) {
    this.showInputForCat = false;
    this.showInputForItem = true;
    this.selectedCategory = categoryName;
  }

  addCategory() {
    this.showInputForItem = false;
    this.showInputForCat = true;
  }

  drop(event: CdkDragDrop<Item[], any>) {
    ItemService.drop(event);
  }
}
