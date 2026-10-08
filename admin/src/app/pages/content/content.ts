
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../services/content';

@Component({
  imports: [FormsModule],
  selector: 'app-content',
  templateUrl: './content.html',
  styleUrl: './content.scss',
})
export class ContentAdmin implements OnInit {

  items = signal<any[]>([]);

  editingId: number | null = null;

  form = {
    key: '',
    pageName: 'Home',
    value_En: '',
    value_Ar: ''
  };

  constructor(private api: ContentService) {}

  ngOnInit(): void {
    this.load();
  }

  // LOAD ALL CONTENT
  load(): void {
    this.api.all().subscribe({
      next: (data) => {
        this.items.set(data);
      },
      error: (error) => {
        console.error('Error loading content:', error);
      }
    });
  }

  // ADD OR UPDATE CONTENT
  save(): void {

    if (
      !this.form.key.trim() ||
      !this.form.pageName.trim() ||
      !this.form.value_En.trim() ||
      !this.form.value_Ar.trim()
    ) {
      alert('Please fill in all fields.');
      return;
    }

    if (this.editingId !== null) {

      this.api.update(this.editingId, {
        id: this.editingId,
        value_En: this.form.value_En,
        value_Ar: this.form.value_Ar
      }).subscribe({
        next: () => {
          this.reset();
          this.load();
        },
        error: (error) => {
          console.error('Error updating content:', error);
          alert('Could not update content.');
        }
      });

    } else {

      this.api.create(this.form).subscribe({
        next: () => {
          this.reset();
          this.load();
        },
        error: (error) => {
          console.error('Error creating content:', error);
          alert('Could not add content.');
        }
      });

    }
  }

  // EDIT CONTENT
  edit(x: any): void {
    this.editingId = x.id;

    this.form = {
      key: x.key,
      pageName: x.pageName,
      value_En: x.value_En,
      value_Ar: x.value_Ar
    };
  }

  // RESET FORM
  reset(): void {
    this.editingId = null;

    this.form = {
      key: '',
      pageName: 'Home',
      value_En: '',
      value_Ar: ''
    };
  }

  // DELETE CONTENT
  remove(id: number): void {
    if (confirm('Delete this content item?')) {
      this.api.delete(id).subscribe({
        next: () => {
          this.load();
        },
        error: (error) => {
          console.error('Error deleting content:', error);
          alert('Could not delete content.');
        }
      });
    }
  }
}
