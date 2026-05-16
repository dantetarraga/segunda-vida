# Segunda Vida

Red de rescate animal que conecta personas para reportar, atender y transformar la vida de animales en situación de calle.

## Stack tecnológico

| Capa                  | Tecnología                       |
| --------------------- | -------------------------------- |
| Framework             | Expo 54 + React Native 0.81      |
| Routing               | Expo Router (file-based)         |
| Estilos               | NativeWind (Tailwind CSS)        |
| Estado global         | Zustand                          |
| Estado servidor       | TanStack Query (React Query)     |
| Formularios           | React Hook Form + Zod            |
| Autenticación         | expo-auth-session (Google OAuth) |
| Almacenamiento seguro | expo-secure-store                |
| GPS                   | expo-location                    |
| Fotos                 | expo-image-picker                |
| Push notifications    | expo-notifications               |
| Mapas                 | react-native-maps                |
| Sheets                | @gorhom/bottom-sheet             |
| Animaciones           | react-native-reanimated          |
| Lenguaje              | TypeScript estricto              |

## Arquitectura de carpetas

La app sigue una arquitectura **module-first sobre Expo Router**: lo que se comparte vive en la raíz, lo que es exclusivo de un módulo vive dentro de ese módulo con prefijo `_` (Expo Router ignora carpetas/archivos que empiezan con `_` al construir las rutas).

```
segunda-vida/
├── app/                              # Pantallas (Expo Router · file-based routing)
│   ├── _layout.tsx                   # Root layout (providers globales)
│   ├── global.css                    # Tailwind base
│   │
│   ├── (auth)/                       # Módulo: autenticación
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   ├── _components/              # Componentes SOLO de este módulo
│   │   ├── _hooks/                   # Hooks SOLO de este módulo
│   │   ├── _schemas/                 # Schemas Zod del módulo
│   │   └── _services/                # Llamadas API del módulo
│   │
│   ├── (onboarding)/                 # Módulo: onboarding
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── features.tsx
│   │   ├── _components/
│   │   └── _hooks/
│   │
│   └── (tabs)/                       # Módulo: navegación principal
│       ├── _layout.tsx
│       └── index.tsx
│
├── components/                       # UI y componentes COMPARTIDOS entre módulos
│   └── ui/                           # Primitivos (button, photo-card, floating-tag…)
│
├── constants/
│   └── theme.ts                      # Tokens del design system (colors, fonts, radii…)
│
├── lib/                              # Utilidades COMPARTIDAS
│   ├── cn.ts                         # Helper para combinar clases Tailwind
│   └── storage.ts                    # Wrapper de expo-secure-store
│
├── assets/
│   └── images/
│
├── docs/                             # README + Design System
└── scripts/
```

### Regla de oro: dónde poner cada cosa

| ¿Se usa en…?                       | Ubicación                                                                |
| ---------------------------------- | ------------------------------------------------------------------------ |
| 2+ módulos (o toda la app)         | Raíz → `components/`, `lib/`, `constants/`                               |
| Un solo módulo (auth, onboarding…) | Dentro del módulo → `_components/`, `_hooks/`, `_schemas/`, `_services/` |

**Por qué el prefijo `_`**: Expo Router excluye automáticamente de las rutas cualquier archivo o carpeta que comience con `_`. Así se mantienen los assets internos del módulo junto al código que los usa sin contaminar la navegación.

### Cuándo "promover" algo a la raíz

Mover un componente/hook desde `app/(modulo)/_components/` a `components/` cuando:

- Lo necesita un segundo módulo.
- Es un primitivo de UI (button, input, card…) sin lógica de negocio.
- Es una utilidad transversal (formatters, validators genéricos).

## Flujo de navegación

```
Root Layout (_layout.tsx)
│
├── No autenticado → (auth)/login
│
└── Autenticado
    ├── (tabs)                         ← navegación principal
    │   ├── index (Feed)
    │   ├── rescues (Lista de casos)
    │   ├── adopt (Galería)
    │   └── profile (Perfil)
    │
    ├── rescue/new                     ← FAB desde rescues tab
    ├── rescue/[id]                    ← desde cualquier tarjeta de caso
    ├── adopt/[id]                     ← desde tarjeta de perro
    ├── donations/                     ← desde profile
    ├── projects/                      ← desde feed
    ├── notifications                  ← desde ícono de campana en header
    │
    └── (admin)/                       ← desde profile, solo si rol = admin
        ├── index (Dashboard)
        ├── cases
        ├── dogs
        └── users
```

