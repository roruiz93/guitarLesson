/**
 * @typedef {Object} Ejercicio
 * @property {'nota'|'acorde'|'rasgueo'|'arpegio'|'escala'} tipo
 * @property {string} esperada - Nota o acorde esperado
 * @property {number} duracion - Duración en segundos
 * @property {number} tolerance - Cents de tolerancia
 */

/**
 * @typedef {Object} Lesson
 * @property {string} id
 * @property {'principiante'|'intermedio'|'avanzado'} nivel
 * @property {number} subnivel - 1-10
 * @property {number} leccion - 1-10
 * @property {string} nombre
 * @property {'video'|'exercise'|'theory'} tipo
 * @property {number} duracion - minutos
 * @property {string} objetivo
 * @property {Ejercicio[]} ejercicios
 * @property {number} requiereMinimoAccuracy - 0-100
 * @property {string|null} prerequisito - ID de lección anterior
 * @property {'free'|'lite'|'pro'|'maestro'} planMinimo
 */

// ──────────────────────────────────────────────────────────────────────────────
// PRINCIPIANTE — 100 lecciones — Plan: free
// ──────────────────────────────────────────────────────────────────────────────

const PRINCIPIANTE = {
  sub1: {
    nombre: 'Introducción a la Guitarra',
    lecciones: [
      {
        nombre: 'Anatomía de la guitarra', tipo: 'theory',
        objetivo: 'Identificar todas las partes de la guitarra',
        descripcion: `La guitarra tiene estas partes principales que debés conocer:

🎸 **Cuerpo** — la caja de madera que amplifica el sonido (en acústica) o sostiene las pastillas (en eléctrica).

🎵 **Boca o soundhole** — el agujero redondo del centro por donde sale el sonido en la guitarra acústica.

📏 **Mástil o diapasón** — la barra larga donde ponés los dedos para pisar las notas. Tiene trastes metálicos que dividen las notas.

🔢 **Trastes** — las divisiones metálicas del mástil. Cada traste sube medio tono. Traste 1 es el más cercano a la cabeza.

🎯 **Cejuela (nut)** — la pieza blanca al inicio del mástil que sostiene las cuerdas.

🔩 **Clavijero y clavijas** — la parte de arriba donde se enrollan las cuerdas. Las clavijas sirven para afinar.

🎼 **6 cuerdas** (de más gruesa a más fina): **Mi (E2) · La (A2) · Re (D3) · Sol (G3) · Si (B3) · Mi (E4)**

📌 **Puente (bridge)** — la pieza en el cuerpo donde se anclan las cuerdas del lado opuesto al clavijero.

Leé con calma cada parte y tocá tu guitarra para identificarlas en el instrumento real. Cuando las conozcas todas, presioná "Completado".`,
        ejercicios: [],
        quiz: [
          {
            pregunta: '¿Cómo se llaman las divisiones metálicas del mástil que separan las notas?',
            opciones: ['Clavijas', 'Trastes', 'Puentes', 'Cejuelas'],
            correcta: 1,
          },
          {
            pregunta: '¿Cuál es el orden correcto de las cuerdas de más gruesa a más fina?',
            opciones: ['E A D G B E', 'E B G D A E', 'A E D G B E', 'E G D A B E'],
            correcta: 0,
          },
          {
            pregunta: '¿Cómo se llama la pieza al inicio del mástil que sostiene las cuerdas?',
            opciones: ['Puente', 'Traste', 'Cejuela', 'Clavijero'],
            correcta: 2,
          },
          {
            pregunta: '¿Para qué sirven las clavijas del clavijero?',
            opciones: ['Sostener la correa', 'Afinar las cuerdas', 'Amplificar el sonido', 'Sujetar el puente'],
            correcta: 1,
          },
          {
            pregunta: '¿Dónde se anclan las cuerdas en el cuerpo de la guitarra?',
            opciones: ['En la boca', 'En el mástil', 'En el puente', 'En la cejuela'],
            correcta: 2,
          },
        ],
      },
      {
        nombre: 'Postura correcta sentado', tipo: 'theory',
        objetivo: 'Adoptar postura ergonómica sentado',
        descripcion: `Una buena postura desde el primer día evita lesiones y hace más fácil tocar.

🪑 **Posición clásica:**
- Sentate en el borde de la silla, sin apoyar la espalda
- La cintura de la guitarra descansa sobre tu **pierna izquierda** (si sos diestro)
- El cuerpo de la guitarra queda ligeramente inclinado hacia arriba
- La cabeza del mástil a la altura de tus ojos o un poco más arriba

🎸 **Posición popular/informal:**
- La guitarra descansa sobre la **pierna derecha**
- Más relajada, ideal para principiantes y música popular
- El mástil en un ángulo de unos 30-45° hacia arriba

✅ **Puntos clave:**
- Espalda recta, hombros relajados — no te encorvés
- El brazo derecho descansa sobre el borde superior del cuerpo
- La muñeca izquierda no apoya en el mástil, los dedos caen perpendiculares a las cuerdas
- Nunca aprietes la guitarra contra el cuerpo con el brazo derecho

Intentá ambas posiciones y elegí la que te resulte más cómoda.`,
        ejercicios: [],
        quiz: [
          {
            pregunta: 'En la posición clásica, ¿sobre qué pierna descansa la guitarra (para un diestro)?',
            opciones: ['Pierna derecha', 'Pierna izquierda', 'Cualquiera de las dos', 'No descansa en las piernas'],
            correcta: 1,
          },
          {
            pregunta: '¿Qué ocurre si apretás la guitarra contra el cuerpo con el brazo derecho?',
            opciones: ['Suena mejor', 'La guitarra se afina sola', 'Limita el movimiento y genera tensión', 'Es la postura correcta'],
            correcta: 2,
          },
          {
            pregunta: '¿Cómo deben estar los hombros al tocar?',
            opciones: ['Levantados y tensos', 'Relajados y bajos', 'Uno más alto que el otro', 'Hacia adelante'],
            correcta: 1,
          },
        ],
      },
      {
        nombre: 'Postura de pie con correa', tipo: 'theory',
        objetivo: 'Usar la guitarra de pie sin tensión',
        descripcion: `Tocar de pie requiere una correa bien ajustada para que la guitarra quede en la misma posición que sentado.

🎸 **Ajuste de la correa:**
- Enganchá la correa en los dos **pines** del cuerpo (uno arriba, uno abajo)
- Regulá la longitud para que la guitarra quede a la altura de tu cadera o abdomen
- **Muy baja** (estilo rockero): se ve bien pero dificulta el freteo → no recomendado para practicar
- **A la altura del cinto**: posición ideal para tocar cómodo y con precisión

✅ **Puntos clave:**
- La postura de pie debe ser igual que sentado — mismos ángulos de brazos y manos
- Repartí el peso en los dos pies, no te apoyes en una pierna
- Verificá que la correa no ejerza tensión en el cuello del instrumento
- Si tu guitarra no tiene pin en el talón del mástil, usá una correa que se ata al clavijero

Practicá ponerte y sacarte la correa hasta que sea automático.`,
        ejercicios: [],
        quiz: [
          {
            pregunta: '¿A qué altura debería quedar la guitarra al tocar de pie?',
            opciones: ['A la altura de las rodillas', 'A la altura del cinto/abdomen', 'Lo más baja posible', 'A la altura del pecho'],
            correcta: 1,
          },
          {
            pregunta: '¿Por qué no es recomendable tocar con la guitarra muy baja para practicar?',
            opciones: ['Se ve mal', 'Dificulta el freteo y la posición de la mano', 'Desafina las cuerdas', 'La correa se rompe'],
            correcta: 1,
          },
        ],
      },
      {
        nombre: 'Posición de la mano derecha', tipo: 'exercise',
        objetivo: 'Posicionar los dedos sobre las cuerdas',
        descripcion: `La mano derecha controla el sonido, el ritmo y la dinámica.

🖐 **Con púa:**
- Sostené la púa entre el **pulgar** e **índice**, con solo 2-3mm asomando
- El movimiento viene de la **muñeca**, no solo del dedo
- El codo apoya ligeramente sobre el borde del cuerpo de la guitarra

🖐 **Con dedos (fingerstyle):**
- **p** = pulgar (cuerdas 4, 5, 6 graves)
- **i** = índice (cuerda 3)
- **m** = medio (cuerda 2)
- **a** = anular (cuerda 1)
- Los dedos atacan hacia la palma, no hacia afuera

🎯 **Ejercicio:** Tocá la cuerda Mi aguda (la más fina, E4) con la púa o el dedo índice. El afinador va a detectar si sonó correctamente.`,
        ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 10, tolerance: 20 }],
      },
      {
        nombre: 'Posición de la mano izquierda', tipo: 'exercise',
        objetivo: 'Pisar correctamente los trastes',
        descripcion: `La mano izquierda pisa las notas. Hacerlo mal genera ruido y cansancio.

✋ **Reglas de oro:**
- Los dedos caen **perpendiculares** al mástil, bien curvados (como si agarraras una pelota)
- Presioná justo **detrás del traste** (no encima, no lejos)
- El pulgar va detrás del mástil, aproximadamente detrás del dedo medio
- La palma **no** toca el mástil

❌ **Errores comunes:**
- Pulgar por encima del mástil → limita el movimiento de los dedos
- Dedo muy lejos del traste → sonido apagado o buzzing
- Apretar demasiado fuerte → se cansa la mano. Usá solo la presión necesaria

🎯 **Ejercicio:** Pisá el traste 2 de la cuerda La (quinta cuerda) para producir la nota Si (B2). Tocala y verificá que suene limpio con el afinador.`,
        ejercicios: [{ tipo: 'nota', esperada: 'A2', duracion: 10, tolerance: 20 }],
      },
      {
        nombre: 'Afinación básica con afinador', tipo: 'exercise',
        objetivo: 'Afinar las 6 cuerdas',
        descripcion: `Siempre afinar antes de practicar — una guitarra desafinada entrena el oído mal.

🎵 **Las 6 cuerdas al aire (de más gruesa a más fina):**

| Cuerda | Nota | Truco para recordar |
|--------|------|---------------------|
| 6ª (más gruesa) | **Mi (E2)** | "**E**sa cuerda es gruesa" |
| 5ª | **La (A2)** | "**A**rriba del Do" |
| 4ª | **Re (D3)** | "**R**e es la del medio" |
| 3ª | **Sol (G3)** | "Sol **G**rande" |
| 2ª | **Si (B3)** | "Si, sí" |
| 1ª (más fina) | **Mi (E4)** | "**E**s la más fina" |

🎯 **Cómo usar el afinador de Guitar+:**
1. Tocá cada cuerda al aire
2. La aguja y el color te indican si está afinada (🟢), grave (🔴 izq.) o aguda (🔴 der.)
3. Girá la clavija correspondiente hasta que la aguja quede centrada en verde
4. Afinala de grave a aguda: E2 → A2 → D3 → G3 → B3 → E4

🎯 **Ejercicio:** Tocá la cuerda Mi grave (E2) al aire para verificar que el afinador la detecte.`,
        ejercicios: [{ tipo: 'nota', esperada: 'E2', duracion: 15, tolerance: 10 }, { tipo: 'nota', esperada: 'A2', duracion: 15, tolerance: 10 }],
      },
      {
        nombre: 'Introducción a la púa', tipo: 'theory',
        objetivo: 'Conocer tipos y uso de la púa',
        quiz: [
          {
            pregunta: '¿Qué grosor de púa se recomienda para principiantes?',
            opciones: ['Muy fina (0.38mm)', 'Media (0.73-0.88mm)', 'Muy gruesa (2mm+)', 'No importa el grosor'],
            correcta: 1,
          },
          {
            pregunta: '¿Cuánto debe asomar la púa entre los dedos?',
            opciones: ['1 cm', 'La mitad', '2-3 mm', 'Toda la púa'],
            correcta: 2,
          },
          {
            pregunta: '¿Desde qué parte del brazo debe venir el movimiento al rasguear con púa?',
            opciones: ['Todo el brazo', 'El codo', 'La muñeca', 'Solo los dedos'],
            correcta: 2,
          },
          {
            pregunta: '¿Qué significa "down stroke"?',
            opciones: ['Golpe hacia arriba', 'Golpe hacia abajo', 'Golpe con el dedo', 'Apagar las cuerdas'],
            correcta: 1,
          },
        ],
        descripcion: `La púa (o plectro) es una pequeña pieza con la que golpeás las cuerdas. Parece simple pero tiene mucho impacto en el sonido.

🎸 **Tipos de púa por grosor:**

- **Fina (0.46 - 0.60mm)** — Flexible, ideal para rasgueos. Produce sonido brillante y suave. Buena para principiantes.
- **Media (0.73 - 0.88mm)** — Equilibrio entre flexibilidad y control. La más versátil. ✅ Recomendada para empezar.
- **Gruesa (1.0mm+)** — Rígida, más control sobre las notas, ideal para solistas y metal.

✋ **Cómo sostenerla:**
1. Cerrá el puño suavemente con la mano derecha
2. Apoyá la púa sobre la primera falange del **dedo índice**, con la punta apuntando hacia abajo
3. Cubría con el **pulgar** — dejá solo 2-3mm asomando
4. No la aprietes demasiado — relajá la mano

🎵 **Dirección del golpe:**
- **Down stroke (↓)**: el movimiento más natural, hacia el suelo
- **Up stroke (↑)**: hacia arriba, igual de importante
- Siempre desde la muñeca, no todo el brazo

Conseguí una púa media si no tenés. Son muy baratas y hacen gran diferencia.`,
        ejercicios: [],
      },
      {
        nombre: 'Tu primera nota: Mi (E4)', tipo: 'exercise',
        objetivo: 'Tocar la nota Mi en la primera cuerda',
        descripcion: `¡Tu primera nota real! La nota **Mi agudo (E4)** está en la primera cuerda al aire — sin pisar ningún traste.

🎯 **Cómo tocarla:**
1. Con la mano izquierda, no pisés ningún traste (cuerda al aire)
2. Con la mano derecha, golpeá **solo la primera cuerda** (la más fina)
3. El movimiento debe ser limpio — no toques las demás cuerdas

✅ **Pistas para que salga bien:**
- Usá la púa con un golpe suave hacia abajo
- Si el sonido es apagado, revisá que no estés tocando otra cuerda sin querer
- Esperá que el afinador muestre la nota E — si la aguja está cerca del centro, ¡perfecto!

🎵 **Dato:** Esta nota, Mi (E4) a 329.63 Hz, es la nota más aguda de las cuerdas al aire. Es ideal para empezar porque no hay que pisar nada.

Tocala varias veces hasta que el afinador la detecte consistentemente. 🟢`,
        ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 20, tolerance: 15 }],
      },
      {
        nombre: 'Tu primera nota: La (A2)', tipo: 'exercise',
        objetivo: 'Tocar la nota La en la quinta cuerda',
        descripcion: `La nota **La (A2)** es la quinta cuerda al aire — una de las más importantes porque es la referencia para afinar toda la guitarra.

🎯 **Cómo tocarla:**
1. Contá las cuerdas desde arriba: la quinta es la segunda más gruesa
2. No pisés ningún traste — cuerda al aire
3. Golpeá solo esa cuerda con la púa

✅ **Cómo identificar la cuerda correcta:**
- La más gruesa (1ª desde arriba) es Mi grave → **no** es esa
- La segunda más gruesa es **La (A2)** → esa es la que buscás

🎵 **¿Por qué es importante La?**
A 110 Hz, el La es la nota de referencia universal. Cuando un músico dice "dame un La", se refiere a esta nota (o su octava A4 a 440 Hz). Con ella afinamos toda la guitarra de oído.

Tocala varias veces limpiamente y verificá que el afinador detecte la nota A. 🟢`,
        ejercicios: [{ tipo: 'nota', esperada: 'A2', duracion: 20, tolerance: 15 }],
      },
      {
        nombre: 'Resumen: Intro y evaluación', tipo: 'exercise',
        objetivo: 'Consolidar postura y primeras notas',
        descripcion: `¡Llegaste al final del sub-nivel 1! Repasemos todo lo aprendido antes de continuar.

📋 **Checklist de postura:**
- [ ] Espalda recta, hombros relajados
- [ ] Guitarra estable sin apretarla con el brazo
- [ ] Mano izquierda con dedos curvos, pulgar detrás del mástil
- [ ] Mano derecha relajada sosteniendo la púa

🎵 **Las 6 cuerdas al aire que ya conocés:**
E2 · A2 · D3 · G3 · B3 · E4

🎯 **Evaluación:**
Tocá la cuerda **Mi agudo (E4)** y la cuerda **La (A2)** limpiamente, una por vez.
El afinador tiene que detectar cada nota correctamente.

Si lográs 70% o más de accuracy, ¡pasás al siguiente sub-nivel: **Acordes Básicos**! 🎸`,
        ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 30, tolerance: 10 }, { tipo: 'nota', esperada: 'A2', duracion: 30, tolerance: 10 }],
      },
    ],
  },
  sub2: {
    nombre: 'Acordes Básicos',
    lecciones: [
      { nombre: 'Acorde de Do Mayor (C)', tipo: 'exercise', objetivo: 'Pisar y sonar el acorde Do Mayor', ejercicios: [{ tipo: 'acorde', esperada: 'C', duracion: 20, tolerance: 25 }] },
      { nombre: 'Acorde de Sol Mayor (G)', tipo: 'exercise', objetivo: 'Pisar y sonar el acorde Sol Mayor', ejercicios: [{ tipo: 'acorde', esperada: 'G', duracion: 20, tolerance: 25 }] },
      { nombre: 'Acorde de Re Mayor (D)', tipo: 'exercise', objetivo: 'Pisar y sonar el acorde Re Mayor', ejercicios: [{ tipo: 'acorde', esperada: 'D', duracion: 20, tolerance: 25 }] },
      { nombre: 'Acorde de La Mayor (A)', tipo: 'exercise', objetivo: 'Pisar y sonar el acorde La Mayor', ejercicios: [{ tipo: 'acorde', esperada: 'A', duracion: 20, tolerance: 25 }] },
      { nombre: 'Acorde de Mi Mayor (E)', tipo: 'exercise', objetivo: 'Pisar y sonar el acorde Mi Mayor', ejercicios: [{ tipo: 'acorde', esperada: 'E', duracion: 20, tolerance: 25 }] },
      { nombre: 'Cambio Do-Sol', tipo: 'exercise', objetivo: 'Cambiar entre C y G fluidamente', ejercicios: [{ tipo: 'acorde', esperada: 'C', duracion: 10, tolerance: 25 }, { tipo: 'acorde', esperada: 'G', duracion: 10, tolerance: 25 }] },
      { nombre: 'Cambio Re-La', tipo: 'exercise', objetivo: 'Cambiar entre D y A fluidamente', ejercicios: [{ tipo: 'acorde', esperada: 'D', duracion: 10, tolerance: 25 }, { tipo: 'acorde', esperada: 'A', duracion: 10, tolerance: 25 }] },
      { nombre: 'Progresión C-G-Am-F', tipo: 'exercise', objetivo: 'Tocar la progresión básica más popular', ejercicios: [{ tipo: 'acorde', esperada: 'C', duracion: 8, tolerance: 20 }, { tipo: 'acorde', esperada: 'G', duracion: 8, tolerance: 20 }] },
      { nombre: 'Acordes menores: Am, Em, Dm', tipo: 'exercise', objetivo: 'Dominar los 3 acordes menores básicos', ejercicios: [{ tipo: 'acorde', esperada: 'Am', duracion: 15, tolerance: 20 }] },
      { nombre: 'Evaluación: 5 acordes básicos', tipo: 'exercise', objetivo: 'Tocar los 5 acordes con cambio fluido', ejercicios: [{ tipo: 'acorde', esperada: 'C', duracion: 10, tolerance: 15 }, { tipo: 'acorde', esperada: 'G', duracion: 10, tolerance: 15 }, { tipo: 'acorde', esperada: 'D', duracion: 10, tolerance: 15 }] },
    ],
  },
  sub3: {
    nombre: 'Rasgueo Básico',
    lecciones: [
      { nombre: 'El rasgueo hacia abajo (Down)', tipo: 'video', objetivo: 'Dominar el movimiento básico de rasgueo', ejercicios: [] },
      { nombre: 'El rasgueo hacia arriba (Up)', tipo: 'exercise', objetivo: 'Rasguear hacia arriba con control', ejercicios: [{ tipo: 'rasgueo', esperada: 'up', duracion: 15, tolerance: 30 }] },
      { nombre: 'Patrón D-D-D-D (negras)', tipo: 'exercise', objetivo: 'Mantener ritmo constante en negras', ejercicios: [{ tipo: 'rasgueo', esperada: 'D', duracion: 20, tolerance: 25 }] },
      { nombre: 'Patrón D-U-D-U', tipo: 'exercise', objetivo: 'Alternar rasgueo arriba-abajo', ejercicios: [{ tipo: 'rasgueo', esperada: 'DU', duracion: 20, tolerance: 25 }] },
      { nombre: 'Patrón D-D-U-U-D-U', tipo: 'exercise', objetivo: 'Patrón de 8 tiempos básico', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 25, tolerance: 20 }] },
      { nombre: 'Rasgueo con apagado (mute)', tipo: 'video', objetivo: 'Agregar percusión al rasgueo', ejercicios: [] },
      { nombre: 'Ritmo de vals 3/4', tipo: 'exercise', objetivo: 'Tocar en compás de 3 tiempos', ejercicios: [{ tipo: 'rasgueo', esperada: 'DUU', duracion: 20, tolerance: 20 }] },
      { nombre: 'Rasgueo con cambios de acorde', tipo: 'exercise', objetivo: 'Rasguear mientras cambias acordes C-G', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 30, tolerance: 20 }] },
      { nombre: 'Dinámica: piano y forte', tipo: 'exercise', objetivo: 'Controlar la intensidad del rasgueo', ejercicios: [{ tipo: 'rasgueo', esperada: 'soft', duracion: 20, tolerance: 25 }] },
      { nombre: 'Evaluación: Rasgueo fluido', tipo: 'exercise', objetivo: 'Demostrar patrón DDUUDU con cambios de acorde', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 40, tolerance: 15 }] },
    ],
  },
  sub4: {
    nombre: 'Técnica de Dedos',
    lecciones: [
      { nombre: 'Nomenclatura PIMA', tipo: 'theory', objetivo: 'Conocer la nomenclatura de dedos flamencos', ejercicios: [] },
      { nombre: 'Ejercicio de independencia digital', tipo: 'exercise', objetivo: 'Mover cada dedo independientemente', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 20, tolerance: 20 }] },
      { nombre: 'Escala cromática con dedo índice', tipo: 'exercise', objetivo: 'Tocar la escala cromática en posición 1', ejercicios: [{ tipo: 'nota', esperada: 'F4', duracion: 20, tolerance: 15 }] },
      { nombre: 'Ejercicio 1-2-3-4 en trastes', tipo: 'exercise', objetivo: 'Coordinar los 4 dedos en progresión', ejercicios: [{ tipo: 'nota', esperada: 'G3', duracion: 25, tolerance: 15 }] },
      { nombre: 'Ligado ascendente (Hammer-on)', tipo: 'video', objetivo: 'Aprender la técnica de hammer-on', ejercicios: [] },
      { nombre: 'Ligado descendente (Pull-off)', tipo: 'exercise', objetivo: 'Ejecutar pull-offs correctamente', ejercicios: [{ tipo: 'nota', esperada: 'B3', duracion: 20, tolerance: 20 }] },
      { nombre: 'Ejercicio araña (Spider exercise)', tipo: 'exercise', objetivo: 'Desarrollar velocidad y coordinación', ejercicios: [{ tipo: 'nota', esperada: 'D3', duracion: 30, tolerance: 15 }] },
      { nombre: 'Posición de cejilla media', tipo: 'video', objetivo: 'Introducción a los acordes de cejilla', ejercicios: [] },
      { nombre: 'Cejilla en traste 2: B Mayor', tipo: 'exercise', objetivo: 'Tocar primer acorde con cejilla', ejercicios: [{ tipo: 'acorde', esperada: 'B', duracion: 20, tolerance: 25 }] },
      { nombre: 'Evaluación: Técnica digital', tipo: 'exercise', objetivo: 'Escala cromática y ligados', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 30, tolerance: 10 }] },
    ],
  },
  sub5: {
    nombre: 'Notas Sueltas',
    lecciones: [
      { nombre: 'Las 6 notas al aire', tipo: 'exercise', objetivo: 'Identificar y tocar E A D G B E', ejercicios: [{ tipo: 'nota', esperada: 'E2', duracion: 10, tolerance: 15 }, { tipo: 'nota', esperada: 'A2', duracion: 10, tolerance: 15 }] },
      { nombre: 'Notas en la cuerda 1 (E)', tipo: 'exercise', objetivo: 'Tocar F, F#, G, G#, A en la 1ª cuerda', ejercicios: [{ tipo: 'nota', esperada: 'F4', duracion: 15, tolerance: 15 }] },
      { nombre: 'Notas en la cuerda 2 (B)', tipo: 'exercise', objetivo: 'Tocar C, C#, D, D# en la 2ª cuerda', ejercicios: [{ tipo: 'nota', esperada: 'C4', duracion: 15, tolerance: 15 }] },
      { nombre: 'Notas en la cuerda 3 (G)', tipo: 'exercise', objetivo: 'Notas en la 3ª cuerda posición abierta', ejercicios: [{ tipo: 'nota', esperada: 'G#3', duracion: 15, tolerance: 15 }] },
      { nombre: 'Escala de Do Mayor (posición 1)', tipo: 'exercise', objetivo: 'Tocar la escala de Do Mayor completa', ejercicios: [{ tipo: 'escala', esperada: 'C_major', duracion: 30, tolerance: 15 }] },
      { nombre: 'Escala de Sol Mayor', tipo: 'exercise', objetivo: 'Tocar la escala de Sol Mayor', ejercicios: [{ tipo: 'escala', esperada: 'G_major', duracion: 30, tolerance: 15 }] },
      { nombre: 'Escala pentatónica menor de La', tipo: 'exercise', objetivo: 'Introducción a la pentatónica', ejercicios: [{ tipo: 'escala', esperada: 'Am_penta', duracion: 30, tolerance: 15 }] },
      { nombre: 'Melodía simple: Cumpleaños Feliz', tipo: 'exercise', objetivo: 'Tocar melodía reconocible con notas', ejercicios: [{ tipo: 'nota', esperada: 'G3', duracion: 5, tolerance: 20 }] },
      { nombre: 'Lectura de notas en papel', tipo: 'theory', objetivo: 'Entender el pentagrama básico', ejercicios: [] },
      { nombre: 'Evaluación: Notas y escala Do', tipo: 'exercise', objetivo: 'Tocar escala completa sin errores', ejercicios: [{ tipo: 'escala', esperada: 'C_major', duracion: 40, tolerance: 10 }] },
    ],
  },
  sub6: {
    nombre: 'Lectura de Tablatura',
    lecciones: [
      { nombre: 'Qué es una tablatura', tipo: 'theory', objetivo: 'Entender el sistema de tablatura', ejercicios: [] },
      { nombre: 'Leer tabs: números y cuerdas', tipo: 'theory', objetivo: 'Interpretar números en tablaturas', ejercicios: [] },
      { nombre: 'Tu primera tablatura: Smoke on the Water', tipo: 'exercise', objetivo: 'Tocar el riff básico', ejercicios: [{ tipo: 'nota', esperada: 'G3', duracion: 5, tolerance: 20 }] },
      { nombre: 'Tabs con técnicas: h, p, b', tipo: 'theory', objetivo: 'Entender símbolos de técnicas', ejercicios: [] },
      { nombre: 'Tablatura con rasgueo: Knockin on Heavens Door', tipo: 'exercise', objetivo: 'Combinar tabs y rasgueo', ejercicios: [{ tipo: 'rasgueo', esperada: 'D', duracion: 20, tolerance: 20 }] },
      { nombre: 'Tabs con hammer-on y pull-off', tipo: 'exercise', objetivo: 'Ejecutar ligados desde tablatura', ejercicios: [{ tipo: 'nota', esperada: 'A2', duracion: 20, tolerance: 20 }] },
      { nombre: 'Riff de 3 cuerdas', tipo: 'exercise', objetivo: 'Tocar riff que abarca 3 cuerdas', ejercicios: [{ tipo: 'nota', esperada: 'D3', duracion: 25, tolerance: 15 }] },
      { nombre: 'Tabs con posición de cejilla', tipo: 'theory', objetivo: 'Leer tabs con indicación de cejilla', ejercicios: [] },
      { nombre: 'Canción completa en tabs: Ode to Joy', tipo: 'exercise', objetivo: 'Completar melodía de 16 compases', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 5, tolerance: 20 }] },
      { nombre: 'Evaluación: Tablatura fluida', tipo: 'exercise', objetivo: 'Leer y tocar tab sin pausas', ejercicios: [{ tipo: 'nota', esperada: 'G3', duracion: 60, tolerance: 10 }] },
    ],
  },
  sub7: {
    nombre: 'Ritmos Simples',
    lecciones: [
      { nombre: 'El metrónomo: tu mejor amigo', tipo: 'theory', objetivo: 'Entender el uso del metrónomo', ejercicios: [] },
      { nombre: 'Compás de 4/4: negras y corcheas', tipo: 'exercise', objetivo: 'Tocar en compás 4/4 con metrónomo', ejercicios: [{ tipo: 'rasgueo', esperada: 'D', duracion: 20, tolerance: 20 }] },
      { nombre: 'Ritmo de cumbia básico', tipo: 'exercise', objetivo: 'Tocar patrón de cumbia', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 25, tolerance: 20 }] },
      { nombre: 'Ritmo de rock básico', tipo: 'exercise', objetivo: 'Patrón de rock en 4/4', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 25, tolerance: 20 }] },
      { nombre: 'Ritmo de balada', tipo: 'exercise', objetivo: 'Patrón lento y expresivo', ejercicios: [{ tipo: 'rasgueo', esperada: 'DUU', duracion: 20, tolerance: 25 }] },
      { nombre: 'Síncopas básicas', tipo: 'video', objetivo: 'Entender y tocar síncopas simples', ejercicios: [] },
      { nombre: 'Ritmo de pop argentino', tipo: 'exercise', objetivo: 'Patrón popular en música nacional', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 30, tolerance: 20 }] },
      { nombre: 'Ritmo de reggae', tipo: 'exercise', objetivo: 'El característico offbeat del reggae', ejercicios: [{ tipo: 'rasgueo', esperada: 'UU', duracion: 25, tolerance: 20 }] },
      { nombre: 'Cambio de ritmo: transiciones', tipo: 'exercise', objetivo: 'Pasar de un patrón a otro sin parar', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 35, tolerance: 15 }] },
      { nombre: 'Evaluación: Ritmos variados', tipo: 'exercise', objetivo: 'Tocar 3 ritmos distintos con cambios', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 45, tolerance: 15 }] },
    ],
  },
  sub8: {
    nombre: 'Arpegios Básicos',
    lecciones: [
      { nombre: 'Qué es un arpegio', tipo: 'theory', objetivo: 'Entender la diferencia entre arpegio y acorde', ejercicios: [] },
      { nombre: 'Patrón PIMA en Do Mayor', tipo: 'exercise', objetivo: 'Arpegio básico sobre acorde C', ejercicios: [{ tipo: 'arpegio', esperada: 'C_arpegio', duracion: 20, tolerance: 20 }] },
      { nombre: 'Arpegio en Sol Mayor', tipo: 'exercise', objetivo: 'PIMA sobre acorde G', ejercicios: [{ tipo: 'arpegio', esperada: 'G_arpegio', duracion: 20, tolerance: 20 }] },
      { nombre: 'Patrón p-i-m-a-m-i', tipo: 'exercise', objetivo: 'Arpegio de 6 notas', ejercicios: [{ tipo: 'arpegio', esperada: 'C_arpegio6', duracion: 25, tolerance: 20 }] },
      { nombre: 'Arpegio en La menor', tipo: 'exercise', objetivo: 'PIMA sobre Am', ejercicios: [{ tipo: 'arpegio', esperada: 'Am_arpegio', duracion: 20, tolerance: 20 }] },
      { nombre: 'Arpegios con cambio de acorde C-G', tipo: 'exercise', objetivo: 'Mantener el patrón cambiando acordes', ejercicios: [{ tipo: 'arpegio', esperada: 'C_arpegio', duracion: 30, tolerance: 15 }] },
      { nombre: 'Romance de Amor (intro)', tipo: 'exercise', objetivo: 'Tocar el arpegio clásico más famoso', ejercicios: [{ tipo: 'arpegio', esperada: 'E_arpegio', duracion: 30, tolerance: 20 }] },
      { nombre: 'Dinámica en arpegios', tipo: 'exercise', objetivo: 'Tocar arpegios con variación de volumen', ejercicios: [{ tipo: 'arpegio', esperada: 'Am_arpegio', duracion: 25, tolerance: 20 }] },
      { nombre: 'Arpegios en posición de cejilla', tipo: 'exercise', objetivo: 'Arpegio sobre Bm (cejilla traste 2)', ejercicios: [{ tipo: 'arpegio', esperada: 'Bm_arpegio', duracion: 25, tolerance: 20 }] },
      { nombre: 'Evaluación: Arpegios fluidos', tipo: 'exercise', objetivo: 'PIMA con progresión Am-C-G-E', ejercicios: [{ tipo: 'arpegio', esperada: 'Am_arpegio', duracion: 50, tolerance: 10 }] },
    ],
  },
  sub9: {
    nombre: 'Canciones para Principiante',
    lecciones: [
      { nombre: 'Knockin on Heaven\'s Door (básico)', tipo: 'exercise', objetivo: 'Progresión G-D-Am con rasgueo', ejercicios: [{ tipo: 'acorde', esperada: 'G', duracion: 8, tolerance: 20 }, { tipo: 'acorde', esperada: 'D', duracion: 8, tolerance: 20 }] },
      { nombre: 'Wonderwall (intro)', tipo: 'exercise', objetivo: 'Acordes Em7-G-Dsus4-A7sus4', ejercicios: [{ tipo: 'acorde', esperada: 'Em', duracion: 8, tolerance: 20 }] },
      { nombre: 'La Bamba (ritmo)', tipo: 'exercise', objetivo: 'Patrón rítmico latinoamericano C-F-G', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 25, tolerance: 20 }] },
      { nombre: 'House of the Rising Sun', tipo: 'exercise', objetivo: 'Arpegio Am-C-D-F', ejercicios: [{ tipo: 'arpegio', esperada: 'Am_arpegio', duracion: 30, tolerance: 20 }] },
      { nombre: 'Tears in Heaven (intro)', tipo: 'exercise', objetivo: 'Fingerpicking básico de Clapton', ejercicios: [{ tipo: 'arpegio', esperada: 'A_arpegio', duracion: 30, tolerance: 20 }] },
      { nombre: 'Creep - Radiohead (acordes)', tipo: 'exercise', objetivo: 'Progresión G-B-C-Cm', ejercicios: [{ tipo: 'acorde', esperada: 'G', duracion: 8, tolerance: 20 }] },
      { nombre: 'Stand by Me (ritmo)', tipo: 'exercise', objetivo: 'Groove de 12/8 simplificado', ejercicios: [{ tipo: 'rasgueo', esperada: 'DUU', duracion: 25, tolerance: 20 }] },
      { nombre: 'El Condor Pasa (melodía)', tipo: 'exercise', objetivo: 'Melodía andina en notas sueltas', ejercicios: [{ tipo: 'nota', esperada: 'D3', duracion: 5, tolerance: 20 }] },
      { nombre: 'Yesterday - Beatles', tipo: 'exercise', objetivo: 'Progresión clásica con cejilla', ejercicios: [{ tipo: 'acorde', esperada: 'F', duracion: 10, tolerance: 20 }] },
      { nombre: 'Canción libre: tu favorita', tipo: 'exercise', objetivo: 'Aplicar lo aprendido en una canción propia', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 60, tolerance: 20 }] },
    ],
  },
  sub10: {
    nombre: 'Proyecto Final Principiante',
    lecciones: [
      { nombre: 'Repaso: Acordes básicos', tipo: 'exercise', objetivo: 'Los 8 acordes básicos sin errores', ejercicios: [{ tipo: 'acorde', esperada: 'C', duracion: 10, tolerance: 10 }, { tipo: 'acorde', esperada: 'G', duracion: 10, tolerance: 10 }] },
      { nombre: 'Repaso: Arpegios', tipo: 'exercise', objetivo: 'PIMA sobre C-Am-F-G', ejercicios: [{ tipo: 'arpegio', esperada: 'C_arpegio', duracion: 40, tolerance: 10 }] },
      { nombre: 'Repaso: Rasgueos', tipo: 'exercise', objetivo: '3 patrones distintos con cambios', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 40, tolerance: 10 }] },
      { nombre: 'Evaluación de postura y técnica', tipo: 'video', objetivo: 'Video de auto-evaluación con checklist', ejercicios: [] },
      { nombre: 'Teoría musical básica', tipo: 'theory', objetivo: 'Compás, figuras, escala mayor y menor', ejercicios: [] },
      { nombre: 'Canción 1: Tocar completa', tipo: 'exercise', objetivo: 'Canción de libre elección sin pausas', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 120, tolerance: 15 }] },
      { nombre: 'Canción 2: Con backing track', tipo: 'exercise', objetivo: 'Tocar a tiempo con pista de acompañamiento', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 120, tolerance: 15 }] },
      { nombre: 'Improvisación libre: 2 minutos', tipo: 'exercise', objetivo: 'Improvisar sobre la pentatónica de Am', ejercicios: [{ tipo: 'escala', esperada: 'Am_penta', duracion: 120, tolerance: 20 }] },
      { nombre: 'Grabación: Tu primera actuación', tipo: 'exercise', objetivo: 'Grabar 2 minutos de música', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 120, tolerance: 20 }] },
      { nombre: '¡Graduación Principiante!', tipo: 'theory', objetivo: 'Certificado de nivel Principiante completado', ejercicios: [] },
    ],
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// INTERMEDIO — 100 lecciones — Plan: lite+
// ──────────────────────────────────────────────────────────────────────────────

