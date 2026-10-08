import { SiteFooter } from '../../components/site-footer/site-footer';
import { LanguageToggle } from '../../components/language-toggle/language-toggle';
import { TranslatePipe } from '../../services/translate.pipe';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Company } from '../../services/company';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-companies',
  imports: [SiteFooter, LanguageToggle, TranslatePipe, RouterLink],
  templateUrl: './companies.html',
  styleUrl: './companies.scss',
})
export class Companies implements OnInit, AfterViewInit {
  companies: any[] = [];

  constructor(
    private companyService: Company,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    public lang: LanguageService,
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data.filter((company) => company.isActive);

        this.cdr.detectChanges();

        console.log('Companies:', this.companies);
        console.log('Number of companies:', this.companies.length);
      },

      error: (error) => {
        console.error('Error loading companies:', error);
      },
    });
  }

  image(company: any) {
    return this.companyService.image(company);
  }

  ngAfterViewInit(): void {
    const pagesMenu = document.querySelector<HTMLElement>('.pages-navbar-menu');

    const pagesLinks = document.querySelector<HTMLElement>('.pages-navbar-links');

    if (pagesMenu && pagesLinks) {
      this.renderer.listen(pagesMenu, 'click', () => {
        pagesLinks.classList.toggle('menu-open');
      });
    }
  }
}
