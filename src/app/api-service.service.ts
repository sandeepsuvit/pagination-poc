import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isEmpty, isNull, isUndefined } from 'lodash';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { PagedResponse } from './paged-response.interface';
import { IUser } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private http: HttpClient,
  ) { }
  
  /**
   * Get the list of users
   *
   * @param {*} [params]
   * @returns {Observable<PagedResponse<IUser>>}
   * @memberof ApiServiceService
   */
  getUsers(params?: any): Observable<PagedResponse<IUser>> {
    if (isEmpty(params)) {
      return this.http.get<any>(`${environment.hostUrl}/users`);
    }
  
    const queryString = this.toQueryParams(params);
    
    return this.http.get<any>(`${environment.hostUrl}/users?${queryString}`);
  }

  /**
   * Convert object to query parameters
   *
   * @private
   * @param {*} params
   * @returns
   * @memberof ApiServiceService
   */
  private toQueryParams(params: any) {
    return Object.keys(params)
      // Filter only valid data and ignore the rest
      .filter(key => !isUndefined(params[key]) && !isNull(params[key]))
      // Form the query string
      .map(key => `${key}=${params[key]}`).join('&');
  }
}
