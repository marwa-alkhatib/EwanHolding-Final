import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './services/language';
@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  constructor(public lang: LanguageService) {}
}
