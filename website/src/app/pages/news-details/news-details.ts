import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { SiteFooter } from '../../components/site-footer/site-footer';
import { LanguageService } from '../../services/language';
import { NewsItem, NewsService } from '../../services/news';
import { TranslatePipe } from '../../services/translate.pipe';

@Component({
  selector: 'app-news-details',

  imports: [SiteFooter, TranslatePipe, RouterLink, DatePipe],

  templateUrl: './news-details.html',
  styleUrl: './news-details.scss',
})
export class NewsDetails implements OnInit {
  // =====================================================
  // MOBILE NAVIGATION
  // =====================================================

  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  // =====================================================
  // MAIN NEWS ITEM
  // =====================================================

  item = signal<NewsItem | null>(null);

  newsId = 0;

  loading = true;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    public api: NewsService,
    public lang: LanguageService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.closeMenu();

      const id = Number(params.get('id'));

      if (!id) {
        this.item.set(null);
        this.loading = false;
        this.notFound = true;
        return;
      }

      this.newsId = id;

      this.loadNews();
    });
  }

  // =====================================================
  // NEWS
  // =====================================================

  loadNews(): void {
    this.item.set(null);

    this.loading = true;
    this.notFound = false;

    this.api.get(this.newsId).subscribe({
      next: (news) => {
        this.item.set(news);

        this.loading = false;
        this.notFound = false;

        window.scrollTo({
          top: 0,
          behavior: 'auto',
        });
      },

      error: (error) => {
        console.error('Could not load news:', error);

        this.item.set(null);

        this.loading = false;
        this.notFound = true;
      },
    });
  }

  // =====================================================
  // NEWS TEXT
  // =====================================================

  title(): string {
    const news = this.item();

    if (!news) return '';

    return this.lang.pick(news.title_Ar, news.title_En);
  }

  description(): string {
    const news = this.item();

    if (!news) return '';

    return this.lang.pick(news.description_Ar, news.description_En);
  }

  category(): string {
    const news = this.item();

    if (!news) return '';

    return news.category || '';
  }

  // =====================================================
  // NEWS IMAGE
  // =====================================================

  image(): string {
    const news = this.item();

    if (!news) {
      return '/photos/newshero.png';
    }

    return this.api.image(news);
  }

  // =====================================================
  // PUBLISH DATE
  // =====================================================

  publishDate(): string {
    const news = this.item();

    if (!news) return '';

    return news.publishDate;
  }
}
