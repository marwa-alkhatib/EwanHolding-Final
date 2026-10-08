import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NewsMediaItem {
  id?: number;
  url: string;
  displayOrder?: number;
  type?: string;
}

export interface NewsItem {
  id: number;
  title_Ar: string;
  title_En: string;
  description_Ar: string;
  description_En: string;
  category?: string;
  publishDate: string;
  status: string;
  media: NewsMediaItem[];
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly api = 'http://localhost:5050/api/News';

  constructor(private http: HttpClient) {}

  getPublished(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(`${this.api}/published`);
  }

  get(id: number): Observable<NewsItem> {
    return this.http.get<NewsItem>(`${this.api}/${id}`);
  }

  image(news: NewsItem): string {
    const media = [...(news.media || [])].sort(
      (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
    );
    const url = media[0]?.url;

    if (!url) return '/photos/newshero.png';
    return url.startsWith('http') ? url : `http://localhost:5050${url}`;
  }
}
