import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from './i18n.service';

@Pipe({ name: 't', standalone: true, pure: false })
export class TranslatePipe implements PipeTransform {
  constructor(private i18n: I18nService) {}
  transform(key: string): string {
    return this.i18n.t(key);
  }
}
