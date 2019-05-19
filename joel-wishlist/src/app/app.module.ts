import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { CategoryComponent } from './category/category.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {HttpClientModule} from '@angular/common/http';
import { InMemoryDataService } from './in-memory-data.service';
import { InputNameComponent } from './input-name/input-name.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {ItemService} from './item.service';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    DragDropModule
  ],
  declarations: [
    AppComponent,
    ItemComponent,
    CategoryComponent,
    WishListComponent,
    InputNameComponent
  ],
  providers: [
    ItemService
  ],
  bootstrap: [AppComponent],
  exports: [ItemComponent, CategoryComponent, WishListComponent]
})
export class AppModule { }
