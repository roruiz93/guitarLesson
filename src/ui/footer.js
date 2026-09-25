import { LEGAL } from '../config/legal.js';
import { AAIP_ACCESS_NOTICE, AAIP_CONTROL_NOTICE } from './legal.js';

/** Footer persistente con links legales y leyendas de la Ley 25.326 */
export class FooterUI {
  mount() {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="footer-top">
        <div class="footer-brand">
          <span class="footer-logo">🎸 ${LEGAL.appName}</span>
          <span class="footer-tagline">Aprendé guitarra a tu ritmo</span>
        </div>
        <nav class="footer-links" aria-label="Información legal">
          <a href="#/terms">Términos y condiciones</a>
          <a href="#/privacy">Política de privacidad</a>
          <a href="#/cookies">Cookies</a>
          <a href="mailto:${LEGAL.email}">Contacto</a>
        </nav>
      </div>
      <div class="footer-legal">
        <p>${AAIP_ACCESS_NOTICE}</p>
        <p>${AAIP_CONTROL_NOTICE}
          <a href="https://www.argentina.gob.ar/aaip" target="_blank" rel="noopener">argentina.gob.ar/aaip</a></p>
      </div>
      <p class="footer-copy">© ${new Date().getFullYear()} ${LEGAL.owner} · ${LEGAL.appName} · ${LEGAL.country}. Todos los derechos reservados.</p>
    `;
    document.getElementById('app').appendChild(footer);
  }
}
