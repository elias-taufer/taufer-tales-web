import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TalesService } from '../../core/services/tales.service';
import { ReviewsService, Review } from '../../core/services/reviews.service';
import { AuthService } from '../../core/services/auth.service';

interface Tale {
  id: number;
  title: string;
  author: string;
  description?: string;
  avgRating?: number | null;
}

@Component({
  standalone: true,
  selector: 'app-tale-detail',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="vstack" style="gap:12px">
      <ng-container *ngIf="tale() as t">
        <header class="hstack" style="justify-content:space-between; align-items:baseline;">
          <div>
            <h2 style="margin:0">{{ t.title }} <small class="subtle">by {{ t.author }}</small></h2>
            <div class="subtle">Average rating: <strong class="rating">{{ t.avgRating ?? '–' }}</strong></div>
          </div>

          <ng-container *ngIf="auth.user(); else promptLogin">
            <ng-container *ngIf="myReview(); else write">
              <a class="btn btn-primary" [routerLink]="['/review/edit', myReview()!.id]">Edit your review</a>
            </ng-container>
            <ng-template #write>
              <a class="btn btn-primary" [routerLink]="['/review/new', t.id]">Write Review</a>
            </ng-template>
          </ng-container>
          <ng-template #promptLogin>
            <a class="btn btn-ghost" routerLink="/login">Login to review</a>
          </ng-template>
        </header>

        <p>{{ t.description }}</p>

        <section class="vstack" style="gap:10px">
          <h3>Reviews</h3>
          <article class="card" *ngFor="let r of reviews()">
            <h4 style="margin:0 0 6px 0">
              <span class="rating">★ {{ r.rating }}</span> — {{ r.title }}
              <small class="subtle">by {{ r.username }}</small>
            </h4>
            <p style="margin:0">{{ r.body }}</p>
          </article>
        </section>
      </ng-container>
    </div>
  `
})
export class TaleDetailComponent {
  private route = inject(ActivatedRoute);
  private api = inject(TalesService);
  private reviewsApi = inject(ReviewsService);
  auth = inject(AuthService);

  tale = signal<Tale | null>(null);
  reviews = signal<Review[]>([]);
  myReview = signal<Review | null>(null);

  constructor() {
    this.route.paramMap.subscribe(pm => {
      const id = Number(pm.get('id'));
      if (!id) return;
      this.load(id);
    });
  }

  private load(id: number) {
    this.api.get(id).subscribe(t => this.tale.set(t as any));
    this.reviewsApi.forTale(id).subscribe(rs => this.reviews.set(rs));
    // also fetch the current user's review
    this.reviewsApi.myForTale(id).subscribe({
      next: r => this.myReview.set(r),
      error: () => this.myReview.set(null),
    });
  }
}