const INTERMEDIO = {
  sub1: {
    nombre: 'Rasgueo Avanzado',
    lecciones: [
      { nombre: 'Rasgueo con acento dinámico', tipo: 'exercise', objetivo: 'Acentuar tiempos fuertes y débiles', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 25, tolerance: 15 }] },
      { nombre: 'Patrón flamenco básico (golpe)', tipo: 'exercise', objetivo: 'Incorporar el golpe en el rasgueo', ejercicios: [{ tipo: 'rasgueo', esperada: 'golpe', duracion: 25, tolerance: 20 }] },
      { nombre: 'Rasgueo de 16avos', tipo: 'exercise', objetivo: 'Velocidad y precisión en semicorcheas', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDUUDUU', duracion: 30, tolerance: 15 }] },
      { nombre: 'Muting selectivo de cuerdas', tipo: 'exercise', objetivo: 'Apagar cuerdas mientras rasgueas', ejercicios: [{ tipo: 'rasgueo', esperada: 'muted', duracion: 25, tolerance: 15 }] },
      { nombre: 'Fingerstyle rasgueo mixto', tipo: 'exercise', objetivo: 'Combinar rasgueo y fingerpicking', ejercicios: [{ tipo: 'rasgueo', esperada: 'mixed', duracion: 30, tolerance: 20 }] },
      { nombre: 'Patrón de bossa nova', tipo: 'exercise', objetivo: 'El ritmo característico de la bossa nova', ejercicios: [{ tipo: 'rasgueo', esperada: 'bossa', duracion: 30, tolerance: 15 }] },
      { nombre: 'Swing y shuffle', tipo: 'exercise', objetivo: 'Tocar con feel de swing', ejercicios: [{ tipo: 'rasgueo', esperada: 'swing', duracion: 30, tolerance: 20 }] },
      { nombre: 'Polirritmo 2 contra 3', tipo: 'theory', objetivo: 'Entender polirritmos básicos', ejercicios: [] },
      { nombre: 'Rasgueo a 120 BPM sostenido', tipo: 'exercise', objetivo: 'Mantener tempo durante 2 minutos', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 120, tolerance: 10 }] },
      { nombre: 'Evaluación: Rasgueos avanzados', tipo: 'exercise', objetivo: '4 patrones distintos sin parar', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 60, tolerance: 10 }] },
    ],
  },
  sub2: {
    nombre: 'Arpegios Intermedios',
    lecciones: [
      { nombre: 'Arpegio de 6 cuerdas completo', tipo: 'exercise', objetivo: 'PIMAMI sobre acordes completos', ejercicios: [{ tipo: 'arpegio', esperada: 'E_arpegio6', duracion: 25, tolerance: 15 }] },
      { nombre: 'Arpegio rodante (rolling)', tipo: 'exercise', objetivo: 'Técnica de arpegio continuo', ejercicios: [{ tipo: 'arpegio', esperada: 'rolling', duracion: 25, tolerance: 15 }] },
      { nombre: 'Trémolo básico', tipo: 'exercise', objetivo: 'Técnica de trémolo p-a-m-i', ejercicios: [{ tipo: 'arpegio', esperada: 'tremolo', duracion: 30, tolerance: 20 }] },
      { nombre: 'Recuerdos de la Alhambra (intro)', tipo: 'exercise', objetivo: 'El trémolo más famoso de la guitarra', ejercicios: [{ tipo: 'arpegio', esperada: 'tremolo', duracion: 45, tolerance: 20 }] },
      { nombre: 'Arpegios con bajo en movimiento', tipo: 'exercise', objetivo: 'Notas de bajo alternadas en arpegio', ejercicios: [{ tipo: 'arpegio', esperada: 'moving_bass', duracion: 30, tolerance: 15 }] },
      { nombre: 'Patrón de Malagueña', tipo: 'exercise', objetivo: 'Arpegio flamenco básico', ejercicios: [{ tipo: 'arpegio', esperada: 'malaguena', duracion: 35, tolerance: 15 }] },
      { nombre: 'Arpegios en velocidad: 80-100 BPM', tipo: 'exercise', objetivo: 'Arpegios rápidos y limpios', ejercicios: [{ tipo: 'arpegio', esperada: 'C_arpegio', duracion: 60, tolerance: 10 }] },
      { nombre: 'Técnica Rasgueado español', tipo: 'exercise', objetivo: 'Rasgueado con todos los dedos', ejercicios: [{ tipo: 'arpegio', esperada: 'rasgueado', duracion: 30, tolerance: 20 }] },
      { nombre: 'Arpegios con adornos (mordentes)', tipo: 'exercise', objetivo: 'Añadir ornamentos a los arpegios', ejercicios: [{ tipo: 'arpegio', esperada: 'ornamentos', duracion: 30, tolerance: 15 }] },
      { nombre: 'Evaluación: Suite de arpegios', tipo: 'exercise', objetivo: 'Pieza de 3 minutos con múltiples técnicas', ejercicios: [{ tipo: 'arpegio', esperada: 'Am_arpegio', duracion: 180, tolerance: 10 }] },
    ],
  },
  sub3: {
    nombre: 'Guitarra Flamenca Básica',
    lecciones: [
      { nombre: 'Historia y estructura del flamenco', tipo: 'theory', objetivo: 'Entender los palos flamencos', ejercicios: [] },
      { nombre: 'El compás de Soleá (12 tiempos)', tipo: 'exercise', objetivo: 'Dominar el compás más importante', ejercicios: [{ tipo: 'rasgueo', esperada: 'solea', duracion: 30, tolerance: 20 }] },
      { nombre: 'Rumba flamenca básica', tipo: 'exercise', objetivo: 'Patrón de rumba catalana', ejercicios: [{ tipo: 'rasgueo', esperada: 'rumba', duracion: 30, tolerance: 15 }] },
      { nombre: 'Picado básico', tipo: 'exercise', objetivo: 'Técnica de picado i-m alternado', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 30, tolerance: 15 }] },
      { nombre: 'Alzapúa básica', tipo: 'exercise', objetivo: 'Técnica del pulgar en alzapúa', ejercicios: [{ tipo: 'arpegio', esperada: 'alzapua', duracion: 30, tolerance: 20 }] },
      { nombre: 'Bulerías: compás de 12', tipo: 'exercise', objetivo: 'El palo más rápido del flamenco', ejercicios: [{ tipo: 'rasgueo', esperada: 'bulerias', duracion: 30, tolerance: 20 }] },
      { nombre: 'Tangos flamencos', tipo: 'exercise', objetivo: 'Patrón de tangos en compás de 4', ejercicios: [{ tipo: 'rasgueo', esperada: 'tangos', duracion: 30, tolerance: 20 }] },
      { nombre: 'Falseta básica de Soleá', tipo: 'exercise', objetivo: 'Tu primera falseta completa', ejercicios: [{ tipo: 'nota', esperada: 'A2', duracion: 45, tolerance: 15 }] },
      { nombre: 'Posición flamenca de la mano', tipo: 'video', objetivo: 'Anatomía de la mano en flamenco', ejercicios: [] },
      { nombre: 'Evaluación: Mini-actuación flamenca', tipo: 'exercise', objetivo: 'Tocar Soleá o Rumba completa', ejercicios: [{ tipo: 'rasgueo', esperada: 'solea', duracion: 120, tolerance: 10 }] },
    ],
  },
  sub4: {
    nombre: 'Técnicas de Mano Derecha',
    lecciones: [
      { nombre: 'Travis picking básico', tipo: 'exercise', objetivo: 'El patrón de Merle Travis', ejercicios: [{ tipo: 'arpegio', esperada: 'travis', duracion: 30, tolerance: 15 }] },
      { nombre: 'Chet Atkins style', tipo: 'exercise', objetivo: 'Country fingerpicking avanzado', ejercicios: [{ tipo: 'arpegio', esperada: 'chet', duracion: 30, tolerance: 15 }] },
      { nombre: 'Percusión en la guitarra', tipo: 'video', objetivo: 'Slap y golpes percusivos', ejercicios: [] },
      { nombre: 'Armónico natural', tipo: 'exercise', objetivo: 'Producir armónicos en trastes 5, 7, 12', ejercicios: [{ tipo: 'nota', esperada: 'E5', duracion: 20, tolerance: 25 }] },
      { nombre: 'Armónico artificial', tipo: 'exercise', objetivo: 'Armónicos con técnica de la mano derecha', ejercicios: [{ tipo: 'nota', esperada: 'E5', duracion: 25, tolerance: 25 }] },
      { nombre: 'Whammy bar básico', tipo: 'theory', objetivo: 'Uso del vibrato con palanca', ejercicios: [] },
      { nombre: 'Palm muting', tipo: 'exercise', objetivo: 'Apagado con palma en cuerdas agudas', ejercicios: [{ tipo: 'rasgueo', esperada: 'palm_mute', duracion: 25, tolerance: 15 }] },
      { nombre: 'Hybrid picking', tipo: 'exercise', objetivo: 'Combinar púa y dedos', ejercicios: [{ tipo: 'arpegio', esperada: 'hybrid', duracion: 30, tolerance: 20 }] },
      { nombre: 'Chicken picking', tipo: 'exercise', objetivo: 'Técnica country de snap', ejercicios: [{ tipo: 'arpegio', esperada: 'chicken', duracion: 30, tolerance: 20 }] },
      { nombre: 'Evaluación: Técnicas diversas', tipo: 'exercise', objetivo: 'Demostrar 4 técnicas distintas', ejercicios: [{ tipo: 'arpegio', esperada: 'travis', duracion: 60, tolerance: 10 }] },
    ],
  },
  sub5: {
    nombre: 'Tapping',
    lecciones: [
      { nombre: 'Introducción al tapping', tipo: 'video', objetivo: 'Entender la técnica de Eddie Van Halen', ejercicios: [] },
      { nombre: 'Tapping de 1 dedo (básico)', tipo: 'exercise', objetivo: 'Tap simple con dedo índice derecho', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 20, tolerance: 20 }] },
      { nombre: 'Lick de tapping: T-8-5', tipo: 'exercise', objetivo: 'Primer lick de tapping real', ejercicios: [{ tipo: 'nota', esperada: 'D4', duracion: 25, tolerance: 20 }] },
      { nombre: 'Tapping en escala pentatónica', tipo: 'exercise', objetivo: 'Aplicar tapping en pentatónica de Am', ejercicios: [{ tipo: 'escala', esperada: 'Am_penta', duracion: 30, tolerance: 15 }] },
      { nombre: 'Tapping de 2 manos', tipo: 'exercise', objetivo: 'Tapping con ambas manos simultáneo', ejercicios: [{ tipo: 'nota', esperada: 'A3', duracion: 30, tolerance: 20 }] },
      { nombre: 'Tapping en 2 cuerdas', tipo: 'exercise', objetivo: 'Extender el tapping a múltiples cuerdas', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 35, tolerance: 15 }] },
      { nombre: 'Sweep tapping', tipo: 'exercise', objetivo: 'Combinar sweep picking y tapping', ejercicios: [{ tipo: 'nota', esperada: 'C4', duracion: 35, tolerance: 20 }] },
      { nombre: 'Tapping con legato', tipo: 'exercise', objetivo: 'Fluidez máxima en tapping', ejercicios: [{ tipo: 'nota', esperada: 'G3', duracion: 40, tolerance: 15 }] },
      { nombre: 'Solo de tapping: Eruption (simplificado)', tipo: 'exercise', objetivo: 'Tocar sección básica del solo icónico', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 60, tolerance: 15 }] },
      { nombre: 'Evaluación: Tapping técnico', tipo: 'exercise', objetivo: 'Demostrar tapping limpio a 100 BPM', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 60, tolerance: 10 }] },
    ],
  },
  sub6: {
    nombre: 'Bending y Vibrato',
    lecciones: [
      { nombre: 'Técnica de bending: medio tono', tipo: 'exercise', objetivo: 'Doblar la cuerda medio tono arriba', ejercicios: [{ tipo: 'nota', esperada: 'G#3', duracion: 20, tolerance: 15 }] },
      { nombre: 'Bending de tono completo', tipo: 'exercise', objetivo: 'Doblar un tono completo con afinación', ejercicios: [{ tipo: 'nota', esperada: 'A3', duracion: 20, tolerance: 15 }] },
      { nombre: 'Pre-bending (ghost bend)', tipo: 'exercise', objetivo: 'Doblar antes de pulsar la cuerda', ejercicios: [{ tipo: 'nota', esperada: 'B3', duracion: 20, tolerance: 20 }] },
      { nombre: 'Unison bend', tipo: 'exercise', objetivo: 'Doblar hasta igualar la nota de otra cuerda', ejercicios: [{ tipo: 'nota', esperada: 'B3', duracion: 25, tolerance: 10 }] },
      { nombre: 'Vibrato clásico de guitarra', tipo: 'exercise', objetivo: 'Vibrato de muñeca expresivo', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 20, tolerance: 25 }] },
      { nombre: 'Vibrato ancho y estrecho', tipo: 'exercise', objetivo: 'Controlar la velocidad del vibrato', ejercicios: [{ tipo: 'nota', esperada: 'G3', duracion: 20, tolerance: 25 }] },
      { nombre: 'Slide básico (glissando)', tipo: 'exercise', objetivo: 'Técnica de slide entre notas', ejercicios: [{ tipo: 'nota', esperada: 'A2', duracion: 20, tolerance: 20 }] },
      { nombre: 'Slide con bottleneck', tipo: 'video', objetivo: 'Introducción al slide guitar', ejercicios: [] },
      { nombre: 'Lick de blues con bending', tipo: 'exercise', objetivo: 'Frase de blues expresiva', ejercicios: [{ tipo: 'nota', esperada: 'G3', duracion: 40, tolerance: 15 }] },
      { nombre: 'Evaluación: Expresividad', tipo: 'exercise', objetivo: 'Solo de 30 segundos con bending y vibrato', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 30, tolerance: 10 }] },
    ],
  },
  sub7: {
    nombre: 'Canciones Intermedias',
    lecciones: [
      { nombre: 'Hotel California (arpegios)', tipo: 'exercise', objetivo: 'Fingerpicking del intro clásico', ejercicios: [{ tipo: 'arpegio', esperada: 'Bm_arpegio', duracion: 45, tolerance: 15 }] },
      { nombre: 'Sultans of Swing (riffs)', tipo: 'exercise', objetivo: 'Los riffs principales de Knopfler', ejercicios: [{ tipo: 'nota', esperada: 'D3', duracion: 40, tolerance: 15 }] },
      { nombre: 'Stairway to Heaven (intro)', tipo: 'exercise', objetivo: 'El intro de fingerpicking más famoso', ejercicios: [{ tipo: 'arpegio', esperada: 'Am_arpegio', duracion: 60, tolerance: 15 }] },
      { nombre: 'Nothing Else Matters (arpegios)', tipo: 'exercise', objetivo: 'Arpegios de Metallica', ejercicios: [{ tipo: 'arpegio', esperada: 'Em_arpegio', duracion: 60, tolerance: 15 }] },
      { nombre: 'Black Bird - Beatles', tipo: 'exercise', objetivo: 'Fingerpicking y melodía simultánea', ejercicios: [{ tipo: 'arpegio', esperada: 'G_arpegio', duracion: 60, tolerance: 15 }] },
      { nombre: 'Wish You Were Here', tipo: 'exercise', objetivo: 'Intro de fingerpicking de Floyd', ejercicios: [{ tipo: 'arpegio', esperada: 'G_arpegio', duracion: 60, tolerance: 15 }] },
      { nombre: 'La Cumparsita (versión guitarra)', tipo: 'exercise', objetivo: 'Tango clásico adaptado para guitarra', ejercicios: [{ tipo: 'nota', esperada: 'D3', duracion: 60, tolerance: 15 }] },
      { nombre: 'Classical Gas (fragmento)', tipo: 'exercise', objetivo: 'El clásico de Mason Williams', ejercicios: [{ tipo: 'arpegio', esperada: 'Am_arpegio', duracion: 60, tolerance: 15 }] },
      { nombre: 'Claro de Luna (intro)', tipo: 'exercise', objetivo: 'Adaptar Beethoven a la guitarra', ejercicios: [{ tipo: 'arpegio', esperada: 'C#m_arpegio', duracion: 60, tolerance: 15 }] },
      { nombre: 'Evaluación: Canción completa', tipo: 'exercise', objetivo: 'Una canción intermedia de principio a fin', ejercicios: [{ tipo: 'arpegio', esperada: 'Am_arpegio', duracion: 180, tolerance: 10 }] },
    ],
  },
  sub8: {
    nombre: 'Improvisación',
    lecciones: [
      { nombre: 'La escala pentatónica mayor', tipo: 'exercise', objetivo: 'Pentatónica mayor en posición 1', ejercicios: [{ tipo: 'escala', esperada: 'G_penta', duracion: 30, tolerance: 15 }] },
      { nombre: '5 posiciones de la pentatónica', tipo: 'exercise', objetivo: 'Conectar las 5 posiciones en el mástil', ejercicios: [{ tipo: 'escala', esperada: 'Am_penta', duracion: 40, tolerance: 15 }] },
      { nombre: 'La escala de blues', tipo: 'exercise', objetivo: 'Pentatónica + blue note', ejercicios: [{ tipo: 'escala', esperada: 'blues_scale', duracion: 30, tolerance: 15 }] },
      { nombre: 'Modos griegos: Dorico y Frigio', tipo: 'theory', objetivo: 'Introducción a los modos', ejercicios: [] },
      { nombre: 'Improvisación sobre backing track blues', tipo: 'exercise', objetivo: 'Improvisar 2 min sobre blues en A', ejercicios: [{ tipo: 'escala', esperada: 'Am_penta', duracion: 120, tolerance: 20 }] },
      { nombre: 'Frases y licks básicos', tipo: 'exercise', objetivo: '5 licks de guitarra icónicos', ejercicios: [{ tipo: 'nota', esperada: 'G3', duracion: 40, tolerance: 15 }] },
      { nombre: 'Llamada y respuesta', tipo: 'exercise', objetivo: 'Diálogo musical básico', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 30, tolerance: 20 }] },
      { nombre: 'Pentatónica sobre acordes mayores', tipo: 'exercise', objetivo: 'Adaptar la escala a diferentes acordes', ejercicios: [{ tipo: 'escala', esperada: 'G_penta', duracion: 60, tolerance: 15 }] },
      { nombre: 'Vocabulario de blues: 10 licks', tipo: 'exercise', objetivo: 'Aprender frases listas para improvisar', ejercicios: [{ tipo: 'nota', esperada: 'A2', duracion: 60, tolerance: 15 }] },
      { nombre: 'Evaluación: Solo de 1 minuto', tipo: 'exercise', objetivo: 'Solo espontáneo con estructura', ejercicios: [{ tipo: 'escala', esperada: 'Am_penta', duracion: 60, tolerance: 10 }] },
    ],
  },
  sub9: {
    nombre: 'Proyecto Intermedio A',
    lecciones: [
      { nombre: 'Análisis de canción: Hotel California', tipo: 'theory', objetivo: 'Entender la estructura de una canción', ejercicios: [] },
      { nombre: 'Transcripción básica', tipo: 'exercise', objetivo: 'Identificar acordes de oído', ejercicios: [{ tipo: 'acorde', esperada: 'G', duracion: 15, tolerance: 15 }] },
      { nombre: 'Arranjo para guitarra sola', tipo: 'exercise', objetivo: 'Adaptar una canción para guitarra sola', ejercicios: [{ tipo: 'arpegio', esperada: 'C_arpegio', duracion: 60, tolerance: 15 }] },
      { nombre: 'Práctica con metrónomo: 100 BPM', tipo: 'exercise', objetivo: 'Tocar canción exactamente a 100 BPM', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 120, tolerance: 10 }] },
      { nombre: 'Grabación con backing track', tipo: 'exercise', objetivo: 'Primera grabación de calidad', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 120, tolerance: 15 }] },
      { nombre: 'Análisis de tu grabación', tipo: 'theory', objetivo: 'Auto-evaluación objetiva', ejercicios: [] },
      { nombre: 'Mejorar puntos débiles detectados', tipo: 'exercise', objetivo: 'Ejercicio personalizado de corrección', ejercicios: [{ tipo: 'nota', esperada: 'A2', duracion: 60, tolerance: 15 }] },
      { nombre: 'Re-grabación mejorada', tipo: 'exercise', objetivo: 'Grabación con mejoras aplicadas', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 120, tolerance: 10 }] },
      { nombre: 'Preparar repertorio de 2 canciones', tipo: 'exercise', objetivo: 'Dominar 2 canciones de memoria', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 180, tolerance: 10 }] },
      { nombre: 'Evaluación final intermedio A', tipo: 'exercise', objetivo: 'Actuación de las 2 canciones', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 240, tolerance: 10 }] },
    ],
  },
  sub10: {
    nombre: 'Proyecto Intermedio B',
    lecciones: [
      { nombre: 'Composición: progresiones de acordes', tipo: 'theory', objetivo: 'Entender cómo crear progresiones', ejercicios: [] },
      { nombre: 'Tu primer riff original', tipo: 'exercise', objetivo: 'Componer un riff de 4 compases', ejercicios: [{ tipo: 'nota', esperada: 'G3', duracion: 60, tolerance: 20 }] },
      { nombre: 'Estructura canción: verso-estribillo', tipo: 'theory', objetivo: 'Aprender formas musicales', ejercicios: [] },
      { nombre: 'Componer una progresión de 8 compases', tipo: 'exercise', objetivo: 'Tu propia progresión con 4 acordes', ejercicios: [{ tipo: 'acorde', esperada: 'C', duracion: 8, tolerance: 15 }] },
      { nombre: 'Añadir melodía a la progresión', tipo: 'exercise', objetivo: 'Crear melodía sobre tu progresión', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 60, tolerance: 15 }] },
      { nombre: 'Dinámica y expresión', tipo: 'exercise', objetivo: 'Añadir crescendo y decrescendo', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 40, tolerance: 20 }] },
      { nombre: 'Arreglo: intro-verso-coro-outro', tipo: 'exercise', objetivo: 'Estructura completa de canción', ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 120, tolerance: 15 }] },
      { nombre: 'Grabación de tu canción original', tipo: 'exercise', objetivo: 'Registrar tu primera composición', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 180, tolerance: 15 }] },
      { nombre: 'Revisión y feedback IA', tipo: 'exercise', objetivo: 'Análisis automático de la grabación', ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 60, tolerance: 15 }] },
      { nombre: '¡Graduación Intermedio!', tipo: 'theory', objetivo: 'Certificado de nivel Intermedio completado', ejercicios: [] },
    ],
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// AVANZADO — 100 lecciones — Plan: maestro
// ──────────────────────────────────────────────────────────────────────────────

