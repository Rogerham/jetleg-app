
# Luxueuze Rebranding - Jetleg

## Overzicht
Transform de visuele identiteit van Jetleg naar een high-end, minimalistische esthetiek die past bij luxe privevliegen. We behouden alle bestaande layouts, componenten en animaties - enkel de visuele "skin" wordt aangepast.

## Wat blijft ongewijzigd
- Alle pagina-structuren en layouts
- Navigatie en routing
- Alle functionaliteit en interacties
- Bestaande animaties (fade-in, scale, accordion)
- Component architectuur

---

## 1. Typografie

### Nieuwe Font Stack
- **Koppen (headings):** Playfair Display (elegant serif met contrast)
- **Body tekst:** Inter met verhoogde letter-spacing voor luxe uitstraling

### Implementatie
**index.html** - Google Fonts toevoegen:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

**src/index.css** - Font variabelen definiëren:
```css
--font-heading: 'Playfair Display', Georgia, serif;
--font-body: 'Inter', -apple-system, sans-serif;
--letter-spacing-body: 0.02em;
--letter-spacing-wide: 0.05em;
```

---

## 2. Kleurenpalet

### Nieuw Luxe Palet
| Naam | HSL Waarde | Gebruik |
|------|------------|---------|
| Ivory | 40 20% 98% | Achtergrond (off-white) |
| Warm Cream | 40 15% 96% | Cards, secties |
| Champagne | 43 30% 92% | Muted elementen |
| Charcoal | 220 15% 18% | Primaire tekst |
| Deep Slate | 220 20% 12% | Koppen, accenten |
| Brushed Gold | 43 65% 55% | CTA's, highlights |
| Soft Gold | 43 50% 70% | Hover states |
| Sand | 35 25% 85% | Borders, dividers |
| Taupe | 30 10% 60% | Muted text |

### CSS Variabelen Update (src/index.css)
```css
:root {
  /* Luxe off-white achtergronden */
  --background: 40 20% 98%;
  --foreground: 220 15% 18%;

  /* Warme cream cards */
  --card: 40 15% 96%;
  --card-foreground: 220 15% 18%;

  /* Geraffineerde primaire kleuren */
  --primary: 220 20% 12%;
  --primary-foreground: 40 20% 98%;

  /* Subtiele secondary */
  --secondary: 43 30% 92%;
  --secondary-foreground: 220 15% 18%;

  /* Brushed gold accent */
  --accent: 43 65% 55%;
  --accent-foreground: 220 20% 12%;

  /* Zachte muted tonen */
  --muted: 35 25% 90%;
  --muted-foreground: 30 10% 45%;

  /* Subtiele borders */
  --border: 35 20% 88%;
  --input: 35 15% 90%;
  --ring: 43 65% 55%;
}
```

---

## 3. Schaduwen en Borders

### Nieuwe Subtiele Styling
```css
/* Zachte, luxe schaduwen */
--shadow-card: 0 2px 8px -2px hsl(220 15% 18% / 0.04), 
               0 4px 16px -4px hsl(220 15% 18% / 0.06);
--shadow-card-hover: 0 8px 24px -8px hsl(220 15% 18% / 0.08), 
                     0 16px 32px -8px hsl(220 15% 18% / 0.04);
--shadow-elevated: 0 12px 40px -12px hsl(220 15% 18% / 0.12);

/* Button shadows */
--shadow-button: 0 2px 12px 0 hsl(43 65% 55% / 0.20);
--shadow-button-hover: 0 4px 20px 0 hsl(43 65% 55% / 0.30);
```

### Border Styling
- Vervang harde borders door subtiele 1px lijnen met lage opacity
- Gebruik `border-color: hsl(35 20% 88%)` voor alle borders
- Optioneel: gebruik `border: none` + shadow voor sommige cards

---

## 4. Component Updates

### 4.1 Cards (.card-jetleg)
```css
.card-jetleg {
  @apply bg-card rounded-2xl overflow-hidden;
  background: linear-gradient(
    165deg, 
    hsl(40 15% 98%) 0%, 
    hsl(40 15% 96%) 100%
  );
  box-shadow: var(--shadow-card);
  border: 1px solid hsl(35 15% 90% / 0.5);
}

.card-jetleg:hover {
  box-shadow: var(--shadow-card-hover);
  border-color: hsl(43 65% 55% / 0.2);
}
```

### 4.2 Primary Button (.btn-jetleg-primary)
```css
.btn-jetleg-primary {
  @apply font-medium px-8 py-4 rounded-xl tracking-wide;
  background: linear-gradient(
    135deg, 
    hsl(43 65% 55%) 0%, 
    hsl(43 55% 50%) 100%
  );
  color: hsl(220 20% 12%);
  box-shadow: var(--shadow-button);
  letter-spacing: 0.03em;
  font-family: var(--font-body);
}

.btn-jetleg-primary:hover {
  background: linear-gradient(
    135deg, 
    hsl(43 55% 50%) 0%, 
    hsl(43 50% 45%) 100%
  );
  box-shadow: var(--shadow-button-hover);
}
```

