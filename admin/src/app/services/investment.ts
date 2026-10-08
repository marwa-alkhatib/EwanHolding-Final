import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class InvestmentAdminService {
  private api = 'http://localhost:5050/api/InvestmentOpportunities';
  constructor(private http: HttpClient) {}
  private h() {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token') || ''}` });
  }
  all() {
    return this.http.get<any[]>(this.api);
  }
  create(x: any) {
    return this.http.post(this.api, x, { headers: this.h() });
  }
  update(id: number, x: any) {
    return this.http.put(`${this.api}/${id}`, x, { headers: this.h() });
  }
  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`, { headers: this.h() });
  }
}
