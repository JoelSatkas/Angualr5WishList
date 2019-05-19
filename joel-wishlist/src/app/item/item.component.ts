import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../Models/Item';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
/***
 * This component is responsible for managing and displaying items
 */
export class ItemComponent implements OnInit {
  @Input() item: {name: string, itemListType: string, category?: string};
  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  deleteItem() {
    this.itemService.deleteItemFromListType(this.item.name, this.item.itemListType, this.item.category);
  }
}
