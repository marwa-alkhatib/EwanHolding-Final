import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}
  send(d: any) {
    return this.http.post('http://localhost:5050/api/Contact', d);
  }
}
