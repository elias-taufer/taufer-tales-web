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

import {Component} from '@angular/core';

@Component({
  selector: 'app-impressum',
  standalone: true,
  template: `
    <section class="container" style="max-width: 840px; margin: 2rem auto; padding: 0 1rem;">
      <h1>Impressum</h1>
      <p>
        <strong>Elias Taufer</strong><br/>
      </p>
      <p>
        E-Mail:
        <a href="mailto:[tauferelias@gmail.com]">tauferelias@gmail.com</a>
      </p>

      <h2>Hinweis</h2>
      <p>
        Dies ist ein nicht-kommerzielles Hobbyprojekt.
        Die Inhalte werden ohne Gewähr bereitgestellt.
      </p>
    </section>
  `,
})
export class ImpressumComponent {
}
