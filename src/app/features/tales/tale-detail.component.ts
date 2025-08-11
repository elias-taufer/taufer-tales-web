import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TalesService } from '../../core/services/tales.service';
import { ReviewsService } from '../../core/services/reviews.service';
import { CommentsService } from '../../core/services/comments.service';
import { Tale, Review, Comment } from '../../shared/models';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ng-container *ngIf="tale() as t">
      <h2>{{t.title}} <small>by {{t.author}}</small></h2>
      <p>{{t.description}}</p>
      <a [routerLink]="['/review/new', t.id]">Write Review</a>
      <h3>Reviews</h3>
      <article *ngFor="let r of reviews()">
        <h4>★ {{r.rating}} — {{r.title}} <small>by {{r.username}}</small></h4>
        <p>{{r.body}}</p>
        <section>
          <h5>Comments</h5>
          <div *ngFor="let c of commentsFor(r.id)">
            <p><strong>{{c.username}}:</strong> {{c.content}}</p>
          </div>
        </section>
      </article>
    </ng-container>
  `
})
export class TaleDetailComponent {
  route = inject(ActivatedRoute);
  tales = inject(TalesService); reviewsSvc = inject(ReviewsService); commentsSvc = inject(CommentsService);
  tale = signal<Tale|null>(null); reviews = signal<Review[]>([]); comments = signal<Comment[]>([]);
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
