

export class RestResponse<T>  {
  errorCode: string;
  errorMessage: string;
  contentNumber: number;
  content: Array<T>;

  /**
   * Creates an instance of RestResponse.
   * Used mainly during unit tests.
   * @param {string} errorCode
   * @param {string} errorMessage
   * @param {number} contentNumber
   * @param {Array<T>} content
   *
   * @memberOf RestResponse
   */
  constructor(errorCode: string, errorMessage: string, contentNumber: number, content: Array<T>) {
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.contentNumber = contentNumber;
    this.content = content;
  }
}
