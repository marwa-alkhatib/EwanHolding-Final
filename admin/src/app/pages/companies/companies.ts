import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Company } from '../../services/company';

@Component({
  imports: [RouterLink],
  selector: 'app-companies',
  styleUrl: './companies.scss',
  templateUrl: './companies.html',
})
export class Companies implements OnInit {
  companies: any[] = [];

  constructor(
    public api: Company,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.getCompanies().subscribe({
      next: (data) => {
        this.companies = [...data];

        console.log('Companies loaded:', this.companies);

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Could not load companies:', error);
      },
    });
  }

  get activeCount() {
    return this.companies.filter((company) => company.isActive).length;
  }

  delete(id: number) {
    if (confirm('Delete this company?')) {
      this.api.deleteCompany(id).subscribe({
        next: () => {
          this.load();
        },

        error: (error) => {
          console.error('Could not delete company:', error);
        },
      });
    }
  }
}
