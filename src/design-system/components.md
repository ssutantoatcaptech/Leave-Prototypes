# Member Experience Design System — Component Reference
Source: Figma file `IE52Pd1nEcinhqOlSy4efj`

## Buttons
Variants: Primary (filled), Outline, Danger, Disabled, Ghost (link-style with info icon)

### Primary Button
- Background: var(--color-button-primary-bg) `#105fa8`
- Text: white, 14px semibold (600)
- Height: 40px (default), 32px (sm), 48px (lg)
- Border-radius: 6px
- Padding: 0 20px
- Hover: var(--color-button-primary-hover) `#0a4a85`
- Icons: lightning bolt icons (left/right) optional

### Outline Button
- Background: transparent
- Border: 1.5px solid var(--color-button-outline-border) `#105fa8`
- Text: var(--color-button-outline-text) `#105fa8`, 14px semibold
- Hover: light blue background var(--color-button-outline-hover-bg)

### Danger Button
- Background: var(--color-button-danger-bg) `#dc2626`
- Text: white

### Disabled Button
- Background: var(--color-button-disabled-bg) `#9ca3af`
- Text: white
- Cursor: not-allowed

### Ghost/Link Button
- No background, no border
- Text: `#105fa8`
- Info circle icon + chevron right for navigation links

---

