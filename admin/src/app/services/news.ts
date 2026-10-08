import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NewsAdminService {
  private api = 'http://localhost:5050/api/News';
  private media = 'http://localhost:5050/api/Media';

  constructor(private http: HttpClient) {}

  private h() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    });
  }

  getAll() {
    return this.http.get<any[]>(this.api, {
      headers: this.h()
    });
  }

  get(id: number) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  create(d: any) {
    return this.http.post<{ id: number }>(
      this.api,
      d,
      { headers: this.h() }
    );
  }

  update(id: number, d: any) {
    return this.http.put(
      `${this.api}/${id}`,
      d,
      { headers: this.h() }
    );
  }

  delete(id: number) {
    return this.http.delete(
      `${this.api}/${id}`,
      { headers: this.h() }
    );
  }

  /* ================= MEDIA ================= */

  getMedia(id: number) {
    return this.http.get<any[]>(
      `${this.media}/entity/${id}/News`
    );
  }

  deleteMedia(id: number) {
    return this.http.delete(
      `${this.media}/${id}`,
      { headers: this.h() }
    );
  }

  upload(file: File, id: number) {
    const f = new FormData();

    f.append('file', file);
    f.append('entityId', String(id));
    f.append('entityType', 'News');
    f.append('type', 'Image');
    f.append('displayOrder', '0');

    return this.http.post(
      `${this.media}/upload`,
      f,
      { headers: this.h() }
    );
  }

  image(n: any) {
    const u = n.media?.[0]?.url;

    return u
      ? (u.startsWith('http')
          ? u
          : `http://localhost:5050${u}`)
      : '';
  }
}