import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {}

  postMessage=(
    messageBody: any
  ): Observable<any> =>{
     return this.http
     .post(
      `${environment.server.baseURL}/chat`,messageBody
     );
  };
}