## Inputs
### Text Input
- Label: UPPERCASE, 11-12px, gray (#5d5d5d), letter-spacing 0.08em, above input
- Required: red asterisk (*) after label
- Input box: full-width, 40px height, 1px solid border `#dfebf6`
- Border-radius: 6px
- Padding: 12-14px
- Font: Source Sans Pro, 14px
- Placeholder: gray (#9ca3af)
- Focus: border `#105fa8`, subtle box-shadow
- Error: border `#dc2626`, error message below in red
- Icon: edit pencil or clear (x) on right side
- Inline message below input in gray

### Select/Dropdown
- Same styling as text input
- Down-chevron icon on right
- Open state: dropdown list with "Row Label" items, separator lines between

### Day/Hours Input (Schedule)
- Square inputs for hours (48x48px), bold centered number
- "hrs" label below each box
- Day label (DAY) above in uppercase small text

### Search Input (with prefix select)
- Title/prefix dropdown on left (e.g., "Mr")
- Text input for name
- Search icon (magnifying glass) on right
- Dropdown results: "Row Label" list items

---

## Pills (Status Badges)
- Shape: rounded-full (pill shape), border 1.5px solid `#e4e4e4`
- Height: ~28px, padding: 4px 12px
- Text: 13-14px regular weight
- Colored dot (8px circle) on left

### Variants:
- **Denied**: red dot `#dc2626`, text "Denied"
- **Pending**: amber dot `#f59e0b`, text "Pending"
- **Approved**: green dot `#16a34a`, text "Approved"
- **Active**: green dot `#16a34a`, text "Active", green border
- **Inactive**: no dot, gray text, gray border
- **Default/Label**: no dot, gray text

---

## Tags
Two types:
- **Filled**: dark navy bg `#003a70`, white text, rounded-full, 14px
- **Outline**: light gray border `#e4e4e4`, gray text `#5d5d5d`, rounded-full

---

## Inline Message
- Background: white
- Border-top: 4px solid `#105fa8`
- Left: filled blue circle icon (ⓘ) `#105fa8`
- Text: regular weight dark, 14px
- No left/right/bottom visible border (or very light card shadow)
- Padding: 16px
- Used for informational callouts within forms/wizards

---

## Messages / Notifications
Full-width banner notifications with dismiss (X) button:
- **Success**: green bg `#147b5c`, white text, checkmark circle icon
- **Error**: salmon/light red bg with red left border, red circle exclamation icon
- **Warning**: light yellow bg with amber/orange left border, triangle exclamation icon
- **Info**: light blue bg with blue left border, circle info icon

Structure: icon (left) + content (date + title + description/link) + dismiss X (right)

---

## Notification Cards (Action Items)
- White card with left border color indicator
- "Action Required" (red) or "Suggested Action" (blue) label with icon
- Bold title + description + date
- Tag pill (e.g., "Label")
- Action buttons: outline style ("Update Status", "Dismiss", "Mark as Complete")

---

## Selection Card
### Vertical (default — square-ish)
- White bg, 1.5px solid border `#e4e4e4`
- Border-radius: 12px
- Centered: icon in light blue circle `#dcebf9`, title (bold 14px), description (gray 13px)
- Radio indicator: top-right corner (hollow circle)
- Selected: border `#105fa8`, radio fills blue, icon circle darkens

### Horizontal (inline variant)
- Same styling but horizontal layout
- Radio on left, icon circle, then title + description stacked

---

## Tabs
### Underline tabs (bottom border)
- Active: bold text, blue underline (3px) `#105fa8`
- Inactive: regular weight gray text, no underline
- Full row of tabs with bottom border separator

### Pill tabs
- Active: filled blue bg `#105fa8`, white text, rounded
- Inactive: no bg, gray text
- Bottom border underline on the row

---

## Pagination
- Row of square page number buttons: border `#e4e4e4`, 36x36px, rounded 6px
- Active page: blue bg `#105fa8`, white text
- Inactive: white bg, dark text
- Nav arrows: < > on ends
- Ellipsis (...) for truncated pages
- "Showing 1 to 5 of 24 entries" text below/beside

---

## Progress Bar (Stepper)
### Linear progress bar
- Track: full-width, 4px height, rounded, `#e5e7eb`
- Fill: `#105fa8`, proportional to step

### Step indicator (numbered circles)
- Completed: filled blue circle with white checkmark
- Current: outlined blue circle with number
- Upcoming: gray outlined circle with number
- Connected by lines (blue for completed segments, gray for upcoming)
- Labels below each step

### Numbered stepper (alternative)
- 4 steps: Verify → Credentials → Profile → Review
- Navy background circles for current, gray for future

---

## Checkbox
- Unchecked: 18x18px square, rounded 4px, border `#d1d5db`
- Checked: filled blue `#105fa8`, white checkmark
- Label: regular weight, 14px, right of checkbox

---

## Radio Button
- Unchecked: 18px circle, border `#d1d5db`
- Selected: outer ring `#105fa8`, inner filled circle `#105fa8`
- Label: regular weight, 14px, right of radio

---

## Toggle Switch
### Segmented toggle (pill selector)
- Rounded container with 2 options
- Active: filled blue `#105fa8`, white text, rounded
- Inactive: no fill, dark text
- Full-width within container

### Standard toggle
- Track: 44x24px oval, `#d1d5db` off / `#105fa8` on
- Thumb: 20px white circle, slides left/right

---

## Table
### Header row
- Bold text labels, bottom border `#e5e7eb`
- Sortable columns: down arrow icon

### Data cells
- Regular weight text, 14px
- Bottom border separator `#e5e7eb`
- Padding: 12px 16px
- Left border indicator (blue) for active/selected rows

### Cell variants
- ID cell: monospace-style "CLM-98234"
- Link cell: "Details ▾" dropdown
- Status cell: pill component
- Action cell: text buttons with chevrons

---

## Form Fields / Field Labels
- Label text: regular or bold, 14px
- With info icon: circle-info `#105fa8` after label
- Required: red asterisk (*) before label
- Error state: red text "Field Label Error Message" below

---

## Breadcrumb
- Links: blue text `#105fa8`, hover underline
- Separator: ">" in gray
- Current page: regular weight, no link
- Font: 14px

---

## Navigation (Global)
### Desktop
- Full-width white bar, bottom border `#e5e7eb`
- Logo (Mutual of Omaha) on left
- Main nav links: navy text `#003a70`, dropdown arrows
- Benefits Hub, Dashboard, Benefits ▾, Claims & Leave ▾, Documents ▾, Support ▾
- Right side: Help, Links, avatar/profile
- Sub-nav row below: page-specific tabs (underline style)
- Active dropdown: white panel with link list

### Mobile
- Hamburger menu (3 bars)
- Full-screen overlay with nav sections
- Active item: blue text, blue left border
- Nested sections with chevrons
- Bottom quick actions: Email, Notifications, Messages, Chat, Profile (with icons)

---

## Footer
### Desktop
- Two-section: links grid + legal
- Title: "Benefit Hub" in blue bold
- 4-column link grid: Benefits, Claims, Leave, Get Assistance
- Links: blue text `#105fa8`
- Phone numbers in regular text
- Legal links row: Privacy Policy, Manage Cookie Preferences, Terms of Use, Accessibility Services
- Copyright: gray small text

### Mobile
- Single column stack
- Same content as desktop but linearized

---

## Stats Card
- White card, rounded corners, subtle shadow
- Top: bold label (e.g., "Your Plan Paid")
- Large value: blue text, 28-32px bold (e.g., "$150")
- Description: gray regular text
- Separator line
- Bottom section: uppercase label + bold value (e.g., "PATIENT: Sarah Johnson")

---

## Brand Banner
- Full-width navy bg `#003a70`
- Mutual of Omaha logo (white) on left
- "GROUP ID: G000CSM5" on right in white
- Co-branding variant: logo | company name | group ID
- Height: ~48px
- Text: white, 14px