const AVANZADO = {
  sub1: { nombre: 'Flamenco Completo', lecciones: [
    { nombre: 'Palos flamencos: los 12 esenciales', tipo: 'theory', objetivo: 'Dominar la teoría de todos los palos' },
    { nombre: 'Soleares completas', tipo: 'exercise', objetivo: 'Tocar soleá completa con falsetas' },
    { nombre: 'Bulerías virtuosismo', tipo: 'exercise', objetivo: 'Bulerías a tempo completo (160+ BPM)' },
    { nombre: 'Siguiriyas', tipo: 'exercise', objetivo: 'El palo más expresivo del flamenco' },
    { nombre: 'Alegrías completas', tipo: 'exercise', objetivo: 'Alegrías con compás de 12 tiempos' },
    { nombre: 'Fandangos', tipo: 'exercise', objetivo: 'Fandangos con falsetas y escobilla' },
    { nombre: 'Farruca', tipo: 'exercise', objetivo: 'Farruca clásica con palmas' },
    { nombre: 'Zambra mora', tipo: 'exercise', objetivo: 'Palo de origen árabe-andaluz' },
    { nombre: 'Granaina y Media Granaina', tipo: 'exercise', objetivo: 'Palos libres de Granada' },
    { nombre: 'Evaluación: Actuación flamenca completa', tipo: 'exercise', objetivo: 'Recital de 10 minutos en palos distintos' },
  ].map(l => ({ ...l, ejercicios: [{ tipo: 'rasgueo', esperada: 'solea', duracion: 60, tolerance: 10 }] })) },
  sub2: { nombre: 'Virtuosismo', lecciones: [
    { nombre: 'Velocidad: escalas a 200 BPM' },
    { nombre: 'Sweep picking avanzado: arpegios de 6 cuerdas' },
    { nombre: 'Economy picking' },
    { nombre: 'String skipping técnico' },
    { nombre: 'Legato extenso: 4 octavas' },
    { nombre: 'Tapping de 4 dedos' },
    { nombre: 'Polirritmos: 3 contra 4' },
    { nombre: 'Cambios de posición a alta velocidad' },
    { nombre: 'Control de dinámica extrema' },
    { nombre: 'Evaluación: Ejercicio técnico a 160 BPM' },
  ].map(n => ({ nombre: n.nombre || n, tipo: 'exercise', objetivo: n.nombre || n, ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 60, tolerance: 5 }] })) },
  sub3: { nombre: 'Composición', lecciones: [
    { nombre: 'Teoría armónica avanzada' },
    { nombre: 'Modulación y cambios de tonalidad' },
    { nombre: 'Contrapunto básico' },
    { nombre: 'Acordes extendidos: 9ª, 11ª, 13ª' },
    { nombre: 'Progresiones modales' },
    { nombre: 'Composición en modo dórico' },
    { nombre: 'Forma sonata simplificada' },
    { nombre: 'Arreglo para ensamble de guitarras' },
    { nombre: 'Notation: escritura en pentagrama' },
    { nombre: 'Evaluación: Composición de 4 minutos' },
  ].map(n => ({ nombre: n.nombre || n, tipo: 'theory', objetivo: n.nombre || n, ejercicios: [] })) },
  sub4: { nombre: 'Estilos Mundiales', lecciones: [
    { nombre: 'Jazz: acordes de jazz ii-V-I' },
    { nombre: 'Blues: 12 compases avanzado' },
    { nombre: 'Bossa nova: técnica de João Gilberto' },
    { nombre: 'Celtic guitar: DADGAD tuning' },
    { nombre: 'Fingerstyle country avanzado' },
    { nombre: 'Tango: escuela de Piazzolla' },
    { nombre: 'Música andina: charango adaptado' },
    { nombre: 'Rock progresivo: métricas impares' },
    { nombre: 'Metal: palm muting y riffs técnicos' },
    { nombre: 'Evaluación: Medley de estilos' },
  ].map(n => ({ nombre: n.nombre || n, tipo: 'exercise', objetivo: n.nombre || n, ejercicios: [{ tipo: 'nota', esperada: 'E4', duracion: 60, tolerance: 10 }] })) },
  sub5: { nombre: 'Jazz en Guitarra', lecciones: [
    { nombre: 'Acordes de jazz: maj7, min7, dom7' },
    { nombre: 'Voicings de jazz en cuerdas altas' },
    { nombre: 'Progresión ii-V-I en todas las tonalidades' },
    { nombre: 'Escala mixolidia' },
    { nombre: 'Escala altered' },
    { nombre: 'Improvisación bebop' },
    { nombre: 'Walking bass en guitarra' },
    { nombre: 'Chord melody básico' },
    { nombre: 'Standard jazz: Autumn Leaves' },
    { nombre: 'Evaluación: Jazz standard completo' },
  ].map(n => ({ nombre: n.nombre || n, tipo: 'exercise', objetivo: n.nombre || n, ejercicios: [{ tipo: 'acorde', esperada: 'Cmaj7', duracion: 30, tolerance: 15 }] })) },
  sub6: { nombre: 'Teoría Musical Avanzada', lecciones: [
    { nombre: 'Los 7 modos de la escala mayor' },
    { nombre: 'Escalas simétricas: disminuida y aumentada' },
    { nombre: 'Armonía funcional y no funcional' },
    { nombre: 'Reharmonización de standards' },
    { nombre: 'Cromatismo en guitarra' },
    { nombre: 'Análisis: Bach en guitarra' },
    { nombre: 'Politonalidad y atonalismo' },
    { nombre: 'Ritmo: métricas aditivas' },
    { nombre: 'Microtonalismo básico' },
    { nombre: 'Evaluación: Análisis de partitura' },
  ].map(n => ({ nombre: n.nombre || n, tipo: 'theory', objetivo: n.nombre || n, ejercicios: [] })) },
  sub7: { nombre: 'Grabación en Estudio', lecciones: [
    { nombre: 'Principios de grabación de guitarra' },
    { nombre: 'Microfonía: SM57 y posición' },
    { nombre: 'DI Box: señal limpia' },
    { nombre: 'Plugins de guitarra: Ampli simulado' },
    { nombre: 'Edición de audio básica' },
    { nombre: 'Mezcla: EQ y compresión en guitarra' },
    { nombre: 'Doble tracking (double track)' },
    { nombre: 'Masterización para streaming' },
    { nombre: 'Preparar demo profesional' },
    { nombre: 'Evaluación: Track listo para subir' },
  ].map(n => ({ nombre: n.nombre || n, tipo: 'theory', objetivo: n.nombre || n, ejercicios: [] })) },
  sub8: { nombre: 'Performance en Vivo', lecciones: [
    { nombre: 'Preparación mental: gestión del nerviosismo' },
    { nombre: 'Setlist y estructura del show' },
    { nombre: 'Configuración de pedalera' },
    { nombre: 'Sonido en vivo: monitor y PA' },
    { nombre: 'Interacción con el público' },
    { nombre: 'Errores en vivo: cómo recuperarse' },
    { nombre: 'Memoria de concierto: tocar sin partitura' },
    { nombre: 'Ensayo general con grabación' },
    { nombre: 'Primera actuación pública simulada' },
    { nombre: 'Evaluación: Actuación de 20 minutos' },
  ].map(n => ({ nombre: n.nombre || n, tipo: 'exercise', objetivo: n.nombre || n, ejercicios: [{ tipo: 'rasgueo', esperada: 'DDUUDU', duracion: 120, tolerance: 5 }] })) },
  sub9: { nombre: 'Proyectos Artísticos', lecciones: [
    { nombre: 'Componer EP de 4 canciones' },
    { nombre: 'Canción 1: Composición y arreglo' },
    { nombre: 'Canción 2: Grabación' },
    { nombre: 'Canción 3: Mezcla' },
    { nombre: 'Canción 4: Mastering' },
    { nombre: 'Diseño de portada con IA' },
    { nombre: 'Distribución digital: Distrokid/TuneCore' },
    { nombre: 'Estrategia en redes: content para guitarra' },
    { nombre: 'Lanzamiento: playlist pitch' },
    { nombre: 'Evaluación: EP publicado' },
  ].map(n => ({ nombre: n.nombre || n, tipo: 'theory', objetivo: n.nombre || n, ejercicios: [] })) },
  sub10: { nombre: 'Maestría Total', lecciones: [
    { nombre: 'Audición y análisis crítico avanzado' },
    { nombre: 'Técnicas de enseñanza para el futuro maestro' },
    { nombre: 'Transcripción avanzada: oído absoluto' },
    { nombre: 'Improvisación libre (avant-garde)' },
    { nombre: 'Proyecto final: concierto completo de 30 min' },
    { nombre: 'Auto-producción de videoclip' },
    { nombre: 'Plan de carrera musical' },
    { nombre: 'Portafolio artístico completo' },
    { nombre: 'Mentoría: enseña a un principiante' },
    { nombre: '¡Graduación Maestro! — Certificado Avanzado' },
  ].map(n => ({ nombre: n.nombre || n, tipo: 'theory', objetivo: n.nombre || n, ejercicios: [] })) },
};

