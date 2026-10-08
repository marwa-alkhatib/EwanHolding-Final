import { SiteFooter } from '../../components/site-footer/site-footer';
import { LanguageToggle } from '../../components/language-toggle/language-toggle';
import { TranslatePipe } from '../../services/translate.pipe';
import { AfterViewInit, Component, Renderer2 } from '@angular/core';

@Component({
  imports: [SiteFooter, LanguageToggle, TranslatePipe],
  selector: 'app-logistics',
  styleUrl: './logistics.scss',
  templateUrl: './logistics.html',
})
export class Logistics implements AfterViewInit {
  constructor(private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    const menu = document.querySelector<HTMLElement>('.pages-navbar-menu');
    const links = document.querySelector<HTMLElement>('.pages-navbar-links');
    if (menu && links)
      this.renderer.listen(menu, 'click', () => links.classList.toggle('menu-open'));
  }
}
