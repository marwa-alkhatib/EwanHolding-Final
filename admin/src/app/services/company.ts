import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class Company {

  private api = 'http://localhost:5050/api/Company';
  private media = 'http://localhost:5050/api/Media';

  constructor(private http: HttpClient) {}


  private h() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    });
  }


  // ==========================================
  // COMPANIES
  // ==========================================

  getCompanies() {
    return this.http.get<any[]>(this.api);
  }


  getCompany(id: number) {
    return this.http.get<any>(
      `${this.api}/${id}`
    );
  }


  createCompany(data: any) {
    return this.http.post<{ id: number }>(
      this.api,
      data,
      {
        headers: this.h(),
      }
    );
  }


  updateCompany(id: number, data: any) {
    return this.http.put(
      `${this.api}/${id}`,
      data,
      {
        headers: this.h(),
      }
    );
  }


  deleteCompany(id: number) {
    return this.http.delete(
      `${this.api}/${id}`,
      {
        headers: this.h(),
      }
    );
  }


  // ==========================================
  // MEDIA
  // ==========================================

  getMedia(id: number) {
    return this.http.get<any[]>(
      `${this.media}/entity/${id}/Company`
    );
  }


  deleteMedia(id: number) {
    return this.http.delete(
      `${this.media}/${id}`,
      {
        headers: this.h(),
      }
    );
  }


  // ==========================================
  // GENERIC COMPANY IMAGE UPLOAD
  // ==========================================

  uploadCompanyMedia(
    file: File,
    companyId: number,
    displayOrder: number
  ) {

    const fd = new FormData();

    fd.append('file', file);

    fd.append(
      'entityId',
      String(companyId)
    );

    fd.append(
      'entityType',
      'Company'
    );

    fd.append(
      'type',
      'Image'
    );

    fd.append(
      'displayOrder',
      String(displayOrder)
    );


    return this.http.post<{ url: string }>(
      `${this.media}/upload`,
      fd,
      {
        headers: this.h(),
      }
    );
  }


  // ==========================================
  // LOGO
  // displayOrder = 0
  // ==========================================

  uploadCompanyImage(
    file: File,
    id: number
  ) {

    return this.uploadCompanyMedia(
      file,
      id,
      0
    );
  }


  // ==========================================
  // HERO IMAGE
  // displayOrder = 1
  // ==========================================

  uploadHeroImage(
    file: File,
    id: number
  ) {

    return this.uploadCompanyMedia(
      file,
      id,
      1
    );
  }


  // ==========================================
  // OVERVIEW IMAGE
  // displayOrder = 2
  // ==========================================

  uploadOverviewImage(
    file: File,
    id: number
  ) {

    return this.uploadCompanyMedia(
      file,
      id,
      2
    );
  }


  // ==========================================
  // WHY CHOOSE US IMAGE
  // displayOrder = 3
  // ==========================================

  uploadWhyChooseUsImage(
    file: File,
    id: number
  ) {

    return this.uploadCompanyMedia(
      file,
      id,
      3
    );
  }


  // ==========================================
  // GET IMAGE BY DISPLAY ORDER
  // ==========================================

  getImageByOrder(
    company: any,
    displayOrder: number
  ) {

    const media =
      company.media?.find(
        (m: any) =>
          m.displayOrder === displayOrder
      );

    const url = media?.url;

    if (!url) {
      return '';
    }

    return url.startsWith('http')
      ? url
      : `http://localhost:5050${url}`;
  }


  // ==========================================
  // LOGO IMAGE
  // ==========================================

  image(c: any) {

    const media =
      c.media?.find(
        (m: any) =>
          m.displayOrder === 0
      );

    const u =
      media?.url ||
      c.logoUrl;


    return u
      ? u.startsWith('http')
        ? u
        : `http://localhost:5050${u}`
      : '';
  }
}