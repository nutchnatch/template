import { Paging } from './paging';
import { Document } from './document';

export class PagedDocument {
  document: Array<Document>;
  paging: Paging;
}

export class PagedQuery<T> {
  results: Array<T>;
  paging: Paging;
}
