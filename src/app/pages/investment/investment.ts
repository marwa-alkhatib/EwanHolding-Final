import { SiteFooter } from '../../components/site-footer/site-footer';
import { LanguageToggle } from '../../components/language-toggle/language-toggle';
import { TranslatePipe } from '../../services/translate.pipe';
import { AfterViewInit, Component, OnInit, Renderer2, ChangeDetectorRef } from '@angular/core';

import { InvestmentService } from '../../services/investment';
import { LanguageService } from '../../services/language';

@Component({
  imports: [SiteFooter, LanguageToggle, TranslatePipe],
  selector: 'app-investment',
  styleUrl: './investment.scss',
  templateUrl: './investment.html',
})
export class Investment implements OnInit, AfterViewInit {
  opportunities: any[] = [];

  constructor(
    private renderer: Renderer2,
    private api: InvestmentService,
    public lang: LanguageService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.api.all().subscribe({
      next: (data) => {
        this.opportunities = data.filter((item) => item.status === 'Open');

        console.log('Public investment opportunities:', this.opportunities);

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Could not load investment opportunities:', error);
      },
    });
  }

  ngAfterViewInit() {
    const menu = document.querySelector<HTMLElement>('.pages-navbar-menu');

    const links = document.querySelector<HTMLElement>('.pages-navbar-links');

    if (menu && links) {
      this.renderer.listen(menu, 'click', () => {
        links.classList.toggle('menu-open');
      });
    }
  }
}
