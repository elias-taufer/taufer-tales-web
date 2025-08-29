import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PRIVACY_CONTROLLER, PRIVACY_POLICY_VERSION} from '../../../environments/environment';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
  <article class="prose">
    <h1>Datenschutzerklärung</h1>

    <p>
      Der Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Website wird als
      privates, nicht-kommerzielles Projekt betrieben.
    </p>

    <h2>1. Verantwortlicher</h2>
    <p>
      Verantwortlich für die Datenverarbeitung auf dieser Website ist:
      <br />
      <i>Elias Taufer</i>
      <br />
      <i>tauferelias@gmail.com</i>
    </p>

    <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
    <p>
      Wenn Sie sich auf dieser Website registrieren oder anmelden, werden folgende
      Daten gespeichert:
    </p>
    <ul>
      <li>Benutzername</li>
      <li>Passwort (verschlüsselt, niemals im Klartext gespeichert)</li>
      <li>Ihre Bewertungen und Einträge zu Büchern</li>
    </ul>
    <p>
      Diese Daten werden ausschließlich verarbeitet, um die Funktionen der Website
      bereitzustellen.
    </p>

    <h2>3. Keine Verwendung von Cookies</h2>
    <p>
      Diese Website setzt <b>keine Cookies</b>. Stattdessen werden für die Anmeldung
      technisch notwendige Informationen (z. B. ein Zugriffstoken und Ihr Benutzername)
      im <i>Local Storage</i> Ihres Browsers gespeichert. Diese Daten verbleiben nur
      in Ihrem Browser und werden nicht an Dritte weitergegeben.
    </p>

    <h2>4. Keine Analyse- oder Tracking-Tools</h2>
    <p>
      Es werden <b>keine Analysetools</b> (wie Google Analytics, Matomo o. ä.) und
      <b>keine Trackingdienste</b> verwendet. Es findet keinerlei Erstellung von
      Nutzungsprofilen statt.
    </p>

    <h2>5. Weitergabe von Daten</h2>
    <p>
      Ihre Daten werden nicht an Dritte weitergegeben.
    </p>

    <h2>6. Datensicherheit</h2>
    <p>
      Die Übertragung der Daten erfolgt ausschließlich verschlüsselt über HTTPS.
    </p>

    <h2>7. Ihre Rechte</h2>
    <p>
      Sie haben jederzeit das Recht auf Auskunft, Berichtigung oder Löschung Ihrer
      bei uns gespeicherten Daten. Wenden Sie sich hierfür an den oben genannten
      Verantwortlichen.
    </p>

    <h2>8. Änderungen dieser Datenschutzerklärung</h2>
    <p>
      Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, damit
      sie stets den aktuellen rechtlichen Anforderungen entspricht.
    </p>
  </article>
  `
})
export class PrivacyPolicyComponent {
  controller = PRIVACY_CONTROLLER;
  version = PRIVACY_POLICY_VERSION;
}
