import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {TalesService} from '../../core/services/tales.service';
import {TaleCreate, Tale} from '../../shared/models';

@Component({
  standalone: true,
  selector: 'app-tale-form',
  imports: [CommonModule, FormsModule],
  template: `
    <section class="card vstack">
      <h2>Add Tale</h2>
      <form (ngSubmit)="save()" #f="ngForm" class="vstack">
        <div class="form-field">
          <label for="title">Title</label>
          <input class="input" id="title" name="title" [(ngModel)]="model.title" required/>
        </div>

        <div class="form-field">
          <label for="author">Author</label>
          <input class="input" id="author" name="author" [(ngModel)]="model.author" required/>
        </div>

        <div class="form-field">
          <label for="isbn">ISBN</label>
          <input class="input" id="isbn" name="isbn" [(ngModel)]="model.isbn"/>
        </div>

        <div class="form-field">
          <label for="publishedYear">Published Year</label>
          <input class="input" id="publishedYear" name="publishedYear" type="number" [(ngModel)]="model.publishedYear"/>
        </div>

        <div class="form-field">
          <label for="coverUrl">Cover URL</label>
          <input class="input" id="coverUrl" name="coverUrl" [(ngModel)]="model.coverUrl"/>
        </div>

        <div class="form-field">
          <label for="tags">Tags (comma-separated)</label>
          <input class="input" id="tags" name="tags" [(ngModel)]="model.tags"/>
        </div>

        <div class="form-field">
          <label for="description">Description</label>
          <textarea id="description" name="description" rows="5" [(ngModel)]="model.description"></textarea>
        </div>

        <div class="hstack" style="gap:10px; margin-top:8px">
          <button class="btn btn-primary" [disabled]="f.invalid || saving">{{ saving ? 'Saving…' : 'Save' }}</button>
          <a class="btn btn-ghost" href="" (click)="$event.preventDefault(); goHome()">Cancel</a>
        </div>

        <p *ngIf="error" class="subtle" style="color:#a33">{{ error }}</p>
      </form>
    </section>
  `
})
export class TaleFormComponent {
  private router = inject(Router);
  private tales = inject(TalesService);

  saving = false;
  error = '';
  model: TaleCreate = {
    title: '',
    author: '',
    isbn: '',
    description: '',
    coverUrl: '',
    publishedYear: undefined,
    tags: ''
  };

  save() {
    if (this.saving) return;
    this.saving = true;
    this.error = '';
    this.tales.create(this.model).subscribe({
      next: (t: Tale) => {
        this.router.navigate(['/tale', t.id]);
      },
      error: (err) => {
        this.saving = false;
        this.error = err?.error?.detail || 'Failed to save tale';
      }
    });
  }

  goHome() {
    this.router.navigateByUrl('/');
  }
}
