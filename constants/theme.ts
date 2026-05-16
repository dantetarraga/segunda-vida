// Segunda Vida · Design System tokens v0.3
// Archivo único — fuente de verdad para Tailwind y para el código nativo.
//
// Convención de nombres:
//   minúsculas  → tokens para tailwind.config.js (HEX — RN no soporta OKLCH)
//   PascalCase  → constantes nativas (HEX para props RN, objetos tipados)
//
// Ref: docs/DESING-SYSTEM.md
//
// v0.3: Paleta institucional aplicada (#16151b · #f4ad40 · #52b5a7 · #f1f8f8).
//       State-progress migra a teal. Urgency-mid/low alineadas a primary/secondary.

// ─── TAILWIND TOKENS ─────────────────────────────────────────────────────────
// Importados por tailwind.config.js con require('./constants/theme.ts')
// HEX — React Native no soporta OKLCH. En web el navegador lo resuelve,
// pero en Android/iOS NativeWind pasa el string directo al motor de RN que falla.
// Los valores OKLCH están documentados en docs/DESING-SYSTEM.md como referencia.

export const colors = {
  // Superficies (derivadas de inst-bg #F1F8F8)
  canvas: '#F1F8F8', // inst-bg — clase Tailwind: bg-canvas
  surface: '#FFFFFF',
  'surface-2': '#EBF2F2', // oklch(0.96 0.008 200)
  'surface-3': '#DCE5E5', // oklch(0.93 0.012 195)

  // Tipografía (derivadas de inst-ink #16151B) — clase: text-ink / text-ink-2 / text-ink-3
  ink: '#16151B', // inst-ink
  'ink-2': '#5E5C70', // oklch(0.42 0.018 285)
  'ink-3': '#86859A', // oklch(0.58 0.014 285)
  'ink-inv': '#F1F8F8', // inst-bg

  // Bordes (derivados de inst-ink)
  border: '#D3DCDC', // oklch(0.91 0.014 195)
  'border-strong': '#BDC9C9', // oklch(0.85 0.018 195)

  // Marca · primary (amber) — inst-primary #F4AD40
  primary: '#F4AD40', // inst-primary
  'primary-hover': '#E59E2C', // oklch(0.74 0.16 62)
  'primary-soft': '#FBE9C5', // oklch(0.96 0.05 78)
  'primary-ink': '#5A3A0F', // oklch(0.32 0.10 60)

  // Marca · secondary (teal) — inst-secondary #52B5A7
  secondary: '#52B5A7', // inst-secondary
  'secondary-hover': '#3E9B8D', // oklch(0.65 0.09 185)
  'secondary-soft': '#E2F1EE', // oklch(0.95 0.03 185)
  'secondary-ink': '#1F4945', // oklch(0.32 0.06 190)

  // Estados de caso
  'state-reported': '#D9A338', // oklch(0.74 0.14 75)
  'state-reported-soft': '#FAF0D9', // oklch(0.96 0.045 78)
  'state-review': '#5876CB', // oklch(0.62 0.13 250)
  'state-review-soft': '#E0E6F8', // oklch(0.96 0.035 250)
  'state-taken': '#8C4FB8', // oklch(0.58 0.16 305)
  'state-taken-soft': '#EFE0F8', // oklch(0.96 0.04 305)
  'state-progress': '#52B5A7', // inst-secondary — caso siendo cuidado → teal
  'state-progress-soft': '#E2F1EE', // oklch(0.95 0.03 185)
  'state-resolved': '#449878', // oklch(0.62 0.13 155)
  'state-resolved-soft': '#DDF3E8', // oklch(0.95 0.04 155)

  // Urgencia (mid/low alineadas a los institucionales)
  'urgency-high': '#C24A2E', // oklch(0.58 0.21 28)
  'urgency-mid': '#F4AD40', // ≈ primary (inst-primary)
  'urgency-low': '#52B5A7', // ≈ secondary (inst-secondary)
}

// Un entry por peso — RN no soporta font-weight sintético ni arrays de fallback
export const fontFamily = {
  manrope: ['Manrope_400Regular'],
  'manrope-md': ['Manrope_500Medium'],
  'manrope-sb': ['Manrope_600SemiBold'],
  'manrope-bd': ['Manrope_700Bold'],
  'manrope-xb': ['Manrope_800ExtraBold'],
  mono: ['JetBrainsMono_400Regular'],
  'mono-md': ['JetBrainsMono_500Medium'],
}

