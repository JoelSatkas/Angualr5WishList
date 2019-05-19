import { async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {Shallow} from 'shallow-render';
import {AppModule} from './app.module';
/***
 * Please see category.component.spec.ts for info on tests.
 */
describe('AppComponent', () => {
  let shallowApp: Shallow<AppComponent>;
  const title = 'Wish List App';

  beforeEach(async(() => {
    shallowApp = new Shallow(AppComponent, AppModule);
  }));

  it('should create the app', async () => {
    const {find} = await shallowApp.render();
    expect(find).toBeTruthy();
  });

  it('should render title in a h1 tag', async () => {
    const {find} = await shallowApp.render();
    expect(find('h1').nativeElement.textContent).toContain(title);
  });
});
