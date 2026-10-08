import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CompanyFeatureItem {
  id: number;

  title_Ar: string;
  title_En: string;

  description_Ar: string;
  description_En: string;

  displayOrder: number;
  companyId: number;
}

@Injectable({
  providedIn: 'root',
})
export class CompanyFeature {
  private apiUrl = 'http://localhost:5050/api/CompanyFeature';

  constructor(private http: HttpClient) {}

  getByCompanyId(companyId: number): Observable<CompanyFeatureItem[]> {
    return this.http.get<CompanyFeatureItem[]>(`${this.apiUrl}/company/${companyId}`);
  }
}
