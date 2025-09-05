/*
 *  Copyright 2025 Elias Taufer
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

import {Component, inject, signal} from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {Review, ReviewsService} from '../../core/services/reviews.service';

@Component({
  standalone: true,
  selector: 'app-review-form',
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
  templateUrl: './review-form.component.html',
  styleUrl: 'review-form.component.scss'
})
export class ReviewFormComponent {
  taleId!: number;
  id?: number;

  rating = 5;
  title = '';
  body = '';
  isEdit = signal(false);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ReviewsService);

  constructor() {
    this.route.paramMap.subscribe(async (pm) => {
      const idParam = pm.get('id');
      const taleParam = pm.get('taleId');
      if (idParam) {
        this.id = +idParam;
        this.isEdit.set(true);
        this.api.getById(this.id).subscribe((r: Review) => {
          this.taleId = r.taleId;
          this.rating = r.rating;
          this.title = r.title;
          this.body = r.body;
        });
      } else if (taleParam) {
        this.taleId = +taleParam;
        this.isEdit.set(false);
      }
    });
  }

  submit() {
    if (this.isEdit() && this.id != null) {
      this.api.update(this.id, {rating: this.rating, title: this.title, body: this.body})
        .subscribe(() => this.router.navigate(['/tale', this.taleId]));
    } else {
      this.api.create({taleId: this.taleId, rating: this.rating, title: this.title, body: this.body})
        .subscribe(() => this.router.navigate(['/tale', this.taleId]));
    }
  }
}
