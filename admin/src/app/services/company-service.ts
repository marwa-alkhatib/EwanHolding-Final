import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {

  private api = 'http://localhost:5050/api/Service';

  constructor(private http: HttpClient) {}


  private h() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    });
  }


  // Get all services
  getAll() {
    return this.http.get<any[]>(this.api);
  }


  // Get services for one company
  getByCompanyId(companyId: number) {
    return this.http.get<any[]>(
      `${this.api}/company/${companyId}`
    );
  }


  // Get one service
  getById(id: number) {
    return this.http.get<any>(
      `${this.api}/${id}`
    );
  }


  // Create service
  create(data: any) {
    return this.http.post(
      this.api,
      data,
      {
        headers: this.h(),
      }
    );
  }


  // Update service
  update(id: number, data: any) {
    return this.http.put(
      `${this.api}/${id}`,
      data,
      {
        headers: this.h(),
      }
    );
  }


  // Delete service
  delete(id: number) {
    return this.http.delete(
      `${this.api}/${id}`,
      {
        headers: this.h(),
      }
    );
  }
}