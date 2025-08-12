import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TalesService } from '../../core/services/tales.service';
import { ReviewsService } from '../../core/services/reviews.service';
import { CommentsService } from '../../core/services/comments.service';
import { AuthService } from '../../core/services/auth.service';
import { Tale, Review, Comment } from '../../shared/models';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ng-container *ngIf="tale() as t">
      <div class="vstack" style="gap:18px;">
        <div class="card vstack" style="gap:8px;">
          <div class="kicker">{{t.publishedYear || 'Year n/a'}}</div>
          <h2 style="margin:0;">{{t.title}}</h2>
          <div class="subtle">by {{t.author}}</div>
          <p>{{t.description}}</p>
          <div class="hstack" style="gap:10px;">
            <a *ngIf="auth.user()" class="btn btn-primary" [routerLink]="['/review/new', t.id]">Write Review</a>
          </div>
        </div>

        <section>
          <h3 style="margin:10px 0;">Reviews</h3>
          <div class="vstack" style="gap:12px;">
            <article *ngFor="let r of reviews()" class="card vstack" style="gap:6px;">
              <div class="hstack" style="justify-content:space-between;">
                <div class="rating">★ {{r.rating}}</div>
                <div class="subtle">{{r.username}}</div>
              </div>
              <div><strong>{{r.title}}</strong></div>
              <p style="margin:0;">{{r.body}}</p>
              <div class="hr"></div>
              <div class="vstack" style="gap:6px;">
                <div class="kicker">Comments</div>
                <div *ngFor="let c of commentsFor(r.id)" class="vstack" style="gap:2px;">
                  <div class="subtle"><strong>{{c.username}}</strong></div>
                  <div>{{c.content}}</div>
                </div>
              </div>
            </article>
            <p *ngIf="reviews().length===0" class="subtle">No reviews yet.</p>
          </div>
        </section>
      </div>
    </ng-container>
  `
})
export class TaleDetailComponent {
  route = inject(ActivatedRoute);
  tales = inject(TalesService);
  reviewsSvc = inject(ReviewsService);
  commentsSvc = inject(CommentsService);
  auth = inject(AuthService);

  tale = signal<Tale|null>(null);
  reviews = signal<Review[]>([]);
  comments = signal<Comment[]>([]);

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tales.get(id).subscribe(v => this.tale.set(v));
    this.reviewsSvc.forTale(id).subscribe(list => {
      this.reviews.set(list);
      list.forEach(r => this.commentsSvc.forReview(r.id).subscribe(cs => this.comments.update(curr => [...curr, ...cs])));
    });
  }
  commentsFor(id: number){ return this.comments().filter(x => x.reviewId === id); }
}
