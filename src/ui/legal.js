import { LEGAL } from '../config/legal.js';

const { appName, owner, email, country, minAge, lastUpdated } = LEGAL;
const mail = `<a href="mailto:${email}">${email}</a>`;

export const AAIP_ACCESS_NOTICE =
  'El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto conforme lo establecido en el artículo 14, inciso 3 de la Ley Nº 25.326.';

export const AAIP_CONTROL_NOTICE =
  'La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley Nº 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.';

const PAGES = {
  terms: {
    title: 'Términos y condiciones de uso',
    body: `
      <h3>1. Aceptación</h3>
      <p>Estos términos regulan el uso de ${appName} (el "Servicio"), ofrecido por ${owner} (el "Responsable"), con domicilio en la ${country}. Al crear una cuenta o usar el Servicio aceptás estos términos y nuestra <a href="#/privacy">Política de privacidad</a>. Si no estás de acuerdo, no uses el Servicio.</p>

      <h3>2. El Servicio</h3>
      <p>${appName} es una herramienta educativa para aprender guitarra: lecciones, ejercicios con detección de notas por micrófono, afinador, seguimiento de progreso, ranking e insignias.</p>
      <p>Actualmente el Servicio se ofrece <strong>únicamente en su versión gratuita</strong>. Los planes pagos y contenidos marcados como "Próximamente" no están disponibles y no constituyen una oferta. Si en el futuro se habilitan, sus precios y condiciones se informarán de forma clara antes de cualquier contratación, y nunca se cobrará nada sin tu aceptación expresa.</p>

      <h3>3. Tu cuenta</h3>
      <ul>
        <li>Tenés que brindar datos veraces y mantener la confidencialidad de tu contraseña. Sos responsable de la actividad realizada con tu cuenta.</li>
        <li>Para registrarte debés tener al menos ${minAge} años. Si sos menor de 18 años, necesitás el conocimiento y la autorización de tu padre, madre o tutor.</li>
        <li>Podés dar de baja tu cuenta cuando quieras escribiendo a ${mail}.</li>
      </ul>

      <h3>4. Uso aceptable</h3>
      <p>Te comprometés a no:</p>
      <ul>
        <li>Usar nombres ofensivos, discriminatorios o que suplanten a otra persona (tu nombre puede aparecer en el ranking).</li>
        <li>Manipular puntajes, XP, rachas o el ranking por medios automatizados o fraudulentos.</li>
        <li>Intentar acceder a cuentas o datos de otras personas, vulnerar la seguridad o sobrecargar el Servicio.</li>
        <li>Copiar, extraer masivamente o redistribuir el contenido del Servicio sin autorización.</li>
      </ul>
      <p>Podemos suspender o eliminar cuentas que incumplan estos términos.</p>

      <h3>5. Propiedad intelectual</h3>
      <p>Las lecciones, textos, diseños, código y marca de ${appName} pertenecen al Responsable o se usan con autorización, y están protegidos por la Ley Nº 11.723 y normas aplicables. Te otorgamos una licencia personal, no exclusiva e intransferible para usarlos con fines de aprendizaje personal y no comercial.</p>

      <h3>6. Salud y práctica segura</h3>
      <p>Tocar un instrumento implica esfuerzo físico repetitivo. Hacé pausas, calentá antes de practicar, mantené una postura cómoda y cuidá el volumen para proteger tu audición. Si sentís dolor, entumecimiento o molestias persistentes, dejá de practicar y consultá a un profesional de la salud. El contenido del Servicio es educativo y no reemplaza el consejo médico.</p>

      <h3>7. Resultados y precisión</h3>
      <p>El progreso depende de cada persona y no garantizamos resultados determinados. La detección de notas y el afinador dependen de tu micrófono, dispositivo y entorno, y pueden tener errores.</p>

      <h3>8. Disponibilidad y cambios</h3>
      <p>Procuramos que el Servicio funcione de forma continua, pero puede sufrir interrupciones por mantenimiento, fallas técnicas o causas ajenas a nosotros. Podemos modificar, agregar o quitar funciones y contenidos.</p>

      <h3>9. Responsabilidad</h3>
      <p>El Servicio gratuito se brinda "tal como está". En la máxima medida permitida por la ley, el Responsable no será responsable por daños indirectos derivados del uso o la imposibilidad de uso del Servicio. Nada en estos términos limita los derechos que te otorga la Ley Nº 24.240 de Defensa del Consumidor ni otras normas de orden público.</p>

      <h3>10. Modificaciones de los términos</h3>
      <p>Podemos actualizar estos términos. Si los cambios son relevantes te lo avisaremos en el Servicio antes de que entren en vigencia. Si seguís usando el Servicio después de esa fecha, se entiende que aceptás la nueva versión.</p>

      <h3>11. Ley aplicable y jurisdicción</h3>
      <p>Estos términos se rigen por las leyes de la ${country}. Ante cualquier conflicto serán competentes los tribunales que correspondan según la normativa de defensa del consumidor, incluidos los de tu domicilio.</p>

      <h3>12. Contacto</h3>
      <p>Por consultas o reclamos escribinos a ${mail}.</p>
    `,
  },

  privacy: {
    title: 'Política de privacidad',
    body: `
      <p>En ${appName} cuidamos tus datos personales conforme a la Ley Nº 25.326 de Protección de los Datos Personales y su normativa complementaria.</p>

      <h3>1. Responsable de los datos</h3>
      <p>${owner}, ${country}. Contacto: ${mail}.</p>

      <h3>2. Qué datos recolectamos</h3>
      <ul>
        <li><strong>Datos de cuenta:</strong> nombre y email. La contraseña la gestiona Firebase Authentication y nosotros no podemos verla.</li>
        <li><strong>Datos de uso:</strong> lecciones realizadas, precisión en los ejercicios, puntos de experiencia (XP), racha de días, insignias y fechas de actividad.</li>
        <li><strong>Datos técnicos:</strong> la información que guardamos en tu navegador para mantener tu sesión (ver <a href="#/cookies">Cookies y almacenamiento</a>).</li>
      </ul>

      <h3>3. Micrófono</h3>
      <p>El afinador y los ejercicios usan el micrófono solo cuando vos lo autorizás en tu navegador. <strong>El audio se procesa en tiempo real dentro de tu dispositivo para detectar notas: no se graba, no se guarda y no se envía a ningún servidor.</strong> Podés revocar el permiso en cualquier momento desde la configuración de tu navegador.</p>

      <h3>4. Para qué usamos tus datos</h3>
      <ul>
        <li>Crear y administrar tu cuenta.</li>
        <li>Guardar tu progreso y mostrarte estadísticas, insignias y ranking.</li>
        <li>Enviarte emails necesarios del servicio (por ejemplo, recuperar la contraseña).</li>
        <li>Mantener la seguridad del Servicio y prevenir abusos.</li>
      </ul>
      <p><strong>No vendemos ni alquilamos tus datos</strong> y actualmente no mostramos publicidad personalizada.</p>

      <h3>5. Qué ven otras personas</h3>
      <p>Si participás del ranking, <strong>tu nombre, tu XP y tu racha son visibles para otros usuarios registrados</strong>. Tu email nunca se muestra.</p>

      <h3>6. Proveedores y transferencia internacional</h3>
      <p>Usamos Google Firebase (Authentication, Firestore y Hosting) para alojar el Servicio y tus datos. Estos servidores pueden estar ubicados fuera de la Argentina, incluso en Estados Unidos. Al registrarte prestás tu consentimiento para esa transferencia internacional (art. 12 de la Ley Nº 25.326). Google aplica sus propias medidas de seguridad y confidencialidad.</p>

      <h3>7. Cuánto tiempo guardamos tus datos</h3>
      <p>Mientras tu cuenta esté activa. Si pedís la baja, eliminamos tus datos dentro de los 30 días, salvo los que debamos conservar por obligación legal.</p>

      <h3>8. Tus derechos</h3>
      <p>Podés pedir el acceso, la rectificación, la actualización o la supresión de tus datos, y retirar tu consentimiento, escribiendo a ${mail} desde el email de tu cuenta. Responderemos los pedidos de acceso dentro de los 10 días corridos y los de rectificación o supresión dentro de los 5 días hábiles, según los arts. 14 y 16 de la Ley Nº 25.326.</p>
      <p class="legal-notice">${AAIP_ACCESS_NOTICE}</p>
      <p class="legal-notice">${AAIP_CONTROL_NOTICE} Más información en <a href="https://www.argentina.gob.ar/aaip" target="_blank" rel="noopener">argentina.gob.ar/aaip</a>.</p>

      <h3>9. Menores de edad</h3>
      <p>El Servicio no está dirigido a menores de ${minAge} años y no deben registrarse. Si tenés entre ${minAge} y 18 años, necesitás la autorización de tu padre, madre o tutor. Si sabés que un menor de ${minAge} años creó una cuenta, escribinos y la eliminaremos.</p>

      <h3>10. Seguridad</h3>
      <p>Usamos conexiones cifradas (HTTPS), autenticación de Firebase y reglas de acceso para que solo vos puedas ver y modificar tus datos privados. Ningún sistema es 100% infalible. Si detectamos un incidente que afecte tus datos, te lo informaremos.</p>

      <h3>11. Cambios en esta política</h3>
      <p>Si modificamos esta política te avisaremos en el Servicio. La fecha de la última actualización figura al pie.</p>
    `,
  },

  cookies: {
    title: 'Cookies y almacenamiento local',
    body: `
      <p>${appName} <strong>no usa cookies publicitarias ni herramientas de analítica o seguimiento de terceros.</strong></p>
      <p>Solo guardamos en tu navegador la información estrictamente necesaria para que el Servicio funcione:</p>
      <table class="legal-table">
        <thead><tr><th>Dato</th><th>Tipo</th><th>Para qué</th></tr></thead>
        <tbody>
          <tr><td>Sesión de Firebase</td><td>IndexedDB</td><td>Mantener tu sesión iniciada de forma segura.</td></tr>
          <tr><td><code>gp_user</code></td><td>localStorage</td><td>Recordar qué usuario inició sesión. Se borra al salir.</td></tr>
          <tr><td><code>gp_progress</code></td><td>sessionStorage</td><td>Copia temporal de tu progreso para cargar más rápido. Se borra al cerrar la pestaña.</td></tr>
          <tr><td><code>gp_badges</code></td><td>localStorage</td><td>Recordar las insignias que ya te mostramos.</td></tr>
        </tbody>
      </table>
      <p>Como estos datos son necesarios para prestar el Servicio, no requieren un consentimiento adicional. Podés borrarlos cuando quieras desde la configuración de tu navegador, pero se cerrará tu sesión.</p>
      <p>Si en el futuro incorporamos publicidad, analítica u otras herramientas de terceros, actualizaremos esta página y te pediremos el consentimiento cuando corresponda.</p>
    `,
  },
};

/** Páginas legales: términos, privacidad y cookies */
export class LegalUI {
  /** @param {'terms'|'privacy'|'cookies'} page */
  render(page) {
    const { title, body } = PAGES[page];
    const main = document.getElementById('main-content');
    main.innerHTML = `
      <article class="legal-page">
        <a class="btn-back" href="#/lessons">← Volver</a>
        <h2>${title}</h2>
        <p class="legal-updated">Última actualización: ${lastUpdated}</p>
        ${body}
      </article>
    `;
    window.scrollTo(0, 0);
  }
}
