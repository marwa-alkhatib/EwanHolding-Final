import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from './language';
@Pipe({ name: 'tr', standalone: true, pure: false })
export class TranslatePipe implements PipeTransform {
  constructor(private lang: LanguageService) {}
  transform(value: string) {
    return this.lang.translate(value);
  }
}
