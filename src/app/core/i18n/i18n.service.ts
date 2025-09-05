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

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type LangCode = 'en' | 'de';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private _lang = signal<LangCode>('en');
  private dict: Record<string, any> = {};

  constructor(private http: HttpClient) {
    const saved = (localStorage.getItem('tt_lang') as LangCode|null);
    const initial = saved || (navigator?.language?.startsWith('de') ? 'de' : 'en');
    this.setLanguage(initial);
  }

  lang() { return this._lang(); }

  setLanguage(lang: LangCode) {
    /* always reload to ensure dict is present */
    this._lang.set(lang);
    localStorage.setItem('tt_lang', lang);
    // Load translations json
    this.http.get(`/assets/i18n/${lang}.json`).subscribe({
      next: (res) => this.dict = res as any,
      error: () => this.dict = {},
    });
  }

  t(key: string): string {
    const parts = key.split('.');
    let cur: any = this.dict;
    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in cur) cur = cur[p];
      else return key;
    }
    return typeof cur === 'string' ? cur : key;
  }
}
