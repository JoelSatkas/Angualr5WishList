import {async, TestBed} from '@angular/core/testing';
import { ItemService } from './item.service';
import {Shallow} from 'shallow-render';
import {AppModule} from './app.module';
import {InMemoryDataService} from './in-memory-data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import * as myGlobals from './globals';
/***
 * Please see category.component.spec.ts for info on tests.
 */
describe('ItemService', () => {
  let shallowItemService: Shallow<ItemService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    shallowItemService = new Shallow(ItemService, AppModule)
      .mock(InMemoryDataService, {
        createDb(): { items: ({ name: string; items: ({ name: string })[] })[] } {
          return {items: myGlobals.items};
        }
      });
  }));

  it('should be created', () => {
    const service: ItemService = TestBed.get(ItemService);
    expect(service).toBeTruthy();
  });
});
