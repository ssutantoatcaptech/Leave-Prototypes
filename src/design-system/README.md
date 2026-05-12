# Member Experience Design System

Local reference extracted from Figma for accuracy in prototyping.

## Sources
- **Design System**: Figma file `IE52Pd1nEcinhqOlSy4efj` (Member Experience Design System)
- **Iconography**: Figma file `PANnuPSeOJ5BkW3XDyt2RG` (Member Experience Iconography)

## Contents

### `tokens.css`
CSS custom properties for all design tokens:
- Colors (brand, semantic, status, component-specific)
- Typography (font family, sizes, weights, line heights, letter spacing)
- Spacing scale (4px increments)
- Border radius
- Shadows
- Component sizing
- Layout widths
- Transitions
- Z-index layers

Import in your CSS: `@import '../design-system/tokens.css';`

### `components.md`
Complete component specifications with:
- Visual styling rules (colors, sizes, borders, spacing)
- State variants (hover, active, disabled, error, focus)
- Layout patterns (how components compose)
- Typography within components

### `icons/`
- `icon-registry.md` — Full catalog of 629 icons across 27 categories
- Individual `.svg` files for commonly used icons (24x24 viewBox, `currentColor` fill)

## Usage

### CSS Tokens
```css
@import '../design-system/tokens.css';

.my-button {
  background: var(--color-button-primary-bg);
  color: var(--color-button-primary-text);
  height: var(--size-button-height);
  border-radius: var(--radius-md);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
}
```

### Icons (inline SVG)
```jsx
// Import as React component (with vite-plugin-svgr) or use inline SVG
import InfoCircle from '../design-system/icons/info-circle.svg?react';

// Or reference in CSS
.icon { color: var(--color-icon-primary); }
```

## Key Design Principles
1. **Primary blue** (`#105fa8`) is the main interactive color
2. **Navy** (`#003a70`) for headings and emphasis
3. **Source Sans Pro** is the only typeface
4. **4px spacing grid** for all layout
5. **Rounded corners** (6px default, 12px for cards)
6. **Status colors**: green=success, amber=pending, red=error/denied, blue=info
7. **Pills** (not tags) for status indicators — outlined with colored dot
8. **Inline Message** for info callouts — white bg, blue top border, info icon
