import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { Company } from '../../services/company';
import { CompanyFeature } from '../../services/company-feature';
import { CompanyService } from '../../services/company-service';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-add-company',
  styleUrl: './add-company.scss',
  templateUrl: './add-company.html',
})
export class AddCompany implements OnInit {
  saving = false;
  error = '';
  editId: number | null = null;

  existingLogo = '';

  // ==========================================
  // COMPANY MEDIA
  // 0 = Logo
  // 1 = Hero
  // 2 = Overview
  // 3 = Why Choose Us
  // ==========================================

  selectedFile: File | null = null;
  heroFile: File | null = null;
  overviewFile: File | null = null;
  whyChooseUsFile: File | null = null;

  preview = '';
  heroPreview = '';
  overviewPreview = '';
  whyChooseUsPreview = '';

  logoMediaId: number | null = null;
  heroMediaId: number | null = null;
  overviewMediaId: number | null = null;
  whyChooseUsMediaId: number | null = null;

  // ==========================================
  // COMPANY DATA
  // ==========================================

  company = {
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    websiteUrl: '',
    isActive: true,

    heroTitleEn: '',
    heroTitleAr: '',
    heroDescriptionEn: '',
    heroDescriptionAr: '',

    overviewTitleEn: '',
    overviewTitleAr: '',
    overviewDescription1En: '',
    overviewDescription1Ar: '',
    overviewDescription2En: '',
    overviewDescription2Ar: '',

    whyChooseUsTitleEn: '',
    whyChooseUsTitleAr: '',
  };

  // ==========================================
  // WHY CHOOSE US ITEMS
  // ==========================================

  features: any[] = [];

  // ==========================================
  // SERVICES
  // ==========================================

  services: any[] = [];

  constructor(
    private api: Company,
    private featureApi: CompanyFeature,
    private companyServiceApi: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  // ==========================================
  // LOAD COMPANY
  // ==========================================

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      return;
    }

    this.editId = id;

    // ========================================
    // LOAD COMPANY DATA
    // ========================================

    this.api.getCompany(id).subscribe({
      next: (c) => {
        this.company = {
          nameEn: c.name_En || '',

          nameAr: c.name_Ar || '',

          descriptionEn: c.description_En || '',

          descriptionAr: c.description_Ar || '',

          websiteUrl: c.websiteUrl || '',

          isActive: c.isActive,

          heroTitleEn: c.heroTitle_En || '',

          heroTitleAr: c.heroTitle_Ar || '',

          heroDescriptionEn: c.heroDescription_En || '',

          heroDescriptionAr: c.heroDescription_Ar || '',

          overviewTitleEn: c.overviewTitle_En || '',

          overviewTitleAr: c.overviewTitle_Ar || '',

          overviewDescription1En: c.overviewDescription1_En || '',

          overviewDescription1Ar: c.overviewDescription1_Ar || '',

          overviewDescription2En: c.overviewDescription2_En || '',

          overviewDescription2Ar: c.overviewDescription2_Ar || '',

          whyChooseUsTitleEn: c.whyChooseUsTitle_En || '',

          whyChooseUsTitleAr: c.whyChooseUsTitle_Ar || '',
        };

        this.existingLogo = c.logoUrl || '';
      },

      error: () => {
        this.error = 'Could not load company.';
      },
    });

    // ========================================
    // LOAD COMPANY MEDIA
    // ========================================

    this.api.getMedia(id).subscribe({
      next: (media) => {
        console.log('COMPANY MEDIA:', media);

        this.loadMedia(media || []);
      },

      error: (e) => {
        console.error('Could not load company media', e);
      },
    });

    // ========================================
    // LOAD WHY CHOOSE US ITEMS
    // ========================================

