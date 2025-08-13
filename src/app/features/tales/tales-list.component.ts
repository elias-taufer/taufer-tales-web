import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {TalesService} from '../../core/services/tales.service';
import {Tale} from '../../shared/models';
import {AuthService} from '../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'tt-tales',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="vstack" style="gap:14px;">
      <div class="hstack" style="justify-content:space-between;">
        <h2 style="margin:0;">Tales</h2>
        <input class="input" style="max-width:320px;" #q placeholder="Search" (input)="search(q.value)" />
      </div>

      <div class="grid">
        @for (t of tales(); track t.id) {
          <a class="card tale-item" [routerLink]="['/tale', t.id]">
            <div class="kicker">{{ t.publishedYear || 'Year n/a' }}</div>
            <h3 style="margin:6px 0 4px;">{{ t.title }}</h3>
            <div class="subtle">by {{ t.author }}</div>
          </a>
        } @empty {
          <p class="subtle">No tales yet. Add one via the API.</p>
        }
      </div>
    </div>
  `
})
export class TalesListComponent {
  auth = inject(AuthService);
  private svc = inject(TalesService);
  tales = signal<Tale[]>([]);
  private lastQuery = '';

  ngOnInit() {
    this.fetch();
  }

  search(q: string) {
    this.lastQuery = q ?? '';
    this.fetch();
  }

  private fetch() {
    this.svc.list(this.lastQuery).subscribe(p => this.tales.set(p.content));
  }
}
