import { SiteFooter } from '../../components/site-footer/site-footer';
import { LanguageToggle } from '../../components/language-toggle/language-toggle';
import { TranslatePipe } from '../../services/translate.pipe';

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Company, CompanyItem } from '../../services/company';
import { NewsService, NewsItem } from '../../services/news';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-home',
  imports: [SiteFooter, LanguageToggle, TranslatePipe, RouterLink, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  companies: CompanyItem[] = [];
  news: NewsItem[] = [];

  private scrollListener?: () => void;

  constructor(
    private renderer: Renderer2,
    public companyApi: Company,
    public newsApi: NewsService,
    public lang: LanguageService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // ================= COMPANIES =================

    this.companyApi.getCompanies().subscribe({
      next: (data) => {
        this.companies = data.filter((company) => company.isActive);

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Could not load companies:', error);
      },
    });

    // ================= NEWS =================

    this.newsApi.getPublished().subscribe({
      next: (data) => {
        // نفس الأخبار في العربي والإنجليزي
        // اللغة تغيّر النص فقط ولا تغيّر البيانات
        this.news = [...data].slice(0, 4);

        console.log('Home news:', this.news);

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Could not load news:', error);
      },
    });
  }

  ngAfterViewInit(): void {
    this.startCounters();

    // ================= NAVBAR =================

    // ================= NAVBAR =================

    const navbar = document.querySelector<HTMLElement>('.hero-nav');

    if (navbar) {
      this.scrollListener = this.renderer.listen('window', 'scroll', () => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        const scrollTop = window.scrollY;

        const pageHeight =
          document.documentElement.scrollHeight - document.documentElement.clientHeight;

        const scrollPercentage = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

        navbar.style.setProperty('--scroll-width', scrollPercentage + '%');
      });
    }

    // ================= MOBILE MENU =================

    const homeMenu = document.querySelector<HTMLElement>('.hero-nav .menu');

    const homeLinks = document.querySelector<HTMLElement>('.hero-nav nav');

    if (homeMenu && homeLinks) {
      this.renderer.listen(homeMenu, 'click', () => {
        homeLinks.classList.toggle('menu-open');
      });
    }
  }

  private startCounters(): void {
    setTimeout(() => {
      const counters = document.querySelectorAll<HTMLElement>('.stat-num');

      const duration = 2000;

      counters.forEach((counter) => {
        const target = Number(counter.getAttribute('data-count'));

        const startTime = performance.now();

        const update = (currentTime: number) => {
          const timePassed = currentTime - startTime;

          const progress = Math.min(timePassed / duration, 1);

          const currentNumber = Math.floor(progress * target);

          counter.textContent = currentNumber + '+';

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            counter.textContent = target + '+';
          }
        };

        requestAnimationFrame(update);
      });
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      this.scrollListener();
    }
  }
}
