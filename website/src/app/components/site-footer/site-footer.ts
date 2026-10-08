import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Company, CompanyItem } from '../../services/company';
import { LanguageService } from '../../services/language';
import { TranslatePipe } from '../../services/translate.pipe';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './site-footer.html',
  styleUrls: ['./site-footer.scss'],
})
export class SiteFooter implements OnInit {
  @Input() variant: 'home' | 'pages' = 'pages';
  companies: CompanyItem[] = [];

  constructor(
    private companyApi: Company,
    public lang: LanguageService
  ) {}

  ngOnInit(): void {
    this.companyApi.getCompanies().subscribe({
      next: (data) => {
        this.companies = (data || []).filter(company => company.isActive);
      },
      error: (error) => {
        console.error('Could not load footer companies:', error);
        this.companies = [];
      }
    });
  }

  companyName(company: CompanyItem): string {
    return this.lang.pick(company.name_Ar, company.name_En);
  }
}
