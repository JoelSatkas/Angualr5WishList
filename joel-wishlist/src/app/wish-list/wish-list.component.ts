import { Component, OnInit } from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {ItemService} from '../item.service';
import {Item} from '../../Models/Item';
import {WishList} from '../../Models/WishList';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
/***
 * This component is responsible for displaying and managing the wish list that items can be added to.
 */
export class WishListComponent implements OnInit {
  wishList: WishList;
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.initialize();
    this.wishList = this.itemService.getWishListItems();
  }

  drop(event: CdkDragDrop<Item[], any>) {
    ItemService.drop(event);
    this.itemService.saveWishList();
  }

  clearWishList() {
    this.itemService.clearWishList();
  }
}
