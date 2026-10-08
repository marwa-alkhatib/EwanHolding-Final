import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CompanyServiceItem {
  id: number;

  name_Ar: string;
  name_En: string;

  description_Ar: string;
  description_En: string;

  displayOrder: number;
  companyId: number;
}

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = 'http://localhost:5050/api/Service';

  constructor(private http: HttpClient) {}

  getByCompanyId(companyId: number): Observable<CompanyServiceItem[]> {
    return this.http.get<CompanyServiceItem[]>(`${this.apiUrl}/company/${companyId}`);
  }
}