### 4.3 Input Fields (.input-jetleg)
```css
.input-jetleg {
  @apply w-full px-5 py-4 rounded-xl;
  background: hsl(0 0% 100%);
  border: 1px solid hsl(35 20% 88%);
  color: hsl(220 15% 18%);
  font-family: var(--font-body);
  letter-spacing: 0.01em;
}

.input-jetleg:focus {
  border-color: hsl(43 65% 55%);
  box-shadow: 0 0 0 3px hsl(43 65% 55% / 0.1);
}
```

### 4.4 Hero Section
```css
.hero-section {
  /* Elegantere overlay */
  background: linear-gradient(
    180deg,
    hsl(220 20% 12% / 0.55) 0%,
    hsl(220 20% 12% / 0.40) 100%
  );
}
```

### 4.5 Search Form
```css
.search-form-jetleg {
  @apply backdrop-blur-lg rounded-2xl p-6 lg:p-8;
  background: hsl(0 0% 100% / 0.12);
  border: 1px solid hsl(0 0% 100% / 0.15);
}
```

---

## 5. Typografische Hiërarchie

### Heading Styles
```css
h1, h2, .text-hero, .text-title, .text-page-title {
  font-family: var(--font-heading);
  font-weight: 500;
  letter-spacing: -0.01em;
  color: hsl(220 20% 12%);
}

.text-hero {
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.15;
  font-weight: 400;
}

.text-title {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  line-height: 1.25;
}
```

### Body Text
```css
body {
  font-family: var(--font-body);
  font-weight: 400;
  letter-spacing: var(--letter-spacing-body);
  line-height: 1.65;
}

p, span, label {
  letter-spacing: 0.015em;
}
```

---

## 6. Spacing ("Ademruimte")

### Verhoogde Padding
```css
/* Container padding */
.container {
  @apply px-6 md:px-10 lg:px-12;
}

/* Section spacing */
section {
  @apply py-16 md:py-20 lg:py-24;
}

/* Card internal padding */
.card-jetleg > div {
  @apply p-6 md:p-8;
}

/* Form element spacing */
.space-y-6 {
  --tw-space-y-reverse: 0;
  margin-top: calc(2rem * calc(1 - var(--tw-space-y-reverse)));
}
```

---

## 7. Dark Mode Aanpassingen

```css
.dark {
  /* Sophisticated dark palette */
  --background: 220 20% 8%;
  --foreground: 40 15% 92%;
  
  --card: 220 18% 12%;
  --card-foreground: 40 15% 92%;
  
  --primary: 40 15% 92%;
  --primary-foreground: 220 20% 8%;
  
  --accent: 43 60% 60%;
  --accent-foreground: 220 20% 8%;
  
  --muted: 220 15% 18%;
  --muted-foreground: 40 10% 60%;
  
  --border: 220 15% 20%;
}
```

---

## 8. Deal Badge & Labels

```css
.deal-badge {
  @apply text-xs font-medium px-3 py-1.5 rounded-full;
  background: hsl(43 65% 55% / 0.15);
  color: hsl(43 60% 40%);
  border: 1px solid hsl(43 65% 55% / 0.25);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* Discount badge */
.discount-badge {
  background: linear-gradient(135deg, hsl(142 50% 45%) 0%, hsl(142 45% 40%) 100%);
  color: white;
}
```

---

## 9. Bottom Navigation

```css
nav.bottom-nav {
  background: hsl(40 15% 98% / 0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid hsl(35 20% 90%);
}

.dark nav.bottom-nav {
  background: hsl(220 18% 10% / 0.95);
  border-top: 1px solid hsl(220 15% 20%);
}
```

---

## 10. Bestandswijzigingen Overzicht

| Bestand | Type Wijziging |
|---------|----------------|
| `index.html` | Google Fonts link toevoegen |
| `src/index.css` | Complete CSS variabelen en component styling |
| `src/components/HeroSection.tsx` | Overlay gradient aanpassen |

**Optioneel (verfijning):**
- `src/components/FlightCard.tsx` - Extra padding
- `src/components/BottomNavigation.tsx` - Styling tweaks
- `src/components/SearchWithSuggestions.tsx` - Dropdown styling

---

## Visueel Resultaat

**Voor:**
- Blauwe/gele accenten met hoog contrast
- Standaard Inter font voor alles
- Compacte spacing
- Harde schaduwen en borders

**Na:**
- Warm off-white met brushed gold accenten
- Elegante serif koppen (Playfair Display)
- Ruime, ademende layouts
- Zachte schaduwen en subtiele borders
- High-fashion minimalisme

---

## Technische Details

### Font Loading Optimalisatie
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### CSS Custom Properties Strategie
Alle kleuren via CSS variabelen zodat dark mode automatisch werkt en eventuele toekomstige thema-wijzigingen eenvoudig zijn.

### Gradient Fallbacks
Alle gradients hebben solid color fallbacks voor oudere browsers.

