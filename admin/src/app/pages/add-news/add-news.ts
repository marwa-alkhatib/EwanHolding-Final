import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { forkJoin } from 'rxjs';

import { NewsAdminService } from '../../services/news';

@Component({
  imports: [
    FormsModule,
    RouterLink
  ],
  selector: 'app-add-news',
  templateUrl: './add-news.html',
  styleUrl: './add-news.scss'
})
export class AddNews implements OnInit {

  file: File | null = null;

  preview = '';

  saving = false;

  error = '';

  editId: number | null = null;

  // كل الصور القديمة المرتبطة بالخبر
  oldMediaIds: number[] = [];

  n = {
    titleEn: '',
    titleAr: '',
    descEn: '',
    descAr: '',
    category: '',
    status: 'Published'
  };


  constructor(
    private api: NewsAdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit() {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    // Add News
    if (!id) {
      return;
    }

    // Edit News
    this.editId = id;

    this.api.get(id).subscribe({

      next: (x) => {

        this.n = {
          titleEn: x.title_En,
          titleAr: x.title_Ar,
          descEn: x.description_En,
          descAr: x.description_Ar,
          category: x.category || '',
          status: x.status
        };


        // الصورة الحالية للـ preview
        this.preview = this.api.image(x);


        // نحفظ IDs كل الصور القديمة
        this.oldMediaIds =
          x.media?.map((m: any) => m.id) || [];

      },

      error: () => {

        this.error =
          'Could not load news article.';

      }

    });

  }


  /* ==================================================
     PICK IMAGE
  ================================================== */

  pick(e: Event) {

    const input =
      e.target as HTMLInputElement;

    const selectedFile =
      input.files?.[0] || null;

    this.file = selectedFile;


    if (selectedFile) {

      this.preview =
        URL.createObjectURL(selectedFile);

    }

  }


  /* ==================================================
     SAVE
  ================================================== */

  save() {

    if (this.saving) {
      return;
    }


    /* ---------- Validation ---------- */

    if (
      !this.n.titleEn.trim() ||
      !this.n.titleAr.trim() ||
      !this.n.descEn.trim() ||
      !this.n.descAr.trim()
    ) {

      this.error =
        'Please complete all required fields.';

      return;
    }


    this.saving = true;

    this.error = '';


    const base = {

      title_Ar:
        this.n.titleAr.trim(),

      title_En:
        this.n.titleEn.trim(),

      description_Ar:
        this.n.descAr.trim(),

      description_En:
        this.n.descEn.trim(),

      category:
        this.n.category.trim(),

      publishDate:
        new Date().toISOString(),

      status:
        this.n.status

    };


    /* ==================================================
       EDIT EXISTING NEWS
    ================================================== */

    if (this.editId) {

      const id = this.editId;

      this.api
        .update(
          id,
          {
            id,
            ...base
          }
        )
        .subscribe({

          next: () => {

            this.finishEdit(id);

          },

          error: () => {

            this.error =
              'Could not update news.';

            this.saving = false;

          }

        });

      return;
    }


    /* ==================================================
       CREATE NEW NEWS
    ================================================== */

    this.api
      .create(base)
      .subscribe({

        next: (response) => {

          this.finishCreate(response.id);

        },

        error: () => {

          this.error =
            'Could not publish news.';

          this.saving = false;

        }

      });

  }


  /* ==================================================
     FINISH CREATE
  ================================================== */

  private finishCreate(id: number) {

    // لو مفيش صورة
    if (!this.file) {

      this.router.navigate(['/news']);

      return;
    }


    // ارفع الصورة
    this.api
      .upload(this.file, id)
      .subscribe({

        next: () => {

          this.router.navigate(['/news']);

        },

        error: () => {

          this.error =
            'News saved, but image upload failed.';

          this.saving = false;

        }

      });

  }


  /* ==================================================
     FINISH EDIT
  ================================================== */

  private finishEdit(id: number) {

    /*
      المستخدم عدّل النص فقط
      ولم يختار صورة جديدة
      → لا نلمس الصور القديمة
    */

    if (!this.file) {

      this.router.navigate(['/news']);

      return;
    }


    /*
      اختار صورة جديدة
      لكن الخبر مفيهوش صور قديمة
      → ارفع الجديدة مباشرة
    */

    if (this.oldMediaIds.length === 0) {

      this.uploadNewImage(id);

      return;
    }


    /*
      عندنا صور قديمة متراكمة

      هنحذفهم كلهم الأول
      وبعد نجاح حذف الكل
      هنرفع الصورة الجديدة
    */

    const deleteRequests =
      this.oldMediaIds.map(
        mediaId =>
          this.api.deleteMedia(mediaId)
      );


    forkJoin(deleteRequests)
      .subscribe({

        next: () => {

          // كل الصور القديمة اتحذفت
          this.oldMediaIds = [];

          // ارفع الصورة الجديدة
          this.uploadNewImage(id);

        },

        error: () => {

          this.error =
            'News updated, but old images could not be removed.';

          this.saving = false;

        }

      });

  }


  /* ==================================================
     UPLOAD NEW IMAGE
  ================================================== */

  private uploadNewImage(id: number) {

    if (!this.file) {

      this.saving = false;

      return;

    }


    this.api
      .upload(this.file, id)
      .subscribe({

        next: () => {

          this.router.navigate(['/news']);

        },

        error: () => {

          this.error =
            'News updated, but new image upload failed.';

          this.saving = false;

        }

      });

  }

}