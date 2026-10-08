import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsAdminService } from '../../services/news';

@Component({
  imports: [RouterLink],
  selector: 'app-news-admin',
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class NewsAdmin implements OnInit {
  items: any[] = [];

  constructor(
    private api: NewsAdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.getAll().subscribe({
      next: (data) => {
        this.items = [...data];

        console.log('News loaded:', this.items);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Could not load news:', error);
      },
    });
  }

  remove(id: number) {
    if (confirm('Delete this news article?')) {
      this.api.delete(id).subscribe({
        next: () => {
          this.load();
        },
        error: (error) => {
          console.error('Could not delete news:', error);
        },
      });
    }
  }
}
