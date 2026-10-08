import { SiteFooter } from '../../components/site-footer/site-footer';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Company, CompanyItem, MediaItem } from '../../services/company';

import { CompanyService, CompanyServiceItem } from '../../services/company-service';

import { CompanyFeature, CompanyFeatureItem } from '../../services/company-feature';

import { LanguageService } from '../../services/language';
import { TranslatePipe } from '../../services/translate.pipe';
import { LanguageToggle } from '../../components/language-toggle/language-toggle';

@Component({
  selector: 'app-company-details',

  imports: [SiteFooter, TranslatePipe, LanguageToggle, RouterLink],

  templateUrl: './company-details.html',
  styleUrl: './company-details.scss',
})
export class CompanyDetails implements OnInit {
  // MAIN COMPANY
  company = signal<CompanyItem | null>(null);
  menuOpen = false;
  media: MediaItem[] = [];
  services: CompanyServiceItem[] = [];
  features: CompanyFeatureItem[] = [];
  otherCompanies: CompanyItem[] = [];

  logoImage = '';
  heroImage = '';
  overviewImage = '';
  whyChooseUsImage = '';

  companyId = 0;

  constructor(
    private route: ActivatedRoute,
    public api: Company,
    private companyServiceApi: CompanyService,
    private companyFeatureApi: CompanyFeature,
    public lang: LanguageService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      if (!id) {
        this.company.set(null);
        return;
      }

      this.companyId = id;

      this.loadCompany();
    });
  }

  // =====================================================
  // COMPANY
  // =====================================================

  loadCompany(): void {
    this.company.set(null);

    this.api.getCompany(this.companyId).subscribe({
      next: (company) => {
        // COMPANY
        this.company.set(company);
        console.log('COMPANY DATA:', company);
        console.log('Overview AR:', company.overviewTitle_Ar);
        console.log('Description 1 AR:', company.overviewDescription1_Ar);
        console.log('Description 2 AR:', company.overviewDescription2_Ar);

        // MEDIA
        this.media = company.media || [];

        this.logoImage =
          this.api.getImageByOrder(this.media, 0) || this.api.fullImageUrl(company.logoUrl);

        this.heroImage = this.api.getImageByOrder(this.media, 1);

        this.overviewImage = this.api.getImageByOrder(this.media, 2);

        this.whyChooseUsImage = this.api.getImageByOrder(this.media, 3);

        // LOAD REST OF DATA
        this.loadServices();
        this.loadFeatures();
        this.loadOtherCompanies();

        window.scrollTo({
          top: 0,
          behavior: 'auto',
        });
      },

      error: (error) => {
        console.error('Could not load company:', error);

        this.company.set(null);
      },
    });
  }

  // =====================================================
  // SERVICES
  // =====================================================

  loadServices(): void {
    this.companyServiceApi.getByCompanyId(this.companyId).subscribe({
      next: (services) => {
        this.services = (services || []).sort(
          (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0),
        );
      },

      error: (error) => {
        console.error('Could not load services:', error);

        this.services = [];
      },
    });
  }

  // =====================================================
  // FEATURES
  // =====================================================

  loadFeatures(): void {
    this.companyFeatureApi.getByCompanyId(this.companyId).subscribe({
      next: (features) => {
        this.features = (features || []).sort(
          (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0),
        );
      },

      error: (error) => {
        console.error('Could not load features:', error);

        this.features = [];
      },
    });
  }

  // =====================================================
  // OTHER COMPANIES
  // =====================================================

  loadOtherCompanies(): void {
    this.api.getCompanies().subscribe({
      next: (companies) => {
        this.otherCompanies = (companies || [])
          .filter((company) => company.id !== this.companyId && company.isActive)
          .slice(0, 3);
      },

      error: (error) => {
        console.error('Could not load other companies:', error);

        this.otherCompanies = [];
      },
    });
  }

  // =====================================================
  // COMPANY TEXT
  // =====================================================

  companyName(): string {
    const company = this.company();

    if (!company) return '';

    return this.lang.pick(company.name_Ar, company.name_En);
  }

  companyDescription(): string {
    const company = this.company();

    if (!company) return '';

    return this.lang.pick(company.description_Ar, company.description_En);
  }

  // =====================================================
  // HERO
  // =====================================================

  heroTitle(): string {
    const company = this.company();

    if (!company) return '';

    return this.lang.pick(company.heroTitle_Ar, company.heroTitle_En);
  }

  heroDescription(): string {
    const company = this.company();

    if (!company) return '';

    return this.lang.pick(company.heroDescription_Ar, company.heroDescription_En);
  }

  // =====================================================
  // OVERVIEW
  // =====================================================

  overviewTitle(): string {
    const company = this.company();

    if (!company) return '';

    return this.lang.pick(company.overviewTitle_Ar, company.overviewTitle_En);
  }

  overviewDescription1(): string {
    const company = this.company();

    if (!company) return '';

    return this.lang.pick(company.overviewDescription1_Ar, company.overviewDescription1_En);
  }

  overviewDescription2(): string {
    const company = this.company();

    if (!company) return '';

    return this.lang.pick(company.overviewDescription2_Ar, company.overviewDescription2_En);
  }

  // =====================================================
  // SERVICES
  // =====================================================

  serviceName(service: CompanyServiceItem): string {
    return this.lang.pick(service.name_Ar, service.name_En);
  }

  serviceDescription(service: CompanyServiceItem): string {
    return this.lang.pick(service.description_Ar, service.description_En);
  }

  // =====================================================
  // WHY CHOOSE US
  // =====================================================

  whyChooseUsTitle(): string {
    const company = this.company();

    if (!company) return '';

    return this.lang.pick(company.whyChooseUsTitle_Ar, company.whyChooseUsTitle_En);
  }

  featureTitle(feature: CompanyFeatureItem): string {
    return this.lang.pick(feature.title_Ar, feature.title_En);
  }

  featureDescription(feature: CompanyFeatureItem): string {
    return this.lang.pick(feature.description_Ar, feature.description_En);
  }

  // =====================================================
  // OTHER COMPANIES
  // =====================================================

  otherCompanyName(company: CompanyItem): string {
    return this.lang.pick(company.name_Ar, company.name_En);
  }

  otherCompanyDescription(company: CompanyItem): string {
    return this.lang.pick(company.description_Ar, company.description_En);
  }

  otherCompanyImage(company: CompanyItem): string {
    return this.api.image(company);
  }

  // =====================================================
  // NUMBER
  // =====================================================

  number(index: number): string {
    return String(index + 1).padStart(2, '0');
  }
}
