import { async } from '@angular/core/testing';
import { InputNameComponent } from './input-name.component';
import {Shallow} from 'shallow-render';
import {AppModule} from '../app.module';

/***
 * Please see category.component.spec.ts for info on tests.
 */
describe('InputNameComponent', () => {
  let shallowInputName: Shallow<InputNameComponent>;

  beforeEach(async(() => {
    shallowInputName = new Shallow(InputNameComponent, AppModule);
  }));

  it('should create', async () => {
    const {find} = await shallowInputName.render({bind: {itemType: {type: 'item', category: 'Food'}}});
    expect(find).toBeTruthy();
  });
});
