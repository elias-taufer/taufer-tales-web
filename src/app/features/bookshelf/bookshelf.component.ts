import {TaleTileComponent} from '../tales/tale-tile/tale-tile.component';
import {Component, inject, OnInit, signal} from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import {CommonModule} from '@angular/common';
import {BookshelfService} from '../../core/services/bookshelf.service';
import {BookshelfItem} from '../../shared/models/bookshelf.model';
import {ReadingStatus} from '../../shared/models/reading-status.enum';

@Component({
  standalone: true,
  selector: 'tt-bookshelf',
  imports: [CommonModule, TaleTileComponent, TranslatePipe],
  templateUrl: './bookshelf.component.html'
})
export class BookshelfComponent implements OnInit {
  items = signal<BookshelfItem[]>([]);
  filter = signal<ReadingStatus | null>(null);
  private api = inject(BookshelfService);

  ngOnInit() {
    this.fetch();
  }

  applyFilter(f: ReadingStatus | null) {
    this.filter.set(f);
    this.fetch();
  }

  fetch() {
    this.api.list(this.filter() ?? undefined).subscribe(list => this.items.set(list));
  }

  onStatusChange(taleId: number, val: string) {
    if (!val) return;
    this.api.setStatus(taleId, val as ReadingStatus).subscribe(() => this.fetch());
  }

  clear(taleId: number) {
    this.api.clearStatus(taleId).subscribe(() => this.fetch());
  }

}
