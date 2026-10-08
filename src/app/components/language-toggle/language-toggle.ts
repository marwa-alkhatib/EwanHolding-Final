import { Component, Input } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-language-toggle',
  standalone: true,

  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: auto;
        height: auto;
      }

      .language-switch {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;

        width: 100px;
        min-width: 100px;
        height: 44px;
        min-height: 44px;

        padding: 0 16px;
        margin: 0;

        background: transparent !important;
        color: #dcb679 !important;
        border: 1px solid #dcb679 !important;
        border-radius: 0;

        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        font-weight: 600;
        line-height: 1;

        cursor: pointer;
        opacity: 1;

        transition:
          background 0.3s ease,
          color 0.3s ease,
          border-color 0.3s ease;
      }

      .language-switch:hover {
        background: #0e1a33 !important;
        color: #dcb679 !important;
      }

      .language-switch--hero {
        width: 90px;
        min-width: 90px;
        height: 40px;
        min-height: 40px;
        padding: 0 12px;
      }

      .language-switch span {
        display: inline-block;
        color: inherit !important;
        font-size: inherit;
        font-weight: inherit;
        line-height: 1;
        white-space: nowrap;
      }

      @media (max-width: 767px) {
        .language-switch {
          width: 85px;
          min-width: 85px;
          height: 38px;
          min-height: 38px;
          padding: 0 10px;
          font-size: 14px;
        }

        .language-switch--hero {
          width: 80px;
          min-width: 80px;
          height: 36px;
          min-height: 36px;
        }
      }
    `,
  ],

  template: `
    <button
      type="button"
      [class]="variant === 'hero' ? 'language-switch language-switch--hero' : 'language-switch'"
      (click)="lang.toggle()"
      [attr.aria-label]="lang.language() === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'"
    >
      <span>
        {{ lang.language() === 'ar' ? 'EN' : 'عربي' }}
      </span>
    </button>
  `,
})
export class LanguageToggle {
  @Input() variant: 'pages' | 'hero' = 'pages';

  constructor(public lang: LanguageService) {}
}
