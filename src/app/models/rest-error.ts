
export class RestError {
  errorCode: string | number;
  errorMessage: string;
}

export const HttpErrorFormatizer = (httpError: any) => {
  const httpErrorHarmony: RestError = new RestError;

  if (!httpError) { httpError = httpErrorHarmony; }
  if (!httpError.hasOwnProperty('errorCode')) { httpError.errorCode = 'error'; }
  if (!httpError.hasOwnProperty('errorMessage')) { httpError.errorMessage = 'No message from server!!'; }

  // tslint:disable-next-line:max-line-length
  if (httpError.errorCode === null || httpError.errorCode === undefined || typeof httpError.errorCode === 'object' || typeof httpError.errorCode === 'boolean') { httpError.errorCode = 'error'; }
  // tslint:disable-next-line:max-line-length
  if (httpError.errorMessage === null || httpError.errorMessage === undefined || typeof httpError.errorMessage === 'object' || typeof httpError.errorMessage === 'boolean') { httpError.errorMessage = 'No message form server!!'; }

  if (typeof httpError.errorCode === 'number') { httpError.errorCode = httpError.errorCode.toString(); }

  Object.assign(httpErrorHarmony, httpError);
  return httpErrorHarmony;
};
