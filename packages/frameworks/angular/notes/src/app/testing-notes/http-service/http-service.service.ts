import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

interface JsonPlaceHolder {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable()
export class HttpServiceService {

  constructor(private _http: HttpClient) {
  }

  get(): Observable<JsonPlaceHolder[]> {
    return this._http.get(`${API_URL}`);
  }
}