## Gestión de estado

| Tipo de estado          | Herramienta           | Ejemplos                     |
| ----------------------- | --------------------- | ---------------------------- |
| Sesión del usuario      | Zustand + SecureStore | token, rol, datos del perfil |
| Datos del servidor      | TanStack Query        | lista de casos, perros, feed |
| Formularios             | React Hook Form + Zod | crear reporte, editar perfil |
| UI local                | useState / useReducer | modales, loadings, steps     |
| Contador notificaciones | Zustand               | badge en tab bar             |

### Regla de decisión

- ¿Es data que viene de la API? → **TanStack Query** (gestiona caché, refetch, loading, error automáticamente)
- ¿Es estado de sesión que persiste entre reinicios? → **Zustand + SecureStore**
- ¿Es un formulario? → **React Hook Form**
- ¿Es estado local de un componente? → **useState**

## Tipos principales

```typescript
// rescue.types.ts
type CaseType = 'herido' | 'abandonado' | 'perdido' | 'maltrato' | 'cachorro' | 'urgente'
type CaseStatus = 'reportado' | 'en_revision' | 'tomado' | 'en_proceso' | 'resuelto'

interface RescueCase {
  id: string
  type: CaseType
  status: CaseStatus
  photos: string[]
  videoUrl?: string
  location: { lat: number; lng: number }
  reference: string
  reportedBy: string
  takenBy?: string
  createdAt: string
  updatedAt: string
}

// user.types.ts
type UserRole = 'colaborador' | 'rescatista' | 'admin'

interface UserProfile {
  id: string
  name: string
  photo?: string
  phone: string
  sede: string
  area: string
  city: string
  bio: string
  hasPets: boolean
  petPhotos: string[]
  role: UserRole
  donorBadge?: { months: number; since: string }
}
```

## Convenciones de código

- **Archivos**: `kebab-case` → `rescue-card.tsx`, `use-auth.ts`
- **Componentes**: `PascalCase` → `RescueCard`, `TakeCaseButton`
- **Hooks**: prefijo `use` → `useAuth`, `useLocation`
- **Stores**: sufijo `.store.ts` → `auth.store.ts`
- **Servicios**: sufijo `.service.ts` → `rescue.service.ts`
- **Tipos**: sufijo `.types.ts`, nombres en `PascalCase`
- **Clases Tailwind**: ordenadas con prettier-plugin-tailwindcss (automático)
- **Sin comentarios** salvo que el "por qué" no sea obvio por el código

## Prioridades del MVP

### Prioridad 1 — Validar el core

- Login con Google
- Crear y ver reportes de rescate
- Notificaciones por cercanía
- "Tomar caso" (Yo puedo ayudar)

### Prioridad 2 — Activar comunidad

- Galería de adopciones
- Donaciones (QR Yape + historial)
- Feed de noticias

### Prioridad 3 — Engagement y métricas

- Dashboard admin
- Badges de donador recurrente
- Proyectos del albergue

## Dependencias a instalar

```bash
npx expo install zustand @tanstack/react-query expo-secure-store \
  expo-location expo-image-picker expo-notifications \
  expo-auth-session expo-crypto react-native-maps \
  @gorhom/bottom-sheet react-hook-form zod
```

## Desarrollo local

```bash
npm install
npx expo start --clear   # --clear es obligatorio tras cambiar tailwind.config.js o theme.ts
```

Para ver las **fuentes custom** (Manrope / JetBrains Mono) se necesita un development build. El plugin `expo-font` no aplica en Expo Go:

```bash
npx expo run:android
npx expo run:ios
```

## Design System en código

Los tokens del design system viven en un único archivo: `constants/theme.ts`.

### Flujo de tokens

```
constants/theme.ts
  ├── colors / fontFamily / fontSize / borderRadius / boxShadow
  │       └── tailwind.config.js  (require('./constants/theme.ts'))
  │               └── NativeWind  →  StyleSheet nativo
  │                       └── className="bg-primary text-h1 font-manrope-bd rounded-lg"
  │
  └── Colors / Shadow / Layout / Duration
          └── import directo en TypeScript
                  └── tabBarActiveTintColor={Colors.primary} · style={Shadow.md}
```

### Clases Tailwind disponibles

