import { async } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import {Shallow} from 'shallow-render';
import {AppModule} from '../app.module';
/***
 * Please see category.component.spec.ts for info on tests.
 */
describe('ItemComponent', () => {
  let shallowItem: Shallow<ItemComponent>;

  beforeEach(async(() => {
    shallowItem = new Shallow(ItemComponent, AppModule);
  }));

  it('should create', async () => {
    const {find} = await shallowItem.render({bind: {item: {name: 'Test Item'}}});
    expect(find).toBeTruthy();
  });
});
