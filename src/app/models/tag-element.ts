import { DisplayNameItem } from './display-name-item';

export class Tag {
  name: string;
  type: string;
  displayNameItem?: Array<DisplayNameItem>;
  choicelist?: Array<DisplayNameItem>;
}


export class TagElement {
  tag: Tag;
  tagValue: number;
}
