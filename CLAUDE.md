# CLAUDE.md

Guía de contexto para agentes de IA trabajando en este repo. Léelo antes de cualquier cambio estructural.

## Qué es esto

**Segunda Vida** — App móvil (Expo 54 + React Native 0.81) de rescate animal. Stack: Expo Router, NativeWind (Tailwind), Zustand, TanStack Query, React Hook Form + Zod, TypeScript estricto.

Documentación detallada: [docs/README.md](docs/README.md) y [docs/DESING-SYSTEM.md](docs/DESING-SYSTEM.md).

## Arquitectura: module-first sobre Expo Router

```
app/
  (auth)/        ← módulo
    _components/  _hooks/  _schemas/  _services/
  (onboarding)/
    _components/  _hooks/
  (tabs)/
components/      ← UI compartida (raíz)
  ui/
constants/       ← theme.ts (tokens) — fuente única
lib/             ← utilidades compartidas (cn, storage)
```

### Regla de oro

| Alcance del uso     | Ubicación                                                                 |
| ------------------- | ------------------------------------------------------------------------- |
| 2+ módulos / global | Raíz: `components/`, `lib/`, `constants/`                                 |
| Un solo módulo      | Dentro: `app/(modulo)/_components/`, `_hooks/`, `_schemas/`, `_services/` |

**El prefijo `_` no es decorativo**: Expo Router excluye carpetas/archivos `_*` de las rutas. Es el patrón idiomático para co-ubicar código privado del módulo.

### Cuándo promover algo a la raíz

- Lo usa un segundo módulo.
- Es un primitivo de UI sin lógica de negocio.
- Es una utilidad transversal (formatters, helpers genéricos).

## Convenciones

- **Archivos**: `kebab-case` → `photo-card.tsx`, `use-auth.ts`
- **Componentes**: `PascalCase`
- **Hooks**: prefijo `use`
- **Stores Zustand**: sufijo `.store.ts`
- **Servicios**: sufijo `.service.ts`
- **Tipos**: sufijo `.types.ts`
- **Sin comentarios** salvo que el "por qué" no sea evidente.

## Estilos: NativeWind + tokens

- Toda clase Tailwind se aplica vía `className`.
- Tokens viven en [constants/theme.ts](constants/theme.ts) y [tailwind.config.js](tailwind.config.js) los importa con `jiti`.
- Para props nativas que no aceptan `className` (`tabBarActiveTintColor`, sombras nativas) → importar `Colors` / `Shadow` desde `theme.ts`.
- Después de tocar `theme.ts` o `tailwind.config.js`: `npx expo start --clear`.

### Gotchas confirmados

- **No usar OKLCH** en colors → RN no lo parsea. Usar HEX.
- `fontSize` debe estar en `tailwind.config.js` (no basta con `theme.ts`).
- `contentContainerClassName` no aplica en nativo → usar `<View className="…">` wrapper.
- Fuentes custom (Manrope / JetBrains Mono) requieren **development build** (no Expo Go).

## Comandos

```bash
npm install
npx expo start --clear        # obligatorio tras cambios en theme/tailwind
npx expo run:android          # dev build (necesario para fuentes)
npx expo run:ios
```

## Reglas para el agente

1. **No crear `shared/`, `features/`, `store/`, `services/`, `hooks/`, `types/` en la raíz** sin pedirlo. Si algo no encaja en `components/` / `lib/` / `constants/`, pregunta antes.
2. **No mezclar convenciones**: dentro de `app/(modulo)/` siempre con prefijo `_`.
3. **No mover** archivos a la raíz hasta que sean usados por 2+ módulos.
4. **No añadir comentarios JSDoc** ni docstrings a código no modificado.
5. Antes de cambios estructurales grandes, releer este archivo y [docs/README.md](docs/README.md).