// ──────────────────────────────────────────────────────────────────────────────
// Builder: genera el objeto LESSONS con todos los IDs y metadatos
// ──────────────────────────────────────────────────────────────────────────────

function buildLessons() {
  const result = {};
  const nivelData = [
    { key: 'principiante', abbr: 'prin', data: PRINCIPIANTE, planMinimo: 'free' },
    { key: 'intermedio', abbr: 'inter', data: INTERMEDIO, planMinimo: 'lite' },
    { key: 'avanzado', abbr: 'av', data: AVANZADO, planMinimo: 'maestro' },
  ];

  for (const { key, abbr, data, planMinimo } of nivelData) {
    for (let si = 1; si <= 10; si++) {
      const subKey = `sub${si}`;
      const subData = data[subKey];
      if (!subData) continue;

      for (let li = 1; li <= 10; li++) {
        const rawLesson = subData.lecciones[li - 1] || {};
        const id = `${abbr}_sub${si}_lec${li}`;
        const prevId = li > 1
          ? `${abbr}_sub${si}_lec${li - 1}`
          : si > 1
          ? `${abbr}_sub${si - 1}_lec10`
          : null;

        result[id] = {
          id,
          nivel: key,
          subnivel: si,
          leccion: li,
          nombre: rawLesson.nombre || `${subData.nombre} — Lección ${li}`,
          tipo: rawLesson.tipo || 'exercise',
          duracion: rawLesson.duracion || 5,
          objetivo: rawLesson.objetivo || `Objetivo de la lección ${li}`,
          descripcion: rawLesson.descripcion || null,
          ejercicios: rawLesson.ejercicios || [],
          quiz: rawLesson.quiz || null,
          requiereMinimoAccuracy: 70,
          prerequisito: prevId,
          planMinimo,
          videoUrl: null,
        };
      }
    }
  }

  return result;
}

/** @type {Object.<string, Lesson>} 300 lecciones indexadas por ID */
export const LESSONS = buildLessons();

/** @returns {string[]} IDs ordenados por nivel > subnivel > lección */
export const LESSON_IDS = Object.keys(LESSONS);
