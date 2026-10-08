import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CompanyFeature {
  private api = 'http://localhost:5050/api/CompanyFeature';

  constructor(private http: HttpClient) {}

  private h() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    });
  }

  // Get all features
  getAll() {
    return this.http.get<any[]>(this.api);
  }

  // Get features for one company
  getByCompanyId(companyId: number) {
    return this.http.get<any[]>(
      `${this.api}/company/${companyId}`
    );
  }

  // Get one feature
  getById(id: number) {
    return this.http.get<any>(
      `${this.api}/${id}`
    );
  }

  // Create feature
  create(data: any) {
    return this.http.post<{ id: number }>(
      this.api,
      data,
      {
        headers: this.h(),
      }
    );
  }

  // Update feature
  update(id: number, data: any) {
    return this.http.put(
      `${this.api}/${id}`,
      data,
      {
        headers: this.h(),
      }
    );
  }

  // Delete feature
  delete(id: number) {
    return this.http.delete(
      `${this.api}/${id}`,
      {
        headers: this.h(),
      }
    );
  }
}