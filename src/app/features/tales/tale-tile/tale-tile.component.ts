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

import {Component, EventEmitter, Input, Output} from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ReadingStatus} from '../../../shared/models/reading-status.enum';
import { Tale } from '../../../shared/models/tale.model'

@Component({
  selector: 'tt-tale-tile',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: 'tale-tile.component.html',
  styleUrl: 'tale-tile.component.scss'
})
export class TaleTileComponent {
  @Input({required: true}) tale!: Tale;
  @Input() myStatus: ReadingStatus | null = null;
  @Input() showStatusControls = false;

  @Output() statusChange = new EventEmitter<ReadingStatus | null>();
  @Output() clear = new EventEmitter<void>();

  onSelect(val: string | null | undefined) {
    this.statusChange.emit((val || null) as any);
  }
}
