import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TalesService } from '../../core/services/tales.service';
import { Tale } from '../../shared/models';

@Component({
  standalone: true,
  selector: 'tt-tales',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="vstack" style="gap:14px;">
      <div class="hstack" style="justify-content:space-between;">
        <h2 style="margin:0;">Tales</h2>
        <input class="input" style="max-width:320px;" #q placeholder="Search" (input)="search(q.value)">
      </div>
      <div class="grid">
        <article *ngFor="let t of tales()" class="card">
          <div class="kicker">{{t.publishedYear || 'Year n/a'}}</div>
          <h3 style="margin:6px 0 4px;">{{t.title}}</h3>
          <div class="subtle">by {{t.author}}</div>
          <div class="hr"></div>
          <div class="hstack" style="justify-content:space-between; align-items:flex-end;">
            <div class="subtle">Tags: {{t.tags || '—'}}</div>
            <a class="btn btn-primary" [routerLink]="['/tale', t.id]">View</a>
          </div>
        </article>
      </div>
      <p *ngIf="tales().length === 0" class="subtle">No tales yet. Add one via the API.</p>
    </div>
  `
})
export class TalesListComponent {
  private svc = inject(TalesService);
  tales = signal<Tale[]>([]);
  private lastQuery = '';
  ngOnInit(){ this.fetch(); }
  search(q: string){ this.lastQuery = q ?? ''; this.fetch(); }
  private fetch(){ this.svc.list(this.lastQuery).subscribe(p => this.tales.set(p.content)); }
}
