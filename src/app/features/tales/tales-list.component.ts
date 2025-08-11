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
    <h2>Tales</h2>
    <input #q placeholder="Search" (input)="search(q.value)">
    <ul>
      <li *ngFor="let t of tales()">
        <a [routerLink]="['/tale', t.id]">{{t.title}} — {{t.author}} (★ {{t.avgRating ?? '–'}})</a>
      </li>
    </ul>
  `
})
export class TalesListComponent {
  private svc = inject(TalesService);
  tales = signal<Tale[]>([]);
  private lastQuery = '';
  ngOnInit(){ this.fetch(); }
  search(q: string){ this.lastQuery = q ?? ''; this.fetch(); }
  private fetch(){
    this.svc.list(this.lastQuery).subscribe(p => this.tales.set(p.content));
  }
}
