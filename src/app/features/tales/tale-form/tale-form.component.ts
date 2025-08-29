import {Component, inject} from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TalesService} from '../../../core/services/tales.service';
import {Tale, TaleCreate} from '../../../shared/models/tale.model';

@Component({
  standalone: true,
  selector: 'app-tale-form',
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: 'tale-form.component.html',
})
export class TaleFormComponent {
  editId: number | null = null;
  saving = false;
  error: string | null = null;
  model: TaleCreate = {
    title: '',
    author: '',
    isbn: '',
    description: '',
    coverUrl: '',
    publishedYear: undefined,
    tags: ''
  };
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tales = inject(TalesService);

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      if (!Number.isNaN(id)) {
        this.editId = id;
        this.tales.get(id).subscribe({
          next: (t: Tale) => {
            this.model = {
              title: t.title ?? '',
              author: t.author ?? '',
              isbn: t.isbn ?? '',
              description: t.description ?? '',
              coverUrl: t.coverUrl ?? '',
              publishedYear: t.publishedYear,
              tags: t.tags ?? ''
            };
          },
          error: () => {
            this.error = 'Failed to load tale';
          }
        });
      }
    }
  }

  save() {
    if (this.saving) return;
    this.saving = true;
    this.error = null;

    const obs = this.editId
      ? this.tales.update(this.editId, this.model)
      : this.tales.create(this.model);

    obs.subscribe({
      next: (t: Tale) => {
        this.router.navigate(['/tale', t.id]);
      },
      error: (err) => {
        this.saving = false;
        this.error = err?.error?.detail || 'Failed to save tale';
      }
    });
  }

  goBack() {
    if (this.editId) {
      this.router.navigate(['/tale', this.editId]);
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
