import { TagElement } from './tag-element';

export class Document {
  id: number;
  name: string;
  docFileID: number;
  envelopeID: number;
  creationDate: string;
  language: string;
  retentionStartDate: string;
  retentionEndDate: string;
  confidentiality: string;
  docTypeSymbolicName: string;
  docTypeId: number;
  listOfTags: TagElement;
}
