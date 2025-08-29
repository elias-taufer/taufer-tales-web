import {Component, inject, OnInit, signal} from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {TalesService} from '../../../core/services/tales.service';
import {Review, ReviewsService} from '../../../core/services/reviews.service';
import {AuthService} from '../../../core/services/auth.service';
import {BookshelfService} from '../../../core/services/bookshelf.service';
import {ReadingStatus} from '../../../shared/models/reading-status.enum';

interface Tale {
  id: number;
  title: string;
  author: string;
  description?: string;
  avgRating?: number | null;
  coverUrl?: string;
}

@Component({
  standalone: true,
  selector: 'tt-tale-detail',
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: 'tale-detail.component.html',
  styleUrl: 'tale-detail.component.scss'
})
export class TaleDetailComponent implements OnInit {
  auth = inject(AuthService);
  tale = signal<Tale | null>(null);
  reviews = signal<Review[]>([]);
  myReview = signal<Review | null>(null);
  myStatus = signal<ReadingStatus | null>(null);
  private route = inject(ActivatedRoute);
  private api = inject(TalesService);
  private reviewsApi = inject(ReviewsService);
  private shelf = inject(BookshelfService);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.load(id);
    });
  }

  onStatusChange(val: string) {
    const id = this.tale()?.id;
    if (!id || !val) return;
    this.shelf.setStatus(id, val as ReadingStatus).subscribe(it => this.myStatus.set(it.status));
  }

  clear() {
    const id = this.tale()?.id;
    if (!id) return;
    this.shelf.clearStatus(id).subscribe(() => this.myStatus.set(null));
  }

  deleteMyReview() {
    const r = this.myReview();
    if (!r) return;
    if (!confirm('Delete your review?')) return;
    this.reviewsApi.delete(r.id).subscribe(() => {
      const id = this.tale()?.id;
      if (id) this.load(id);
    });
  }

  private load(id: number) {
    this.api.get(id).subscribe(t => this.tale.set(t as any));
    this.reviewsApi.forTale(id).subscribe(rs => this.reviews.set(rs));
    this.reviewsApi.myForTale(id).subscribe({
      next: r => this.myReview.set(r),
      error: () => this.myReview.set(null),
    });
    // fetch current status
    this.shelf.myForTale(id).subscribe({
      next: it => this.myStatus.set(it.status),
      error: () => this.myStatus.set(null)
    });
  }
}
