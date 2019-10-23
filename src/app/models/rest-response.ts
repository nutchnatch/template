import { Paging } from './paging';
import { Error } from './error';


export class RestResponse<T>  {
  error: Error;
  paging: Paging;
  result: Array<T>;
  status: boolean;

  // /**
  //  * Creates an instance of RestResponse.
  //  * Used mainly during unit tests.
  //  * @param {string} errorCode
  //  * @param {string} errorMessage
  //  * @param {number} contentNumber
  //  * @param {Array<T>} content
  //  *
  //  * @memberOf RestResponse
  //  */
  // constructor(errorCode: string, errorMessage: string, contentNumber: number, content: Array<T>) {
  //   this.errorCode = errorCode;
  //   this.errorMessage = errorMessage;
  //   this.contentNumber = contentNumber;
  //   this.content = content;
  // }
}