| Categoría   | Clases                                                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------------------------- |
| Fondos      | `bg-bg` `bg-surface` `bg-surface-2` `bg-surface-3`                                                                |
| Texto       | `text-text` `text-text-2` `text-text-3` `text-text-inv`                                                           |
| Marca       | `bg-primary` `bg-primary-soft` `text-primary-ink` `bg-primary-hover`                                              |
| Bordes      | `border-border` `border-border-strong`                                                                            |
| Estados     | `bg-state-reported` `bg-state-review` `bg-state-taken` `bg-state-progress` `bg-state-resolved` + `-soft`          |
| Urgencia    | `bg-urgency-high` `bg-urgency-mid` `bg-urgency-low`                                                               |
| Tipografía  | `text-display` `text-h1` `text-h2` `text-h3` `text-body` `text-body-bold` `text-caption` `text-micro` `text-data` |
| Fuentes     | `font-manrope` `font-manrope-md` `font-manrope-sb` `font-manrope-bd` `font-manrope-xb` `font-mono` `font-mono-md` |
| Radios      | `rounded-sm` (10) `rounded-md` (14) `rounded-lg` (20) `rounded-xl` (28) `rounded-pill` (999) `rounded-fab` (18)   |
| Sombras web | `shadow-sm` `shadow-md` `shadow-lg`                                                                               |

### Regla de uso

```tsx
// ✅ Estilos en JSX → siempre className
<View className="bg-primary rounded-lg p-4 gap-3" />
<Text className="font-manrope-bd text-h1 text-text" />

// ✅ Props nativas que no aceptan className → Colors de theme.ts
<Tab tabBarActiveTintColor={Colors.primary} />
<Icon color={Colors.text3} />

// ✅ Sombras en nativo → Shadow de theme.ts
<View style={Shadow.md} />
```

### Gotchas NativeWind confirmados

| Problema                                        | Solución                                                                             |
| ----------------------------------------------- | ------------------------------------------------------------------------------------ |
| OKLCH no funciona en Android/iOS                | Usar HEX en `colors` de `theme.ts` — RN no parsea OKLCH                              |
| Texto todo del mismo tamaño                     | `fontSize` debe estar en `tailwind.config.js` — no basta con definirlo en `theme.ts` |
| `contentContainerClassName` no aplica en nativo | Usar `<View className="...">` wrapper dentro del `<ScrollView>`                      |
| Fuentes no cargan en Expo Go                    | `expo-font` plugin requiere development build (`expo run:android`)                   |
| Estilos no se actualizan tras editar config     | `npx expo start --clear` — el cache de NativeWind queda desactualizado               |

## Escalabilidad de la arquitectura

La arquitectura actual es **feature-based plana**: los dominios están separados por carpeta dentro de `components/`, `hooks/`, `services/` y `types/`.

### Cuándo migrar

Migrar a **feature-based agrupada** cuando se cumpla alguna de estas condiciones:

- Un dominio tiene más de 5 archivos distribuidos entre carpetas
- El equipo crece y cada persona trabaja en un dominio distinto
- Se necesita lazy loading por dominio

### Cómo migrar (sin romper nada)

Migrar dominio por dominio. Ejemplo con `rescue`:

**Antes (estructura actual):**

```
components/rescue/rescue-card.tsx
components/rescue/case-status-badge.tsx
hooks/use-rescue-cases.ts
services/rescue.service.ts
types/rescue.types.ts
```

**Después (feature agrupada):**

```
features/
└── rescue/
    ├── components/
    │   ├── rescue-card.tsx
    │   └── case-status-badge.tsx
    ├── hooks/
    │   └── use-rescue-cases.ts
    ├── services/
    │   └── rescue.service.ts
    ├── types.ts
    └── index.ts              ← exporta solo lo público del feature
```

El archivo `index.ts` actúa como barrera: solo se exporta lo que otros features necesitan consumir. Nada de imports directos a archivos internos del feature.

### Regla de dependencias entre features

```
app/          → puede importar de cualquier feature
features/X    → puede importar de components/ui, lib, hooks globales, store
features/X    → NO puede importar de features/Y directamente
              → si necesita algo de Y, ese algo debe estar en components/ o lib/
```

### Señales de que un feature está listo para extraerse

- [ ] Tiene más de 3 componentes propios
- [ ] Tiene su propio hook de datos (`use-rescue-cases.ts`)
- [ ] Tiene su propio servicio (`rescue.service.ts`)
- [ ] Sus tipos no son compartidos con otros dominios