export const borderRadius = {
  sm: '10px',
  md: '14px',
  lg: '20px',
  xl: '28px',
  pill: '999px',
  fab: '18px',
  'icon-btn': '12px',
}

// Radios como números para StyleSheet.create y props numéricas en RN.
// Mismos valores que borderRadius — úsalos cuando className no alcanza.
export const Radius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
  fab: 18,
  iconBtn: 12,
} as const

// En RN el peso va en fontFamily (font-manrope-bd), NO en fontWeight.
// El letterSpacing se aplica con tracking-[...] en el componente.
// lineHeight en px absoluto — NativeWind lo convierte a número para RN.
export const fontSize = {
  display:     ['44px', { lineHeight: '42px' }],
  h1:          ['26px', { lineHeight: '27px' }],
  h2:          ['22px', { lineHeight: '24px' }],
  h3:          ['17px', { lineHeight: '20px' }],
  body:        ['15px', { lineHeight: '22px' }],
  'body-bold': ['14px', { lineHeight: '20px' }],
  caption:     ['12px', { lineHeight: '18px' }],
  micro:       ['11px', { lineHeight: '14px' }],
  kicker:      ['11px', { lineHeight: '11px' }],
  data:        ['12px', { lineHeight: '16px' }],
}

// box-shadow es web-only; en nativo usar Shadow de abajo
export const boxShadow = {
  sm: '0 1px 2px rgba(22,21,27,0.05), 0 1px 1px rgba(22,21,27,0.03)',
  md: '0 4px 10px rgba(22,21,27,0.07), 0 1px 3px rgba(22,21,27,0.04)',
  lg: '0 18px 40px -10px rgba(22,21,27,0.22), 0 4px 12px rgba(22,21,27,0.08)',
}

// ─── CONSTANTES NATIVAS ───────────────────────────────────────────────────────
// Usar en props que no aceptan className ni OKLCH:
// tabBarActiveTintColor, color={} en iconos, StyleSheet.create, Reanimated, etc.

// HEX — aproximaciones correctas de los valores OKLCH de arriba
export const Colors = {
  canvas: '#F1F8F8',
  surface: '#FFFFFF',
  surface2: '#EBF2F2',
  surface3: '#DCE5E5',

  ink: '#16151B',
  ink2: '#5E5C70',
  ink3: '#86859A',
  inkInv: '#F1F8F8',

  border: '#D3DCDC',
  borderStrong: '#BDC9C9',

  primary: '#F4AD40',
  primaryHover: '#E59E2C',
  primarySoft: '#FBE9C5',
  primaryInk: '#5A3A0F',

  secondary: '#52B5A7',
  secondaryHover: '#3E9B8D',
  secondarySoft: '#E2F1EE',
  secondaryInk: '#1F4945',

  stateReported: '#D9A338',
  stateReportedSoft: '#FAF0D9',
  stateReview: '#5876CB',
  stateReviewSoft: '#E0E6F8',
  stateTaken: '#8C4FB8',
  stateTakenSoft: '#EFE0F8',
  stateProgress: '#52B5A7',
  stateProgressSoft: '#E2F1EE',
  stateResolved: '#449878',
  stateResolvedSoft: '#DDF3E8',

  urgencyHigh: '#C24A2E',
  urgencyMid: '#F4AD40',
  urgencyLow: '#52B5A7',

  shadowTint: '#16151B',
} as const

// Sombras React Native — usar con style={Shadow.sm} o spread en StyleSheet
export const Shadow = {
  sm: {
    shadowColor: '#16151B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#16151B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  lg: {
    shadowColor: '#16151B',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.22,
    shadowRadius: 40,
    elevation: 10,
  },
} as const

// Dimensiones para props numéricas, StyleSheet y cálculos de posición
export const Layout = {
  screenPaddingH: 18,
  gapCard: 12,
  paddingCard: 16,
  appBarCompact: 56,
  appBarLarge: 88,
  tabBar: 78,
  tabBarFab: 52,
  safeAreaTop: 44,
  safeAreaBottom: 34,
  hitTarget: 44,
  iconSize: 22,
} as const

// Duraciones en ms — usar en Reanimated withTiming() / withRepeat()
export const Duration = {
  press: 120,
  focusRing: 100,
  toggle: 180,
  tabChange: 200,
  cardLift: 200,
  slideIn: 280,
  slideOut: 180,
  sheetOpen: 280,
  fadeUp: 220,
  screenPush: 400,
  pulse: 1600,
  shimmer: 1400,
} as const
