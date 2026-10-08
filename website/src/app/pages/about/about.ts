import { SiteFooter } from '../../components/site-footer/site-footer';
import { LanguageToggle } from '../../components/language-toggle/language-toggle';
import { TranslatePipe } from '../../services/translate.pipe';
import { LanguageService } from '../../services/language';

import { AfterViewInit, Component, Renderer2 } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [SiteFooter, LanguageToggle, TranslatePipe, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    public lang: LanguageService,
  ) {}

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
