import { async } from '@angular/core/testing';
import { WishListComponent } from './wish-list.component';
import {Shallow} from 'shallow-render';
import {AppModule} from '../app.module';
import {ItemService} from '../item.service';
import {WishList} from '../../Models/WishList';
import {Observable, of} from 'rxjs';
import {Category} from '../../Models/Category';
/***
 * Please see category.component.spec.ts for info on tests.
 */
describe('WishListComponent', () => {
  let shallowWishList: Shallow<WishListComponent>;
  const wishList = {
    items: [
        {name: 'Ball'},
        {name: 'Bat'},
        {name: 'Bodyboard'},
        {name: 'Bucket'}
      ]
  };

  beforeEach(async(() => {
    shallowWishList = new Shallow(WishListComponent, AppModule)
      .mock(ItemService, {
        addNewCategory(name: string): void {},
        addNewItem(itemName: string, categoryName: string): void {},
        clearWishList(): void {},
        deleteItemFromListType(itemName: string, itemListType: string, categoryForItem?: string): void {},
        getWishListItems(): WishList {
          return wishList;
        },
        saveWishList(): void {},
        initialize() {},
        pullItemsFromServer(): Observable<Category[]> {
          return of(undefined);
        }
      });
  }));

  it('should create', async () => {
    const {find} = await shallowWishList.render();
    expect(find).toBeTruthy();
  });
});
