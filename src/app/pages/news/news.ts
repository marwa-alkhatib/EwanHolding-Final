import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SiteFooter } from '../../components/site-footer/site-footer';
import { TranslatePipe } from '../../services/translate.pipe';
import { NewsService, NewsItem } from '../../services/news';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-news',
  imports: [SiteFooter, TranslatePipe, RouterLink, DatePipe],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News implements OnInit {
  menuOpen = false;

  items: NewsItem[] = [];

  constructor(
    public api: NewsService,
    public lang: LanguageService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.api.getPublished().subscribe({
      next: (data) => {
        this.items = [...data];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Could not load news:', error);
      },
    });
  }
}
