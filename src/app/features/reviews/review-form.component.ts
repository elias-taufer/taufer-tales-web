import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from '../../core/services/reviews.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>New Review</h2>
    <form (ngSubmit)="save()">
      <label>Rating (1-5) <input type="number" [(ngModel)]="rating" name="r" min="1" max="5" required></label>
      <label>Title <input [(ngModel)]="title" name="t"></label>
      <label>Body <textarea [(ngModel)]="body" name="b"></textarea></label>
      <button>Save</button>
    </form>
  `
})
export class ReviewFormComponent {
  rating = 5; title = ''; body = '';
  constructor(private route: ActivatedRoute, private router: Router, private svc: ReviewsService){}
  save(){
    const taleId = Number(this.route.snapshot.paramMap.get('taleId'));
    this.svc.create({ taleId, rating: this.rating, title: this.title, body: this.body })
      .subscribe(() => this.router.navigate(['/tale', taleId]));
  }
}
