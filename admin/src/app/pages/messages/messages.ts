import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MessagesService } from '../../services/messages';

@Component({
  imports: [DatePipe],
  selector: 'app-messages',
  templateUrl: './messages.html',
  styleUrl: '../companies/companies.scss',
})
export class MessagesAdmin implements OnInit {
  items = signal<any[]>([]);

  constructor(private api: MessagesService) {}

  ngOnInit(): void {
    this.load();
  }

  // LOAD ALL MESSAGES
  load(): void {
    this.api.all().subscribe({
      next: (data) => {
        this.items.set(data);
      },
      error: (error) => {
        console.error('Could not load messages:', error);
      },
    });
  }

  // CHANGE MESSAGE STATUS
  toggle(x: any): void {
    const newStatus = x.status === 'Read' ? 'Unread' : 'Read';

    this.api.status(x.id, newStatus).subscribe({
      next: () => {
        this.load();
      },
      error: (error) => {
        console.error('Could not update message status:', error);
      },
    });
  }

  // DELETE MESSAGE
  remove(id: number): void {
    if (confirm('Delete this message?')) {
      this.api.delete(id).subscribe({
        next: () => {
          this.load();
        },
        error: (error) => {
          console.error('Could not delete message:', error);
        },
      });
    }
  }
}
