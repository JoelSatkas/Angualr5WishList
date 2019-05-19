import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import * as myGlobals from './globals';

@Injectable({
  providedIn: 'root',
})
/***
 * This service represents a database that we pull the JSON data from
 */
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {items: myGlobals.items};
  }
}
