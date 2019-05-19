import { async } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import {Shallow} from 'shallow-render';
import {AppModule} from '../app.module';
import {ItemService} from '../item.service';
import {WishList} from '../../Models/WishList';
import {Observable, of} from 'rxjs';
import {Category} from '../../Models/Category';
import * as myGlobals from '../globals';

describe('CategoryComponent', () => {
  let shallowCategory: Shallow<CategoryComponent>;

  /***
   * Note on tests: I found angular uses a lot of copied boiler plate code so I found
   * this node module for angular that helps reduce the boiler plate to keep in principle with DRY.
   * https://github.com/getsaf/shallow-render
   *
   * This is the set up for each test although I would look into using real services and sibling components in tests instead of mock ones,
   * perhaps for integration test suites, and look into abstracting the service mockup so the code can be shared between tests.
   * From here I would write up some basic tests for the component to make sure the logic works and drives the gui, but I didnt want to
   * make you wait any longer.
   *
   * I would also look into Karma and set it up to run on Firefox and any other web browser that this projects is expected to run on.
   */
  beforeEach(async(() => {
    shallowCategory = new Shallow(CategoryComponent, AppModule)
      .mock(ItemService, {
        addNewCategory(name: string): void {},
        addNewItem(itemName: string, categoryName: string): void {},
        clearWishList(): void {},
        deleteItemFromListType(itemName: string, itemListType: string, categoryForItem?: string): void {},
        getWishListItems(): WishList {
          return undefined;
        },
        saveWishList(): void {},
        initialize() {},
        pullItemsFromServer(): Observable<Category[]> {
          return of(myGlobals.items);
        }
      });
  }));

  it('should create', async () => {
    const {find} = await shallowCategory.render();
    expect(find).toBeTruthy();
  });
});
