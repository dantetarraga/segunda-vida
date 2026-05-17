# Segunda Vida · Design System

> Red de rescate animal para Lima — MVP · mayo 2026
> Lenguaje visual, tokens, componentes y reglas de copy para construir la app de forma consistente.

---

## Tabla de contenidos

1. [Filosofía visual](#1-filosofía-visual)
2. [Colores](#2-colores)
3. [Sistema de estados](#3-sistema-de-estados)
4. [Tipografía](#4-tipografía)
5. [Escala tipográfica](#5-escala-tipográfica)
6. [Espaciado](#6-espaciado)
7. [Radios (border-radius)](#7-radios-border-radius)
8. [Sombras](#8-sombras)
9. [Componentes UI](#9-componentes-ui)
10. [Iconografía](#10-iconografía)
11. [Layout móvil](#11-layout-móvil)
12. [Voz y tono](#12-voz-y-tono)
13. [Animaciones y microinteracciones](#13-animaciones-y-microinteracciones)
14. [Reference · todos los tokens](#14-reference--todos-los-tokens)
15. [Cómo usar este sistema](#15-cómo-usar-este-sistema)

---

## 1. Filosofía visual

**Warm · hopeful · directo.** Cruce de Airbnb (calidez, fotografía), Notion (densidad informativa controlada) y BeReal (inmediatez del momento). Mobile-first, sin modo oscuro (decisión explícita para el MVP).

Tres reglas a respetar siempre:

1. **El ink domina.** El color institucional `#16151b` es el ancla del sistema: aparece en texto, navegación e identidad. El resto son acentos.
2. **Datos en mono, palabras en sans.** IDs de caso, coordenadas, montos, horas → JetBrains Mono. Todo lo demás → Manrope.
3. **Lo urgente pulsa, lo demás respira.** Solo lo crítico anima.

---

## 2. Colores

> La marca tiene **4 colores institucionales** ordenados por jerarquía. De ahí se derivan los demás tokens en OKLCH para mantener armonía perceptual. Los HEX son los oficiales; los OKLCH son aproximaciones de derivados. **React Native no soporta OKLCH** — el código usa HEX (ver sección 15.3).

### 2.1 Paleta institucional · jerarquía

| #      | Token              | HEX       | RGB           | CMYK             | Rol                                                          |
| ------ | ------------------ | --------- | ------------- | ---------------- | ------------------------------------------------------------ |
| **01** | `--inst-ink`       | `#16151B` | 22, 21, 27    | 86 · 85 · 69 · — | **Más principal.** Texto, surfaces oscuras, contraste fuerte |
| **02** | `--inst-primary`   | `#F4AD40` | 244, 173, 64  | — · 40 · 84 · —  | CTAs, marca, acento principal                                |
| **03** | `--inst-secondary` | `#52B5A7` | 82, 181, 167  | 70 · — · 42 · —  | Acento de apoyo · estado "en proceso"                        |
| **04** | `--inst-bg`        | `#F1F8F8` | 241, 248, 248 | 8 · — · 4 · —    | Background del canvas                                        |

> **Por qué este orden:** `#16151b` cubre la mayor superficie de tinta en cada pantalla. `#f4ad40` es el acento que llama a la acción. `#52b5a7` es el segundo acento + el estado "en proceso" del flujo. `#f1f8f8` es el lienzo donde vive todo.

### 2.2 Superficies (derivadas de inst-bg)

| Token         | OKLCH                   | HEX aprox | Uso                             |
| ------------- | ----------------------- | --------- | ------------------------------- |
| `--bg`        | `var(--inst-bg)`        | `#F1F8F8` | Fondo de pantalla               |
| `--surface`   | `#FFFFFF`               | `#FFFFFF` | Cards, modales, app bar         |
| `--surface-2` | `oklch(0.96 0.008 200)` | `#EBF2F2` | Hover, inputs idle              |
| `--surface-3` | `oklch(0.93 0.012 195)` | `#DCE5E5` | Switches off, divisores fuertes |

### 2.3 Tipografía y bordes (derivados de inst-ink)

| Token             | OKLCH                   | HEX aprox | Uso                             |
| ----------------- | ----------------------- | --------- | ------------------------------- |
| `--text`          | `var(--inst-ink)`       | `#16151B` | Texto principal                 |
| `--text-2`        | `oklch(0.42 0.018 285)` | `#5E5C70` | Texto secundario, descripciones |
| `--text-3`        | `oklch(0.58 0.014 285)` | `#86859A` | Meta, labels, terciario         |
| `--text-inv`      | `var(--inst-bg)`        | `#F1F8F8` | Texto sobre fondos oscuros      |
| `--border`        | `oklch(0.91 0.014 195)` | `#D3DCDC` | Líneas 1 px (default)           |
| `--border-strong` | `oklch(0.85 0.018 195)` | `#BDC9C9` | Inputs, divisores marcados      |

### 2.4 Marca · derivadas del primary (amber)

| Token             | OKLCH                 | HEX aprox | Uso                        |
| ----------------- | --------------------- | --------- | -------------------------- |
| `--primary`       | `var(--inst-primary)` | `#F4AD40` | CTA principal, marca       |
| `--primary-hover` | `oklch(0.74 0.16 62)` | `#E59E2C` | Hover en CTAs              |
| `--primary-soft`  | `oklch(0.96 0.05 78)` | `#FBE9C5` | Background sobre marca     |
| `--primary-ink`   | `oklch(0.32 0.10 60)` | `#5A3A0F` | Texto sobre `primary-soft` |

### 2.5 Marca · derivadas del secondary (teal)

| Token               | OKLCH                   | HEX aprox | Uso                          |
| ------------------- | ----------------------- | --------- | ---------------------------- |
| `--secondary`       | `var(--inst-secondary)` | `#52B5A7` | Acento de apoyo              |
| `--secondary-hover` | `oklch(0.65 0.09 185)`  | `#3E9B8D` | Hover                        |
| `--secondary-soft`  | `oklch(0.95 0.03 185)`  | `#E2F1EE` | Background teal suave        |
| `--secondary-ink`   | `oklch(0.32 0.06 190)`  | `#1F4945` | Texto sobre `secondary-soft` |

---

## 3. Sistema de estados

Cada caso de animal rescatado pasa por **5 estados**. Cada estado tiene un color y un soft que se usan en chips, fondos y barras de progreso.

| #   | Estado          | Token              | OKLCH                   | HEX       | Significado                    |
| --- | --------------- | ------------------ | ----------------------- | --------- | ------------------------------ |
| 01  | **Reportado**   | `--state-reported` | `oklch(0.74 0.14 75)`   | `#D9A338` | Acaba de ser visto en la calle |
| 02  | **En revisión** | `--state-review`   | `oklch(0.62 0.13 250)`  | `#5876CB` | El equipo lo está validando    |
| 03  | **Tomado**      | `--state-taken`    | `oklch(0.58 0.16 305)`  | `#8C4FB8` | Un voluntario va camino        |
| 04  | **En proceso**  | `--state-progress` | `var(--inst-secondary)` | `#52B5A7` | En el albergue o veterinaria   |
| 05  | **Resuelto**    | `--state-resolved` | `oklch(0.62 0.13 155)`  | `#449878` | Adoptado o ya seguro           |

Cada uno tiene su `*-soft` (lightness 0.95 aprox.) para fondos.

**Regla de hue:** gold → azul → violeta → **teal (institucional)** → verde. El estado "en proceso" reusa el **secondary institucional** para anclar el flujo a la marca: cuando un caso está "siendo cuidado", la app se viste de su color de apoyo.

### 3.1 Urgencia

| Nivel       | Token            | OKLCH                  | HEX       | Uso                              |
| ----------- | ---------------- | ---------------------- | --------- | -------------------------------- |
| **Urgente** | `--urgency-high` | `oklch(0.58 0.21 28)`  | `#C24A2E` | Casos críticos · animación pulse |
| **Media**   | `--urgency-mid`  | `oklch(0.78 0.15 65)`  | `#F4AD40` | Atención pronto (≈ primary)      |
| **Estable** | `--urgency-low`  | `oklch(0.69 0.08 185)` | `#52B5A7` | Caso seguido (≈ secondary)       |

> Urgency mid/low se alinearon a los institucionales para reforzar identidad — un caso "media" se ve `primary`, un caso "estable" se ve `secondary`.

---

## 4. Tipografía

**Dos familias. Cinco pesos. Cargadas desde Google Fonts.**

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
```

### 4.1 Familias

| Token         | Familia            | Pesos                       | Uso                                              |
| ------------- | ------------------ | --------------------------- | ------------------------------------------------ |
| `--font-ui`   | **Manrope**        | 400 · 500 · 600 · 700 · 800 | UI, display, body, headings                      |
| `--font-mono` | **JetBrains Mono** | 400 · 500                   | Datos: IDs, coords, montos, horas, tags técnicos |

**Por qué Manrope:** geométrica humanista, cálida sin ser informal, legible de 10 a 60 px. No es la fuente típica de Material / iOS — eso le da identidad.

**Por qué JetBrains Mono:** mejor monospace gratuita para datos. `font-feature-settings: "tnum"` aplicado en la clase `.mono` para alinear números.

---

## 5. Escala tipográfica

| Rol                  | Tamaño     | Peso    | Line-height | Letter-spacing     | Uso                                 |
| -------------------- | ---------- | ------- | ----------- | ------------------ | ----------------------------------- |
| **Display**          | 44–72 px   | 800     | 0.95        | −0.035em           | Hero, portadas                      |
| **H1 · large title** | 26 px      | 800     | 1.05        | −0.02em            | App bar grande, títulos de pantalla |
| **H2 · section**     | 22–24 px   | 800     | 1.1         | −0.02em            | Headings de sección                 |
| **H3 · subtítulo**   | 16–18 px   | 700     | 1.2         | −0.01em            | Títulos de card, ficha              |
| **Body**             | 14–16 px   | 400–500 | 1.5         | −0.005em           | Texto general                       |
| **Body bold**        | 14 px      | 600–700 | 1.4         | −0.005em           | Énfasis inline                      |
| **Caption**          | 12–13 px   | 500     | 1.45        | 0                  | Meta, helpers, descripciones        |
| **Micro**            | 10.5–11 px | 600     | 1.3         | 0                  | Tags, labels de tab bar             |
| **Kicker (mono)**    | 11 px      | 600–700 | 1           | 0.06em (uppercase) | Eyebrow / sección                   |
| **Data (mono)**      | 10–13 px   | 500     | 1.3         | 0                  | IDs, coords, montos                 |

**Regla rápida:** Display y H1 con line-height < 1.1 y letter-spacing negativo (suelta el aire entre letras al ser grandes). Body con line-height 1.5 (cómodo para lectura).

---

## 6. Espaciado

**Escala de 4 px.** Todos los gaps, paddings y márgenes son múltiplos de 4.

| Token      | Valor | Uso típico                                  |
| ---------- | ----- | ------------------------------------------- |
| `space-1`  | 4 px  | Mini gaps, inset de chips                   |
| `space-2`  | 8 px  | Entre items pequeños                        |
| `space-3`  | 12 px | **Default entre cards**                     |
| `space-4`  | 16 px | Padding interno card                        |
| `space-5`  | 20 px | Espaciado vertical entre secciones (mobile) |
| `space-6`  | 24 px | Padding lateral pantalla / sección          |
| `space-8`  | 32 px | Entre bloques grandes                       |
| `space-12` | 48 px | Secciones desktop                           |

---

## 7. Radios (border-radius)

| Token     | Valor  | Uso                                               |
| --------- | ------ | ------------------------------------------------- |
| `--r-sm`  | 10 px  | Inputs SM, chips compactos                        |
| `--r-md`  | 14 px  | Cards pequeñas, buttons MD                        |
| `--r-lg`  | 20 px  | Cards de caso, tarjetas grandes                   |
| `--r-xl`  | 28 px  | Bottom sheets, modales                            |
| `pill`    | 999 px | Chips de estado, avatares, CTAs pill              |
| iOS bezel | 48 px  | Frame del iPhone (no es token, viene del starter) |

**Regla:** los radios suaves transmiten confianza y calidez. Para algo "técnico" (terminal admin, mono) usar `--r-sm`. Para algo "cálido" (caso, ficha) usar `--r-lg` o mayor.

---

## 8. Sombras

3 niveles, **todas tintadas hacia el ink institucional** (`rgba(22, 21, 27, *)`) para integrarse con la paleta sin grises planos.

| Token         | Valor                                                                 | Uso                         |
| ------------- | --------------------------------------------------------------------- | --------------------------- |
| `--shadow-sm` | `0 1px 2px rgba(22,21,27,.05), 0 1px 1px rgba(22,21,27,.03)`          | Cards en reposo             |
| `--shadow-md` | `0 4px 10px rgba(22,21,27,.07), 0 1px 3px rgba(22,21,27,.04)`         | Cards elevadas, sticky bars |
| `--shadow-lg` | `0 18px 40px -10px rgba(22,21,27,.22), 0 4px 12px rgba(22,21,27,.08)` | Modales, sheets, FAB        |

---

## 9. Componentes UI

### 9.1 Botones

| Variante    | Background       | Color           | Border            | Uso                              |
| ----------- | ---------------- | --------------- | ----------------- | -------------------------------- |
| `primary`   | `--primary`      | `#fff`          | —                 | CTA principal de cada pantalla   |
| `secondary` | `--surface`      | `--text`        | `--border-strong` | Acciones alternativas            |
| `soft`      | `--primary-soft` | `--primary-ink` | —                 | CTA cálido sin gritar            |
| `ghost`     | transparent      | `--text`        | —                 | Acciones terciarias, "Saltar"    |
| `dark`      | `--text`         | `--surface`     | —                 | Acciones contrastantes, WhatsApp |
| `danger`    | `--urgency-high` | `#fff`          | —                 | Eliminar, cancelar caso          |

**Tamaños:**

| Size | Height    | Padding | Font token  | px     | Peso | Radio | Gap (icon) |
| ---- | --------- | ------- | ----------- | ------ | ---- | ----- | ---------- |
| `sm` | 34 px     | 0 14    | `text-btn-sm` | 13 px  | 600  | 10 px | 6          |
| `md` | **44 px** | 0 18    | `text-btn-md` | 14.5 px| 600  | 12 px | 8          |
| `lg` | 52 px     | 0 22    | `text-btn-lg` | 15.5 px| 600  | 14 px | 10         |

**MD (44 px) es el tamaño por defecto** y respeta el hit target mínimo móvil.

### 9.2 Inputs

| Tipo       | Height    | Radio | Border idle       | Border focus                        |
| ---------- | --------- | ----- | ----------------- | ----------------------------------- |
| `sm`       | 34 px     | 10 px | `--border-strong` | `--primary` + halo `--primary-soft` |
| `md`       | **44 px** | 12 px | `--border-strong` | `--primary` + halo `--primary-soft` |
| `lg`       | 52 px     | 14 px | `--border-strong` | `--primary` + halo `--primary-soft` |
| `textarea` | 100 px+   | 14 px | `--border-strong` | igual                               |

**Estados:**

- **Focus:** `border-color: var(--primary)` + `box-shadow: 0 0 0 3px var(--primary-soft)`
- **Error:** `border-color: var(--urgency-high)` + halo en `oklch(0.95 0.05 28)`
- **Readonly:** mismo aspecto, texto puede ser mono si es dato (GPS, ID)

**Label arriba en 12.5 / 600 / `--text-2`. Helper debajo en 11.5 / `--text-3`. Error en 11.5 / 600 / `--urgency-high`.**

### 9.3 Switches

```
50 × 30 px · radio 999 · pulgar 24 × 24 blanco
Off → background var(--surface-3) · border var(--border-strong)
On  → background var(--primary) · sin border
Transición: 180 ms ease (background + transform)
```

### 9.4 Case card (feed)

Estructura canónica del caso en el feed principal:

```
┌─────────────────────────────┐
│ [chip estado]      [urg]    │ ← photo · 168 px
│                             │   placeholder o foto real
│                  foto · ID  │
├─────────────────────────────┤
│ Título del caso             │ ← 16 / 700
│ C-4521 · 320 m · hace 7 min │ ← 12 / 400 / text-3 · mono ID
│                             │
│ [ Yo puedo ayudar ] [ ⇪ ]   │ ← btn primary + secondary share
└─────────────────────────────┘
   radius 20 · border 1 · shadow-sm
```

### 9.5 App bar (superior)

**Compacta · 56 px:**

- Back button (36×36 icon-btn) — Título centrado — More button
- Sticky con `backdrop-filter: blur(12px)` y background `bg @ 92%`

**Grande · 88 px:**

- Mono kicker arriba (fecha o sección) + iconos derecha
- Large title 26 / 800 debajo
- Subtítulo opcional 13.5 / `--text-2`

### 9.6 Tab bar (inferior)

5 tabs · Inicio · Mapa · **Reportar (FAB centro)** · Adoptar · Perfil

```
Altura total: 78 px (incluye 26 px safe area inferior)
FAB centro: 52×52, radio 18, elevado −14 px
  Halo: 4 px ring var(--surface) + sombra teñida primary
Tabs:
  Icono: 22 px · color var(--text-3) idle, var(--primary) active
  Label: 10.5 / 600
Background: var(--surface) @ 92 % + blur 20 px
```

### 9.7 Avatares

| Size   | Píxeles   | Font size iniciales |
| ------ | --------- | ------------------- |
| xs     | 28 px     | 10.6 px             |
| sm     | 36 px     | 13.7 px             |
| **md** | **44 px** | 16.7 px             |
| lg     | 52 px     | 19.8 px             |
| xl     | 64 px     | 24.3 px             |

**Tonos:** `warm` (38°) · `sage` (155°) · `cool` (240°) · `rose` (20°) · `sand` (85°) — todos en lightness 0.85, chroma 0.05.

**Iniciales:** primeras 2 letras del nombre, mayúsculas. Color: `oklch(0.30 0.10 40)`.

**Ring opcional:** `box-shadow: 0 0 0 2px var(--surface), 0 0 0 4px var(--primary)`.

### 9.8 Photo placeholder

Cuando no hay imagen real, mostramos un placeholder con franjas diagonales + label monospace. Mejor que un cuadro gris.

```css
background: repeating-linear-gradient(135deg, <tone-a> 0 8px, <tone-b> 8px 16px);
+ overlay radial 30/20 al 35 % blanco
+ label mono en esquina inferior izquierda
```

**Tonos disponibles:** `warm` (50°), `cool` (200°), `sage` (145°), `rose` (25°), `sand` (85°). Cambia el hue, mantén lightness/chroma.

### 9.9 Chips de estado

```
display: inline-flex · gap 6
padding: 4 9 (md) · 3 7 (sm) · 6 12 (lg)
border-radius: 999
font-size: 11.5 (md) · 10.5 (sm) · 13 (lg)
font-weight: 600
color: var(--state-X)
background: var(--state-X-soft)
+ ball 6 px solid color
```

---

## 10. Iconografía

**Set propio · 25 íconos · line-art**

| Spec            | Valor                                           |
| --------------- | ----------------------------------------------- |
| viewBox         | `0 0 24 24`                                     |
| fill            | `none`                                          |
| stroke          | `currentColor` (hereda el color del texto)      |
| stroke-width    | `1.8` por defecto · `2.4` para `plus` y `check` |
| stroke-linecap  | `round`                                         |
| stroke-linejoin | `round`                                         |

### 10.1 Íconos disponibles

**Navegación:** `home` · `map` · `arrow` · `back` · `close`
**Acciones:** `plus` · `check` · `share` · `more` · `filter` · `search`
**Comunicación:** `bell` · `phone` · `chat`
**Marca:** `paw` · `heart` · `gift`
**Captura:** `camera` · `video` · `pin`
**Identidad:** `user` · `settings` · `logout`
**Misc:** `clock` · `google` (logo a color, único multicolor)

### 10.2 Tamaños canónicos

| Tamaño      | Uso                                |
| ----------- | ---------------------------------- |
| 14 px       | Inline en chips muy pequeños       |
| 16 px       | Chips, inputs                      |
| 18 px       | Botones, icon-btn                  |
| **22 px** ★ | **Default mobile — tabs, app bar** |
| 28 px       | Empty states medianos              |
| 36 px       | Hero / empty state grande          |

★ Si no sabes qué tamaño usar, usa 22.

---

## 11. Layout móvil

**Diseñado a 402 × 874 px** (iPhone 15 Pro / 14 Pro / 13 Pro). Escala bien de 375 a 430.

### 11.1 Safe areas

```
┌─────────────────────────────┐ ← top
│ ░░░ SAFE TOP · 44 px ░░░    │   notch, status bar, dynamic island
├─────────────────────────────┤
│                             │
│  CONTENIDO                  │   padding lateral: 18 px
│  Vertical scroll            │   alto utilizable ≈ 696 px
│  Cards stack con gap 12     │
│                             │
├─────────────────────────────┤
│  [tabbar] 78 px             │   incluye 26 px safe inferior
├─────────────────────────────┤
│ ░░░ SAFE BOTTOM · 34 px ░░░ │   home indicator
└─────────────────────────────┘ ← bottom (874)
```

### 11.2 Specs de referencia

| Item                 | Valor        |
| -------------------- | ------------ |
| Canvas               | 402 × 874 px |
| iOS bezel radius     | 48 px        |
| Safe area top        | 44 px        |
| Safe area bottom     | 34 px        |
| Padding lateral      | **18 px**    |
| App bar compacta     | 56 px        |
| App bar grande       | 88 px        |
| Tab bar              | 78 px        |
| Hit target mínimo    | 44 × 44 px   |
| Gap entre cards      | 12 px        |
| Padding interno card | 14–18 px     |

### 11.3 Reglas

- **96 % vertical scroll, 4 % horizontal.** No usamos carousels horizontales en feed salvo en categorías de adopción y comunidad.
- **App bar y tab bar fuera del scroll.** El usuario siempre tiene contexto.
- **Sheets desde abajo, no modales centrados.** Radio 28 px arriba + grip 36 × 4 px gris.
- **Pantallas full-bleed** (login, onboarding): sin app bar; solo X de cerrar arriba a la izquierda + CTA inferior.

---

## 12. Voz y tono

### 12.1 Principios

| #   | Principio                    | En una frase                                                        |
| --- | ---------------------------- | ------------------------------------------------------------------- |
| 01  | **Como amigos, no como ONG** | Tuteo, frases cortas, sin "Estimado usuario".                       |
| 02  | **Verbos primero**           | Reportar · Ayudar · Adoptar · Aportar.                              |
| 03  | **Empatía sin drama**        | Hechos, no penas. La gente actúa, no llora.                         |
| 04  | **Lima sin caricatura**      | "A 3 cuadras", "Surquillo". Sin slang forzado.                      |
| 05  | **Datos en mono**            | IDs, coords, montos, horas → JetBrains Mono.                        |
| 06  | **Celebrar lo bueno**        | 🎉 solo en victorias, máximo 1 emoji por mensaje. Nunca en errores. |

### 12.2 Sí / No · ejemplos

| Contexto         | ✅ Sí                                                    | ❌ No                                         | Por qué                              |
| ---------------- | -------------------------------------------------------- | --------------------------------------------- | ------------------------------------ |
| Notif proximidad | "Hay un perro a 320 m. ¿Vas?"                            | "⚠️ ¡URGENTE! Un animalito necesita TU ayuda" | Distancia concreta, pregunta directa |
| CTA del caso     | "Yo puedo ayudar"                                        | "Aceptar caso"                                | Primera persona, compromiso          |
| Error de email   | "Necesitamos un email válido para contactarte"           | "Email inválido"                              | Explica el porqué                    |
| Éxito de reporte | "Reporte publicado. Te avisamos cuando alguien lo tome." | "✅ Reporte enviado exitosamente"             | Confirma + promete siguiente paso    |
| Sin resultados   | "Por aquí no hay casos. ¿Amplías el radio?"              | "No se encontraron resultados"                | Sugiere acción, no es callejón       |
| Pull-to-refresh  | "Buscando casos cerca…"                                  | "Cargando…"                                   | Dice qué pasa, no estado abstracto   |

### 12.3 Glosario · cómo nombramos las cosas

| Usamos                       | Evitamos           | Por qué                                                         |
| ---------------------------- | ------------------ | --------------------------------------------------------------- |
| **Caso**                     | Reporte, denuncia  | "Reporte" es la acción; "caso" es el sujeto que vive en el feed |
| **Rescatado / a**            | Mascota, animalito | Mascota implica dueño. "Animalito" infantiliza                  |
| **Voluntario / colaborador** | Usuario            | "Usuario" es de software. Aquí hay gente que ayuda              |
| **Albergue**                 | Refugio, centro    | "Albergue" es la palabra de la comunidad local                  |
| **Aportar**                  | Donar, contribuir  | "Aportar" suena a poner algo de ti, no a desprenderse           |
| **Tomar el caso**            | Asignar, aceptar   | Es lo que hace el voluntario: lo toma, va, se compromete        |
| **A 320 m**                  | Muy cerca, próximo | Números > adjetivos vagos                                       |
| **Hace 7 min**               | Recientemente      | Tiempo relativo, máx 2 unidades                                 |

### 12.4 Errores y vacíos

- **Errores con porqué.** "Necesitamos X porque Y." Nunca etiqueta seca.
- **Empty states con acción.** Siempre un CTA o sugerencia. Nunca un cul-de-sac.
- **Loading con verbo.** "Buscando casos cerca…" no "Cargando…".
- **Cero emojis en errores.** Reservados para victorias.

---

## 13. Animaciones y microinteracciones

**Lo justo. Siempre ease-in-out. Respetamos `prefers-reduced-motion`.**

### 13.1 Inventario

| Animación               | Duración | Curva       | Uso                                                      |
| ----------------------- | -------- | ----------- | -------------------------------------------------------- |
| **Press** (botones)     | 120 ms   | ease-in-out | scale 1 → 0.96 · opacity 1 → 0.85                        |
| **Focus ring** (inputs) | 100 ms   | ease-out    | box-shadow 0 → 3 px                                      |
| **Toggle** (switches)   | 180 ms   | ease        | background + transform                                   |
| **Tab change**          | 200 ms   | ease-out    | color, no movimiento                                     |
| **Card lift** (desktop) | 200 ms   | ease-out    | translateY −3 px + shadow-sm → lg                        |
| **Slide-in** (toast)    | 280 ms   | ease-out    | translateX 40 → 0 · opacity 0 → 1                        |
| **Slide-out** (toast)   | 180 ms   | ease-in     | inverso, más rápido                                      |
| **Sheet open**          | 280 ms   | ease-out    | translateY 100 % → 0                                     |
| **Fade-up** (listados)  | 220 ms   | ease-out    | translateY 8 → 0 + opacity · stagger 40 ms (máx 6 items) |
| **Screen push**         | 400 ms   | ease-out    | translateX 100 % → 0 (nuevas pantallas)                  |
| **Pulse** (urgencia)    | 1600 ms  | linear      | box-shadow expandiéndose · `--urgency-high`              |
| **Shimmer** (skeleton)  | 1400 ms  | linear      | gradient background-position −100 % → 100 %              |

### 13.2 Curvas

| Easing             | cubic-bezier                        | Cuándo                           |
| ------------------ | ----------------------------------- | -------------------------------- |
| ease-out (default) | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Entradas, hover, focus           |
| ease-in            | `cubic-bezier(0.42, 0, 1, 1)`       | Salidas, dismiss                 |
| ease-in-out        | `cubic-bezier(0.42, 0, 0.58, 1)`    | Bidireccionales (toggle)         |
| linear             | `linear`                            | Loops infinitos (pulse, shimmer) |

### 13.3 Skeletons vs loaders

| Duración esperada | Mostrar                                  |
| ----------------- | ---------------------------------------- |
| < 300 ms          | Mantener contenido anterior, sin loader  |
| 300 ms – 2 s      | Skeleton con shimmer                     |
| 2 s – 5 s         | Skeleton + texto "Buscando casos cerca…" |
| > 5 s             | Spinner + opción "Reintentar"            |

### 13.4 Accesibilidad

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Excepción:** el `pulse` de urgencia se mantiene porque es **información**, no decoración. Pero se reduce a opacity 0.6 estática (sin loop).

### 13.5 Reglas finales

- Si todo pulsa, nada pulsa. Solo lo urgente anima.
- Si un movimiento no comunica algo, no va.
- Las animaciones decorativas nunca duran más de 500 ms.
- Stagger en listados solo hasta 6 items; el resto entra sin retraso.

---

## 14. Reference · todos los tokens

### 14.1 Custom properties (CSS variables)

```css
:root {
  /* Type */
  --font-ui: 'Manrope', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* ─── Institutional palette (4 oficiales) ─── */
  --inst-ink: #16151b; /* 01 · más principal */
  --inst-primary: #f4ad40; /* 02 · acento marca */
  --inst-secondary: #52b5a7; /* 03 · acento apoyo */
  --inst-bg: #f1f8f8; /* 04 · canvas */

  /* Surfaces */
  --bg: var(--inst-bg);
  --surface: #ffffff;
  --surface-2: oklch(0.96 0.008 200);
  --surface-3: oklch(0.93 0.012 195);
  --border: oklch(0.91 0.014 195);
  --border-strong: oklch(0.85 0.018 195);

  /* Text */
  --text: var(--inst-ink);
  --text-2: oklch(0.42 0.018 285);
  --text-3: oklch(0.58 0.014 285);
  --text-inv: var(--inst-bg);

  /* Brand · primary (amber) */
  --primary: var(--inst-primary);
  --primary-hover: oklch(0.74 0.16 62);
  --primary-soft: oklch(0.96 0.05 78);
  --primary-ink: oklch(0.32 0.1 60);

  /* Brand · secondary (teal) */
  --secondary: var(--inst-secondary);
  --secondary-hover: oklch(0.65 0.09 185);
  --secondary-soft: oklch(0.95 0.03 185);
  --secondary-ink: oklch(0.32 0.06 190);

  /* States */
  --state-reported: oklch(0.74 0.14 75);
  --state-reported-soft: oklch(0.96 0.045 78);
  --state-review: oklch(0.62 0.13 250);
  --state-review-soft: oklch(0.96 0.035 250);
  --state-taken: oklch(0.58 0.16 305);
  --state-taken-soft: oklch(0.96 0.04 305);
  --state-progress: var(--inst-secondary);
  --state-progress-soft: oklch(0.95 0.03 185);
  --state-resolved: oklch(0.62 0.13 155);
  --state-resolved-soft: oklch(0.95 0.04 155);

  /* Urgency */
  --urgency-high: oklch(0.58 0.21 28);
  --urgency-mid: oklch(0.78 0.15 65); /* ≈ primary */
  --urgency-low: oklch(0.69 0.08 185); /* ≈ secondary */

  /* Radii */
  --r-sm: 10px;
  --r-md: 14px;
  --r-lg: 20px;
  --r-xl: 28px;

  /* Shadows (tintadas con el ink institucional) */
  --shadow-sm: 0 1px 2px rgba(22, 21, 27, 0.05), 0 1px 1px rgba(22, 21, 27, 0.03);
  --shadow-md: 0 4px 10px rgba(22, 21, 27, 0.07), 0 1px 3px rgba(22, 21, 27, 0.04);
  --shadow-lg: 0 18px 40px -10px rgba(22, 21, 27, 0.22), 0 4px 12px rgba(22, 21, 27, 0.08);
}
```

### 14.2 Cheat sheet — alturas y radios

| Item                          | Height                 | Radio |
| ----------------------------- | ---------------------- | ----- |
| Button SM                     | 34                     | 10    |
| Button MD                     | **44**                 | 12    |
| Button LG                     | 52                     | 14    |
| Input SM                      | 34                     | 10    |
| Input MD                      | **44**                 | 12    |
| Input LG                      | 52                     | 14    |
| Icon button                   | 36                     | 12    |
| Avatar XS / SM / MD / LG / XL | 28 / 36 / 44 / 52 / 64 | 50 %  |
| Tab item                      | —                      | —     |
| Tab FAB                       | 52                     | 18    |
| Card pequeña                  | —                      | 18    |
| Case card                     | —                      | 20    |
| Sheet / modal                 | —                      | 28    |
| iPhone bezel                  | —                      | 48    |

---

## 15. Cómo usar este sistema

### 15.1 Archivos

```
/
├── README.md               ← este archivo
├── tokens.css              ← variables CSS · única fuente de verdad
├── design-system.html      ← versión visual e interactiva
├── index.html              ← canvas con todas las pantallas
├── index-print.html        ← versión imprimible
└── screens/
    ├── shared.jsx          ← SvIcons, Button, StatusChip, Photo, Avatar, TabBar, AppBar, Card…
    ├── onboarding.jsx      ← Welcome, Report, Help, Adopt, Donate, Login
    ├── feed.jsx            ← HomeFeed, MapScreen, FiltersScreen
    ├── report.jsx          ← Wizard 1/2/3, CaseDetail, HelpActionSheet
    ├── adopt-donate.jsx    ← Catálogo, PetDetail, Donate, YapeQR, Notifs, Profile
    └── admin.jsx           ← Dashboard del albergue
```

### 15.2 Reglas para sumar pantallas o componentes

1. **Nunca inventes color o tamaño.** Si el token no existe, agrégalo a `tokens.css` y a este README primero.
2. **Reutiliza componentes** de `screens/shared.jsx` antes de hacer uno nuevo.
3. **Cada componente nuevo en su archivo correspondiente.** Si es transversal, va a `shared.jsx` y se expone en el `Object.assign(window, …)` del final.
4. **Mobile-first.** Diseñá primero a 402 × 874. Desktop solo para admin.
5. **Sin modo oscuro.** Decisión explícita del MVP. No agreguen `--*-dark` ni clases `.sv-dark` nuevas. (Las que existen en `tokens.css` son legacy y se removerán post-MVP.)
6. **Copy según sección 12.** Si una pantalla "suena rara", probablemente está rompiendo voz y tono.

### 15.3 Para devs (handoff)

- **OKLCH es la notación del diseño** — los valores de este doc son la fuente de verdad visual. Sin embargo, **React Native no soporta OKLCH**: el motor de colores de RN solo entiende HEX, RGB, HSL y named colors. La implementación en código usa HEX; los valores OKLCH se mantienen como comentario de referencia en `constants/theme.ts`.
- `currentColor` en SVG: los íconos heredan el color del texto. No pongan `fill` ni `stroke` con hex hardcodeado.
- Fuentes cargadas via plugin `expo-font` en `app.json` (archivos TTF desde `@expo-google-fonts`). Sin `useFonts`, sin loading state. **Requiere development build** — Expo Go usa un binario pre-compilado que no incluye las fuentes del plugin.

### 15.4 Implementación en código (React Native + NativeWind)

> Esta sección describe cómo los tokens del design system se implementan en el proyecto.

**Archivo único de tokens:** `constants/theme.ts`

```
constants/theme.ts
      │
      ├── export const colors / fontFamily / fontSize / borderRadius / boxShadow
      │         └── tailwind.config.js los consume via require('./constants/theme.ts')
      │                   └── NativeWind los convierte a StyleSheet nativo
      │                             └── Clases: bg-primary · text-h1 · font-manrope-bd · rounded-lg
      │
      └── export const Colors / Shadow / Layout / Duration
                └── Código TypeScript los importa directamente
                          └── Props nativas: tabBarActiveTintColor, color={}, Reanimated, etc.
```

**Regla de uso:**

| Caso                                   | Herramienta            | Ejemplo                                       |
| -------------------------------------- | ---------------------- | --------------------------------------------- |
| Estilos en JSX                         | `className` (Tailwind) | `className="bg-primary rounded-lg p-4"`       |
| Props nativas que no aceptan className | `Colors` de theme.ts   | `tabBarActiveTintColor={Colors.primary}`      |
| Sombras en nativo                      | `Shadow` de theme.ts   | `style={Shadow.md}`                           |
| Dimensiones de layout                  | `Layout` de theme.ts   | `height={Layout.tabBar}`                      |
| Animaciones (Reanimated)               | `Duration` de theme.ts | `withTiming(1, { duration: Duration.press })` |

**Escala tipográfica — clases disponibles:**

```tsx
<Text className="font-manrope-xb text-display">Display 44px</Text>
<Text className="font-manrope-xb text-h1">H1 · Large Title 26px</Text>
<Text className="font-manrope-xb text-h2">H2 · Section 22px</Text>
<Text className="font-manrope-bd text-h3">H3 · Subtítulo 17px</Text>
<Text className="font-manrope text-body">Body 15px</Text>
<Text className="font-manrope-sb text-body-bold">Body Bold 14px</Text>
<Text className="font-manrope-md text-caption">Caption 12px</Text>
<Text className="font-manrope-sb text-micro">Micro 11px</Text>
<Text className="font-mono text-data">ID-4521 · datos 12px</Text>

{/* Exclusivos del componente Button — no usar en texto libre */}
<Text className="font-manrope-sb text-btn-sm">Button SM 13px</Text>
<Text className="font-manrope-sb text-btn-md">Button MD 14.5px</Text>
<Text className="font-manrope-sb text-btn-lg">Button LG 15.5px</Text>
```

> El peso tipográfico va en `font-manrope-bd`, NO en `font-weight`. React Native no tiene síntesis de peso — cada peso es un archivo de fuente separado.

**Sin `:root`, sin CSS variables en nativo.** React Native no tiene DOM ni cascada CSS.
Los tokens viajan: `theme.ts` → `tailwind.config.js` → NativeWind → StyleSheet.
Para animaciones usar Reanimated. Para reducción de movimiento usar `AccessibilityInfo.isReduceMotionEnabled()`.

### 15.5 Gotchas NativeWind (lecciones aprendidas)

Problemas confirmados en este proyecto y sus soluciones:

| Problema                                     | Síntoma                                                  | Causa                                                    | Solución                                                        |
| -------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------- |
| OKLCH en colores                             | Funciona en web, sin color en Android/iOS                | RN no parsea OKLCH                                       | Usar HEX en `colors` de `theme.ts`                              |
| Token `fontSize` sin registrar               | Todos los textos al mismo tamaño                         | `fontSize` no estaba en `tailwind.config.js`             | Exportar `fontSize` de `theme.ts` e incluirlo en el config      |
| `contentContainerClassName` en ScrollView    | Estilos del contenedor no aplican en nativo              | Soporte limitado en NativeWind native                    | Usar `<View className="...">` wrapper dentro del `<ScrollView>` |
| Fuentes no cargan en Expo Go                 | Font family cae a system font                            | El plugin `expo-font` de `app.json` no aplica en Expo Go | Usar `npx expo run:android` (development build)                 |
| Estilos no se actualizan tras cambiar config | Styles viejos en nativo tras editar `tailwind.config.js` | Metro/NativeWind cache desactualizado                    | `npx expo start --clear` obligatorio al cambiar el config       |

### 15.6 Versionado

| Versión  | Fecha         | Cambios                                                                                                                                                                                                            |
| -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| v0.1     | mayo 2026     | MVP — paleta inicial cálida, tipografía, estados, 6 secciones de pantallas                                                                                                                                         |
| v0.2     | mayo 2026     | Componentes adicionales, iconografía, layout, voz y tono, animaciones                                                                                                                                              |
| **v0.3** | **mayo 2026** | **Paleta institucional aplicada (`#16151b` · `#f4ad40` · `#52b5a7` · `#f1f8f8`). State-progress migra a teal. Modo oscuro retirado. Urgency mid/low alineadas a primary/secondary. Shadow tint migra a inst-ink.** |

---

**Mantenido por:** equipo Segunda Vida · Lima
**Última actualización:** mayo 2026
