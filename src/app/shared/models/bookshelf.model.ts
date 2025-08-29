import {Tale} from './tale.model';
import {ReadingStatus} from './reading-status.enum';

export interface BookshelfItem {
  tale: Tale;
  status: ReadingStatus;
}
