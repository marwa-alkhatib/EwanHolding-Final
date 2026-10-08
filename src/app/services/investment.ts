import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class InvestmentService {
  private api = 'http://localhost:5050/api/InvestmentOpportunities';
  constructor(private http: HttpClient) {}
  all() {
    return this.http.get<any[]>(this.api);
  }
}
