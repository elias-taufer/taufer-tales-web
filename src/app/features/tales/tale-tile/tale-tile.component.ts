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
