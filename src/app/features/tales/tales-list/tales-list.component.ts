import {TaleTileComponent} from '../tale-tile/tale-tile.component';
import {Component, inject, signal} from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import {CommonModule} from '@angular/common';
import {TalesService} from '../../../core/services/tales.service';
import {ReadingStatus} from '../../../shared/models/reading-status.enum';
import {Tale} from '../../../shared/models/tale.model';
import {AuthService} from '../../../core/services/auth.service';
import {BookshelfService} from '../../../core/services/bookshelf.service';

@Component({
  standalone: true,
  selector: 'tt-tales',
  imports: [CommonModule, TaleTileComponent, TranslatePipe],
  templateUrl: './tales-list.component.html',
  styleUrl: 'tales-list.component.scss'
})
export class TalesListComponent {
  auth = inject(AuthService);
  tales = signal<Tale[]>([]);
  private svc = inject(TalesService);
  private shelf = inject(BookshelfService);
  private lastQuery = '';
  // map of taleId -> status
  private myMap = new Map<number, ReadingStatus>();

  ngOnInit() {
    this.fetch();
    if (this.isLoggedIn()) {
      this.refreshMyStatuses();
    }
  }

  isLoggedIn() {
    return !!localStorage.getItem('tt_token');
  }

  statusOf(taleId: number): ReadingStatus | undefined {
    return this.myMap.get(taleId);
  }

  search(q: string) {
    this.lastQuery = q ?? '';
    this.fetch();
  }

  onStatusChange(taleId: number, val: string) {
    if (!val) return;
    this.shelf.setStatus(taleId, val as ReadingStatus).subscribe(() => this.refreshMyStatuses());
  }

  clear(taleId: number) {
    this.shelf.clearStatus(taleId).subscribe(() => this.refreshMyStatuses());
  }

  private fetch() {
    this.svc.list(this.lastQuery).subscribe(p => this.tales.set(p.content));
  }

  private refreshMyStatuses() {
    this.shelf.list().subscribe(items => {
      this.myMap.clear();
      for (const it of items) this.myMap.set(it.tale.id, it.status);
    });
  }
}
