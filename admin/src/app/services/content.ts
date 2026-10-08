import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class ContentService {
  private api = 'http://localhost:5050/api/PageContent';
  constructor(private http: HttpClient) {}
  private h() {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token') || ''}` });
  }
  all() {
    return this.http.get<any[]>(this.api);
  }
  create(d: any) {
    return this.http.post(this.api, d, { headers: this.h() });
  }
  update(id: number, d: any) {
    return this.http.put(`${this.api}/${id}`, d, { headers: this.h() });
  }
  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`, { headers: this.h() });
  }
}
