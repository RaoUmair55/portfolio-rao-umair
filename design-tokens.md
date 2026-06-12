# Warm Agency Design System — Quick Reference

## Fonts

| Role | Font | CSS Variable |
|------|------|-------------|
| Headings (h1-h6) | **Syne** (400-800) | `var(--font-display)` |
| Body | **DM Sans** (300-700) | `var(--font-body)` |

Import: `https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Syne:wght@400;500;600;700;800&display=swap`

## Color Palette

### Backgrounds (Warm Neutrals)
| Token | Hex | Usage |
|-------|-----|-------|
| `--cream` | `#FAF8F5` | Page/section bg, hero bg |
| `--cream-dark` | `#F2EFE9` | Secondary bg, tabs |
| `--cream-darker` | `#E8E3DB` | Card borders, dividers |
| `--parchment` | `#F5F1EA` | Trust bar, light chip bg |
| `--warm-white` | `#FFFDF9` | Cards, elevated surfaces |

### Text (Warm Charcoals)
| Token | Hex | Usage |
|-------|-----|-------|
| `--charcoal` | `#1C1917` | Primary headings, body |
| `--charcoal-muted` | `#44403C` | Body text, nav items |
| `--charcoal-subtle` | `#78716C` | Muted text, descriptions |
| `--charcoal-faint` | `#A8A29E` | Labels, placeholders |

### Accents
| Token | Hex | Usage |
|-------|-----|-------|
| `--terracotta` | `#C2410C` | Primary accent |
| `--terracotta-light` | `#EA580C` | Hover state |
| `--amber` | `#D97706` | Secondary accent |
| `--sage` | `#4A7C59` | Success, pulsing dots |

### Dark Section
| Token | Hex | Usage |
|-------|-----|-------|
| `--dark-card` | `#2C2825` | Dark card bg |
| `--dark-border` | `#3C3835` | Dark card border |
| `--dark-text` | `#FAF8F5` | Text on dark |

## Key Patterns

### Eyebrow Badge
```html
<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
            bg-[#FFF7ED] border border-[#FED7AA] text-xs font-semibold text-[#C2410C]">
  <span class="w-1.5 h-1.5 rounded-full bg-[#4A7C59] animate-pulse" />
  Label text
</div>
```

### Grain Texture Overlay
```html
<div class="absolute inset-0 opacity-[0.025] pointer-events-none"
     style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E');
     background-size: 200px;">
</div>
```

### Warm Blobs (Ambient Glow)
```html
<div class="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#D97706]/6 blur-[120px] pointer-events-none" />
<div class="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#C2410C]/5 blur-[120px] pointer-events-none" />
```

### Hero Editorial Layout
- **Structure:** 7 cols text + 5 cols photo (12-col grid)
- **Photo:** `rounded-2xl`, `rotate(1.2deg)`, warm shadow, gradient overlay
- **Floating cards:** 2 cards, light (+ dark), rotated ±1-2°, y-float animation
- **Metrics strip:** `border-t border-[#E8E3DB]`, 4 items with Syne value + DM Sans label
- **CTAs:** Primary (charcoal bg, terracotta hover) + Secondary (transparent, charcoal border)

### Hand-Drawn Underline
```html
<svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 14" fill="none" preserveAspectRatio="none">
  <path d="M2 9C60 4 140 2 200 5C260 8 340 11 398 7" stroke="#C2410C" stroke-width="3.5" stroke-linecap="round" opacity="0.7"/>
</svg>
```

### Card
```
background: #FFFDF9
border: 1px solid #E8E3DB
border-radius: 1rem (rounded-2xl)
shadow: 0 1px 3px rgba(28,25,23,0.07)
hover: border-[#C2410C]/30, translateY(-6px)
```

### Buttons
| Variant | Default | Hover |
|---------|---------|-------|
| Primary | `bg-[#1C1917] text-[#FAF8F5]` | `bg-[#C2410C]` + stronger shadow |
| Secondary | `border-[#C8B8A8] text-[#44403C]` | `border-[#1C1917] text-[#1C1917]` |

### SVG Grain Texture Data URI
Use this as a `background-image` on any section:

```
data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E
```

## Tailwind v4 (if applicable)

Add to `@theme inline` block:
```css
@theme inline {
  --font-display: 'Syne', system-ui, sans-serif;
  --font-body: 'DM Sans', system-ui, sans-serif;

  --color-cream: #FAF8F5;
  --color-cream-dark: #F2EFE9;
  --color-cream-darker: #E8E3DB;
  --color-parchment: #F5F1EA;
  --color-warm-white: #FFFDF9;
  --color-charcoal: #1C1917;
  --color-charcoal-muted: #44403C;
  --color-charcoal-subtle: #78716C;
  --color-charcoal-faint: #A8A29E;
  --color-terracotta: #C2410C;
  --color-terracotta-light: #EA580C;
  --color-amber: #D97706;
  --color-sage: #4A7C59;
}
```
Then use as `font-display`, `bg-cream`, `text-terracotta`, etc.
