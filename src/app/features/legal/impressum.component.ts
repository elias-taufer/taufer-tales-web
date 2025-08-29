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
