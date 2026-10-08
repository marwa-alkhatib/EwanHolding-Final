import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentAdminService } from '../../services/investment';
import { Company } from '../../services/company';

@Component({
  imports: [FormsModule],
  selector: 'app-investments',
  templateUrl: './investments.html',
  styleUrls: ['../companies/companies.scss', './investments.scss'],
})
export class InvestmentsAdmin implements OnInit {
  items: any[] = [];
  companies: any[] = [];
  editId: number | null = null;

  f = {
    title_En: '',
    title_Ar: '',
    description_En: '',
    description_Ar: '',
    companyId: 0,
    status: 'Open',
  };

  constructor(
    private api: InvestmentAdminService,
    private company: Company,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.load();

    this.company.getCompanies().subscribe({
      next: (data) => {
        this.companies = [...data];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Could not load companies:', error);
      },
    });
  }

  load() {
    this.api.all().subscribe({
      next: (data) => {
        this.items = [...data];

        console.log('Investments loaded:', this.items);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Could not load investments:', error);
      },
    });
  }

  save() {
    const data = {
      ...this.f,
      companyId: Number(this.f.companyId),
    };

    if (this.editId) {
      const id = this.editId;

      this.api
        .update(id, {
          id,
          ...data,
        })
        .subscribe({
          next: () => {
            this.reset();
            this.load();
          },
          error: (error) => {
            console.error('Could not update investment:', error);
          },
        });
    } else {
      this.api.create(data).subscribe({
        next: () => {
          this.reset();
          this.load();
        },
        error: (error) => {
          console.error('Could not create investment:', error);
        },
      });
    }
  }

  edit(item: any) {
    this.editId = item.id;

    this.f = {
      title_En: item.title_En,
      title_Ar: item.title_Ar,
      description_En: item.description_En,
      description_Ar: item.description_Ar,
      companyId: item.companyId,
      status: item.status,
    };

    this.cdr.detectChanges();
  }

  reset() {
    this.editId = null;

    this.f = {
      title_En: '',
      title_Ar: '',
      description_En: '',
      description_Ar: '',
      companyId: 0,
      status: 'Open',
    };

    this.cdr.detectChanges();
  }

  remove(id: number) {
    if (confirm('Delete this investment opportunity?')) {
      this.api.delete(id).subscribe({
        next: () => {
          this.load();
        },
        error: (error) => {
          console.error('Could not delete investment:', error);
        },
      });
    }
  }
}
