import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MediaItem {
  id: number;
  url: string;
  entityType: string;
  type: string;
  displayOrder: number;
}

export interface CompanyItem {
  id: number;

  name_Ar: string;
  name_En: string;

  description_Ar: string;
  description_En: string;

  websiteUrl: string;
  logoUrl: string;
  isActive: boolean;

  // Hero
  heroTitle_Ar: string;
  heroTitle_En: string;

  heroDescription_Ar: string;
  heroDescription_En: string;

  // Overview
  overviewTitle_Ar: string;
  overviewTitle_En: string;

  overviewDescription1_Ar: string;
  overviewDescription1_En: string;

  overviewDescription2_Ar: string;
  overviewDescription2_En: string;

  // Why Choose Us
  whyChooseUsTitle_Ar: string;
  whyChooseUsTitle_En: string;

  // Media
  media: MediaItem[];
}

@Injectable({
  providedIn: 'root',
})
export class Company {
  private apiUrl = 'http://localhost:5050/api/Company';
  private mediaUrl = 'http://localhost:5050/api/Media';

  constructor(private http: HttpClient) {}

  private h() {
    const token = localStorage.getItem('token') || '';

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getCompanies(): Observable<CompanyItem[]> {
    return this.http.get<CompanyItem[]>(this.apiUrl);
  }

  getCompany(id: number): Observable<CompanyItem> {
    return this.http.get<CompanyItem>(`${this.apiUrl}/${id}`);
  }

  createCompany(data: any) {
    return this.http.post<any>(this.apiUrl, data, { headers: this.h() });
  }

  updateCompany(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.h() });
  }

  deleteCompany(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.h() });
  }

  getMedia(id: number): Observable<MediaItem[]> {
    return this.http.get<MediaItem[]>(`${this.mediaUrl}/entity/${id}/Company`);
  }

  deleteMedia(id: number) {
    return this.http.delete(`${this.mediaUrl}/${id}`, { headers: this.h() });
  }

  uploadCompanyImage(file: File, companyId: number) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('entityId', companyId.toString());

    // Company = 1
    formData.append('entityType', '1');

    // Image = 1
    formData.append('type', '1');

    formData.append('displayOrder', '0');

    return this.http.post(`${this.mediaUrl}/upload`, formData, { headers: this.h() });
  }

  image(c: CompanyItem) {
    const logo = c.media?.find((m) => m.displayOrder === 0)?.url || c.logoUrl;

    return this.fullImageUrl(logo);
  }

  getImageByOrder(media: MediaItem[], displayOrder: number): string {
    const item = media?.find((m) => m.displayOrder === displayOrder);

    return this.fullImageUrl(item?.url);
  }

  fullImageUrl(url: string | null | undefined): string {
    if (!url) {
      return '';
    }

    return url.startsWith('http') ? url : `http://localhost:5050${url}`;
  }
}