    this.featureApi.getByCompanyId(id).subscribe({
      next: (data) => {
        this.features = data.map((f: any) => ({
          id: f.id,

          titleEn: f.title_En || '',

          titleAr: f.title_Ar || '',

          descriptionEn: f.description_En || '',

          descriptionAr: f.description_Ar || '',

          displayOrder: f.displayOrder || 1,

          isDeleted: false,
        }));
      },

      error: (e) => {
        console.error('Could not load company features', e);
      },
    });

    // ========================================
    // LOAD SERVICES
    // ========================================

    this.companyServiceApi.getByCompanyId(id).subscribe({
      next: (data) => {
        this.services = data.map((s: any) => ({
          id: s.id,

          nameEn: s.name_En || '',

          nameAr: s.name_Ar || '',

          descriptionEn: s.description_En || '',

          descriptionAr: s.description_Ar || '',

          isDeleted: false,
        }));
      },

      error: (e) => {
        console.error('Could not load company services', e);
      },
    });
  }

  // ==========================================
  // LOAD COMPANY MEDIA
  // ==========================================

  private loadMedia(media: any[]) {
    const logo = media.find((m: any) => m.displayOrder === 0);

    const hero = media.find((m: any) => m.displayOrder === 1);

    const overview = media.find((m: any) => m.displayOrder === 2);

    const whyChooseUs = media.find((m: any) => m.displayOrder === 3);

    this.logoMediaId = logo?.id ?? null;

    this.heroMediaId = hero?.id ?? null;

    this.overviewMediaId = overview?.id ?? null;

    this.whyChooseUsMediaId = whyChooseUs?.id ?? null;

    this.preview = this.mediaUrl(logo?.url) || this.mediaUrl(this.existingLogo);

    this.heroPreview = this.mediaUrl(hero?.url);

    this.overviewPreview = this.mediaUrl(overview?.url);

    this.whyChooseUsPreview = this.mediaUrl(whyChooseUs?.url);
  }

  private mediaUrl(url: string | null | undefined) {
    if (!url) {
      return '';
    }

    return url.startsWith('http') ? url : `http://localhost:5050${url}`;
  }

  // ==========================================
  // WHY CHOOSE US ITEMS
  // ==========================================

  addFeature() {
    this.features.push({
      id: null,

      titleEn: '',
      titleAr: '',

      descriptionEn: '',
      descriptionAr: '',

      displayOrder: this.features.filter((x) => !x.isDeleted).length + 1,

      isDeleted: false,
    });
  }

  removeFeature(index: number) {
    const feature = this.features[index];

    if (feature.id) {
      feature.isDeleted = true;
    } else {
      this.features.splice(index, 1);
    }
  }

  // ==========================================
  // SERVICES
  // ==========================================

  addService() {
    this.services.push({
      id: null,

      nameEn: '',
      nameAr: '',

      descriptionEn: '',
      descriptionAr: '',

      isDeleted: false,
    });
  }

  removeService(index: number) {
    const service = this.services[index];

    if (service.id) {
      service.isDeleted = true;
    } else {
      this.services.splice(index, 1);
    }
  }

  // ==========================================
  // LOGO IMAGE
  // ==========================================

  onFileSelected(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];

    if (!file) {
      return;
    }

    this.selectedFile = file;

    this.preview = this.makePreview(file, this.preview);
  }

  // ==========================================
  // HERO IMAGE
  // ==========================================

  onHeroFileSelected(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];

    if (!file) {
      return;
    }

    this.heroFile = file;

    this.heroPreview = this.makePreview(file, this.heroPreview);
  }

  // ==========================================
  // OVERVIEW IMAGE
  // ==========================================

  onOverviewFileSelected(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];

    if (!file) {
      return;
    }

    this.overviewFile = file;

    this.overviewPreview = this.makePreview(file, this.overviewPreview);
  }

  // ==========================================
  // WHY CHOOSE US IMAGE
  // ==========================================

  onWhyChooseUsFileSelected(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];

    if (!file) {
      return;
    }

    this.whyChooseUsFile = file;

    this.whyChooseUsPreview = this.makePreview(file, this.whyChooseUsPreview);
  }

  // ==========================================
  // CREATE IMAGE PREVIEW
  // ==========================================

  private makePreview(file: File, oldPreview: string) {
    if (oldPreview.startsWith('blob:')) {
      URL.revokeObjectURL(oldPreview);
    }

    return URL.createObjectURL(file);
  }

  // ==========================================
  // SAVE COMPANY
  // ==========================================

  saveCompany() {
    if (this.saving) {
      return;
    }

    if (
      !this.company.nameEn.trim() ||
      !this.company.nameAr.trim() ||
      !this.company.descriptionEn.trim() ||
      !this.company.descriptionAr.trim()
    ) {
      this.error = 'Please complete all required fields.';

      return;
    }

    this.saving = true;

    this.error = '';

    const base = {
      name_En: this.company.nameEn.trim(),

      name_Ar: this.company.nameAr.trim(),

      description_En: this.company.descriptionEn.trim(),

      description_Ar: this.company.descriptionAr.trim(),

      websiteUrl: this.company.websiteUrl.trim(),

      logoUrl: this.existingLogo,

      isActive: this.company.isActive,

      // Hero

      heroTitle_En: this.company.heroTitleEn.trim(),

      heroTitle_Ar: this.company.heroTitleAr.trim(),

      heroDescription_En: this.company.heroDescriptionEn.trim(),

      heroDescription_Ar: this.company.heroDescriptionAr.trim(),

      // Overview

      overviewTitle_En: this.company.overviewTitleEn.trim(),

      overviewTitle_Ar: this.company.overviewTitleAr.trim(),

      overviewDescription1_En: this.company.overviewDescription1En.trim(),

      overviewDescription1_Ar: this.company.overviewDescription1Ar.trim(),

      overviewDescription2_En: this.company.overviewDescription2En.trim(),

      overviewDescription2_Ar: this.company.overviewDescription2Ar.trim(),

      // Why Choose Us

      whyChooseUsTitle_En: this.company.whyChooseUsTitleEn.trim(),

      whyChooseUsTitle_Ar: this.company.whyChooseUsTitleAr.trim(),
    };

    // ========================================
    // EDIT COMPANY
    // ========================================

    if (this.editId) {
      const id = this.editId;

      this.api
        .updateCompany(id, {
          id,
          ...base,
        })
        .subscribe({
          next: () => {
            this.saveFeatures(id);
          },

          error: (e) => {
            this.fail(e);
          },
        });

      return;
    }

    // ========================================
    // CREATE COMPANY
    // ========================================

    this.api.createCompany(base).subscribe({
      next: (r) => {
        this.saveFeatures(r.id);
      },

      error: (e) => {
        this.fail(e);
      },
    });
  }

  // ==========================================
  // SAVE WHY CHOOSE US ITEMS
  // ==========================================

  private saveFeatures(companyId: number) {
    const requests: any[] = [];

    this.features.forEach((feature) => {
      // DELETE

      if (feature.id && feature.isDeleted) {
        requests.push(this.featureApi.delete(feature.id));

        return;
      }

      if (feature.isDeleted) {
        return;
      }

      // Ignore completely empty item

      if (!feature.titleEn.trim() && !feature.titleAr.trim()) {
        return;
      }

      const data = {
        title_En: feature.titleEn.trim(),

        title_Ar: feature.titleAr.trim(),

        description_En: feature.descriptionEn.trim(),

        description_Ar: feature.descriptionAr.trim(),

        displayOrder: Number(feature.displayOrder),

        companyId: companyId,
      };

      // UPDATE

      if (feature.id) {
        requests.push(
          this.featureApi.update(feature.id, {
            id: feature.id,

            ...data,
          }),
        );
      }

      // CREATE
      else {
        requests.push(this.featureApi.create(data));
      }
    });

    if (requests.length === 0) {
      this.saveServices(companyId);

      return;
    }

    forkJoin(requests).subscribe({
      next: () => {
        this.saveServices(companyId);
      },

      error: (e) => {
        console.error(e);

        this.error = 'Company saved, but Why Choose Us items could not be saved.';

        this.saving = false;
      },
    });
  }

  // ==========================================
  // SAVE SERVICES
  // ==========================================

  private saveServices(companyId: number) {
    const requests: any[] = [];

    this.services.forEach((service) => {
      // DELETE

      if (service.id && service.isDeleted) {
        requests.push(this.companyServiceApi.delete(service.id));

        return;
      }

      if (service.isDeleted) {
        return;
      }

      // Ignore completely empty service

      if (!service.nameEn.trim() && !service.nameAr.trim()) {
        return;
      }

      const data = {
        name_En: service.nameEn.trim(),

        name_Ar: service.nameAr.trim(),

        description_En: service.descriptionEn.trim(),

        description_Ar: service.descriptionAr.trim(),

        companyId: companyId,
      };

      // UPDATE

      if (service.id) {
        requests.push(
          this.companyServiceApi.update(service.id, {
            id: service.id,

            ...data,
          }),
        );
      }

      // CREATE
      else {
        requests.push(this.companyServiceApi.create(data));
      }
    });

    if (requests.length === 0) {
      this.saveCompanyMedia(companyId);

      return;
    }

    forkJoin(requests).subscribe({
      next: () => {
        this.saveCompanyMedia(companyId);
      },

      error: (e) => {
        console.error(e);

        this.error = 'Company saved, but services could not be saved.';

        this.saving = false;
      },
    });
  }

  // ==========================================
  // SAVE ALL COMPANY IMAGES
  // ==========================================

  private saveCompanyMedia(companyId: number) {
    const slots = [
      // Logo
      {
        file: this.selectedFile,

        mediaId: this.logoMediaId,

        name: 'logo',

        upload: (file: File) => this.api.uploadCompanyImage(file, companyId),
      },

      // Hero
      {
        file: this.heroFile,

        mediaId: this.heroMediaId,

        name: 'hero image',

        upload: (file: File) => this.api.uploadHeroImage(file, companyId),
      },

      // Overview
      {
        file: this.overviewFile,

        mediaId: this.overviewMediaId,

        name: 'overview image',

        upload: (file: File) => this.api.uploadOverviewImage(file, companyId),
      },

      // Why Choose Us
      {
        file: this.whyChooseUsFile,

        mediaId: this.whyChooseUsMediaId,

        name: 'Why Choose Us image',

        upload: (file: File) => this.api.uploadWhyChooseUsImage(file, companyId),
      },
    ];

    this.saveMediaSlot(slots, 0);
  }

  // ==========================================
  // SAVE ONE IMAGE AT A TIME
  // ==========================================

  private saveMediaSlot(slots: any[], index: number) {
    // Finished all images

    if (index >= slots.length) {
      this.router.navigate(['/companies']);

      return;
    }

    const slot = slots[index];

    // No new image selected for this slot

    if (!slot.file) {
      this.saveMediaSlot(slots, index + 1);

      return;
    }

    // Upload function

    const upload = () => {
      slot.upload(slot.file).subscribe({
        next: () => {
          this.saveMediaSlot(slots, index + 1);
        },

        error: (e: any) => {
          console.error(e);

          this.error = `Company saved, but the ${slot.name} could not be uploaded.`;

          this.saving = false;
        },
      });
    };

    // There is no old image
    // Upload directly

    if (!slot.mediaId) {
      upload();

      return;
    }

    // There is an old image
    // Delete ONLY this image first

    this.api.deleteMedia(slot.mediaId).subscribe({
      next: () => {
        upload();
      },

      error: (e) => {
        console.error(e);

        this.error = `Company saved, but the old ${slot.name} could not be removed.`;

        this.saving = false;
      },
    });
  }

  // ==========================================
  // ERROR
  // ==========================================

  private fail(e: any) {
    console.error(e);

    this.error = e.error?.message || 'Could not save company.';

    this.saving = false;
  }
}
