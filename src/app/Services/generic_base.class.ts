import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AppConsts } from '../Shared/appConsts';

export class GenericService {
  params = new HttpParams();

  myUrl: string = AppConsts.ApiBaseUrl;

  constructor(private http: HttpClient) {
  }

  //generic get and post calls mehtods
  protected GetCall(
    url: string,
    params: HttpParams = null,
    headers: HttpHeaders = null,
    domainUrl: string = ''
  ) {
    let completeUrl =
      domainUrl && domainUrl != '' ? domainUrl + url : this.myUrl + url;
    return this.http.get(completeUrl, { params: params }).pipe(
      map((res: any) => res)
      // catchError(this.handleError)
    );
  }
  protected PostCall(
    url: string,
    data: any,
    headers: HttpHeaders = null,
    params: HttpParams = null,
    domainUrl: string = ''
  ) {
    let completeUrl =
      domainUrl && domainUrl != '' ? domainUrl + url : this.myUrl + url;
    return this.http
      .post(completeUrl, data, {
        headers: headers,
        withCredentials: false,
        params: params,
      })
      .pipe(
        map((res: any) => res)
        // catchError(this.handleError)
      );
  }
  protected PutCall(
    url: string, data: any, headers: HttpHeaders = null, params: HttpParams = null, domainUrl: string = ''
  ) {
    let completeUrl =
      domainUrl && domainUrl != '' ? domainUrl + url : this.myUrl + url;
      return this.http.put(completeUrl, data, {
        headers: headers,
        withCredentials: false,
        params: params
      });
  }

  protected DeleteCall(
    url: string, data: any, headers: HttpHeaders = null, params: HttpParams = null, domainUrl: string = ''
  ) {
    let completeUrl =
      domainUrl && domainUrl != '' ? domainUrl + url : this.myUrl + url;
      return this.http.delete(completeUrl, {
        headers: headers,
        withCredentials: false,
        params: params
      });
  }


  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
