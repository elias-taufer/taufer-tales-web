import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReviewsService, Review } from '../../core/services/reviews.service';

@Component({
  standalone: true,
  selector: 'app-review-form',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="card" style="max-width:600px;margin:auto;">
      <h2 class="kicker">{{ isEdit() ? 'Edit Review' : 'New Review' }}</h2>

      <form (ngSubmit)="submit()">
        <div class="form-field">
          <label>Rating (1-5)</label>
          <input class="input" type="number" [(ngModel)]="rating" name="rating" min="1" max="5" required>
        </div>

        <div class="form-field">
          <label>Title</label>
          <input class="input" [(ngModel)]="title" name="title" maxlength="120" required>
        </div>

        <div class="form-field">
          <label>Body</label>
          <textarea class="input" [(ngModel)]="body" name="body" rows="6" required></textarea>
        </div>

        <div class="hstack" style="justify-content:flex-end;gap:10px;">
          <a class="btn btn-ghost" [routerLink]="['/tale', taleId]">Cancel</a>
          <button class="btn btn-primary">{{ isEdit() ? 'Save' : 'Create' }}</button>
        </div>
      </form>
    </div>
  `
})
export class ReviewFormComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ReviewsService);

  taleId!: number;
  id?: number;

  // form state
  rating = 5;
  title = '';
  body = '';

  isEdit = signal(false);

  constructor() {
    this.route.paramMap.subscribe(async (pm) => {
      const idParam = pm.get('id');
      const taleParam = pm.get('taleId');
      if (idParam) {
        // edit mode
        this.id = +idParam;
        this.isEdit.set(true);
        this.api.getById(this.id).subscribe((r: Review) => {
          this.taleId = r.taleId;
          this.rating = r.rating;
          this.title = r.title;
          this.body = r.body;
        });
      } else if (taleParam) {
        // create mode
        this.taleId = +taleParam;
        this.isEdit.set(false);
      }
    });
  }

  submit() {
    if (this.isEdit() && this.id != null) {
      this.api.update(this.id, { rating: this.rating, title: this.title, body: this.body })
        .subscribe(() => this.router.navigate(['/tale', this.taleId]));
    } else {
      this.api.create({ taleId: this.taleId, rating: this.rating, title: this.title, body: this.body })
        .subscribe(() => this.router.navigate(['/tale', this.taleId]));
    }
  }
}
