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
