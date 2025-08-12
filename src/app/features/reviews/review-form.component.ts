import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ReviewsService} from '../../core/services/reviews.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="vstack" style="gap:12px;">
      <h2 style="margin:0;">New Review</h2>
      <form class="card" (ngSubmit)="save()">
        <div class="form-field">
          <label>Rating (1-5)</label>
          <input class="input" type="number" [(ngModel)]="rating" name="r" min="1" max="5" required>
        </div>
        <div class="form-field">
          <label>Title</label>
          <input class="input" [(ngModel)]="title" name="t">
        </div>
        <div class="form-field">
          <label>Body</label>
          <textarea class="input" rows="5" [(ngModel)]="body" name="b"></textarea>
        </div>
        <div class="hstack" style="justify-content:flex-end;">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </div>
  `
})
export class ReviewFormComponent {
  private route = inject(ActivatedRoute);
  private reviews = inject(ReviewsService);
  private router = inject(Router);

  rating = 5;
  title = '';
  body = '';

  save() {
    const taleId = Number(this.route.snapshot.paramMap.get('taleId'));
    this.reviews.create({taleId, rating: this.rating, title: this.title, body: this.body}).subscribe({
      next: () => this.router.navigateByUrl(`/tale/${taleId}`),
      error: () => {
      }
    });
  }
}
