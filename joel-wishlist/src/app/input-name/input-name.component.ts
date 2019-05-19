import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-input-name',
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.css']
})
/***
 * This component is responsible for creating new items or categories.
 */
export class InputNameComponent implements OnInit {
  @Input() itemType: {type: string, category?: string};
  name: string;
  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  add(name: string, type: string, category?: string) {
    switch (type) {
      case 'category':
        this.itemService.addNewCategory(name);
        break;
      case 'item':
        this.itemService.addNewItem(name, category);
        break;
    }
  }
}
