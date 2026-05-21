# Contexte projet — Finalyn V2

Ce document est lu en premier dans toute nouvelle conversation pour donner le contexte du projet.
Il résume la marque, le stack, les décisions de design prises sur la **v1** (`vibe-app/`), et les règles à suivre.

---

## 1. Identité de marque

- **Nom** : Finalyn
- **Domaine** : finalyn.com (Suisse — basé à Rolle, Vaud)
- **Activité** : agence digitale & vibe coding (création de sites + apps rapides)
- **Cible** : PME, startups, indépendants suisses (Romandie principalement)
- **Promesse principale** : sites livrés en **5 à 10 jours**, propres et performants
- **Offre d'accroche** : "Premier visuel de votre site offert · Sans engagement"

## 2. Stack technique

- **Vanilla HTML + CSS + JS** — pas de React, pas de Vue, pas de TypeScript, pas de Tailwind, pas de build tool.
- **Aucune dépendance npm**. Tout est statique, ouvre dans le navigateur direct.
- **Polices Google Fonts** : Inter (display) + Plus Jakarta Sans (body)
- **Hébergement** : GitHub Pages (gratuit, branche `main`, déploie auto à chaque push)
- **Repo v1** : https://github.com/Finalyn/Finalyn-web (public)
- **Site v1 live** : https://finalyn.github.io/Finalyn-web/

⚠️ **Ne JAMAIS proposer de convertir en React/Next.js/framework**. Stack volontairement simple.

## 3. Préférences de communication

- **Langue** : français
- **Ton** : direct, concis, pas de blabla. Phrases courtes.
- **Pas de commentaires inutiles dans le code** — un commentaire = un "pourquoi" non-évident.
- **Pas d'emojis** sauf si explicitement demandé.
- **Pour les questions exploratoires** ("qu'est-ce que tu en penses ?", "tu as des idées ?"), répondre en 2-3 phrases avec une reco + le tradeoff principal. Pas un pavé.

## 4. Design system (tokens CSS)

```css
:root {
  --ink: #0F0F0F;              /* texte principal */
  --ink-XX: rgba(15,15,15,X);  /* opacités 80/65/50/30/15/10/05 */

  --electric: #2563EB;          /* bleu accent principal */
  --electric-soft: rgba(37,99,235,0.1);

  --mist: #F4F6FA;              /* fond gris clair */
  --white: #FFFFFF;

  --font-display: 'Inter';
  --font-body: 'Plus Jakarta Sans';

  --radius-pill: 999px;
  --ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Dark mode activable via `[data-theme="dark"]` (override des tokens ink + mist).

## 5. Règles de design — DO / DON'T

### À éviter absolument (donne un côté "template IA généré")

- ❌ **Space Grotesk** comme police pour les boutons/labels/tags
- ❌ **UPPERCASE + letter-spacing** sur les petits éléments (eyebrow, badges, tags)
- ❌ **Points qui clignotent/pulsent** près d'un texte ("statut live", etc.)
- ❌ **Bordures rondes par défaut** sur tous les petits éléments — préférer texte nu quand possible
- ❌ **Effets glow/néon génériques** sans justification

### Ce qui fonctionne bien sur la v1

- ✅ Police **Plus Jakarta Sans** pour boutons + Inter pour titres
- ✅ Casse normale, pas d'uppercase, letter-spacing négatif léger (`-0.01em`)
- ✅ Bleu **#2563EB** comme accent unique
- ✅ Halos bleus animés en arrière-plan (radial gradients flottant lentement)
- ✅ Dark mode propre (TOUJOURS démarrer en clair, ne pas suivre `prefers-color-scheme`)
- ✅ Pill-shapes (`border-radius: 999px`) pour CTA et nav

## 6. Architecture v1 (à titre informatif, pour s'en inspirer ou s'en éloigner)

Ordre des sections de `vibe-app/index.html` :

1. **Header** — pill flottant translucide, shrink au scroll, 5 liens nav + toggle thème + CTA "Démarrer un projet"
2. **Hero** — texte à gauche / visuel split code-rendu à droite. Kicker "✦ Premier visuel de votre site offert"
3. **Services** — scrollytelling sticky (4 services avec illustrations animées : browser, shop, phone, dashboard)
4. **Processus** — timeline horizontale 5 étapes (Brief, Maquette, Vibe code, Tests, Livraison)
5. **+48 technologies** — marquee horizontal infini, 4 lignes (Frontend, Backend, Cloud, IA)
6. **Offre 780 CHF** — bloc de prix
7. **Audit gratuit** — formulaire mailto
8. **Projets réalisés**
9. **Autres services**
10. **FAQ** — éditorial numéroté (gros chiffres 01–06 à gauche, Q+R à droite, hover bleu)
11. **CTA final**
12. **Footer**

Plus le header (déjà présent dans `vibe-app-v2/index.html`).

## 7. Décisions de copy / positioning prises

- **Pas de preuves sociales** affichées (l'agence démarre, pas de portfolio client encore)
- **Pas de prix visible** dans le hero (filtre les mauvais leads mais peut bloquer les bons — décision : on n'affiche pas)
- **Promesse de visuel offert** comme inversion du risque (remplace les preuves manquantes)
- **CTA primaire** : "Recevoir mon visuel gratuit" (action verb + offer)
- **Sous-titre concret** : range chiffré (5 à 10 jours) + 3 cas d'usage (Site vitrine, e-commerce, app)

## 8. Comment travailler ensemble

- Avant de toucher au code, **lire l'existant** (Read, Grep) pour comprendre les conventions.
- **Pas de refactor massif non demandé**. Petits changements ciblés.
- **Pas d'ajout de framework / dépendance** sans demander.
- **Tester en proposant des screenshots si possible** (le user envoie souvent des captures pour montrer ce qui ne va pas).
- Quand le user demande "tu as des idées ?" : proposer **3 options** courtes + reco + tradeoff. Pas plus.
- Pour les actions destructrices (push, modif. visibilité repo, etc.) : **demander confirmation** avant.

## 9. État actuel de v2 (à jour)

### 9.1 Architecture finale du site

Ordre des sections dans `index.html` :
1. **Header** — fixed top, logo "finalyn.web" + 4 nav links (Services / Cas d'usage / Réalisations / Contact)
2. **Hero** — texte gauche (titre rotatif) + carousel arc droite (4 dots + scroll mockup)
3. **Cas d'usage** — "Vous vous reconnaissez ?" — 4 cards (Restaurateur / Commerçant / Startup / Association)
4. **Réalisations** — 4 projets avec popup détaillée
5. **Process** — "Comment ça se passe" — timeline 5 étapes + stats panel
- Plus de section toggle thème / toggle langue (retiré)

### 9.2 Fichiers

```
vibe-app-v2/
├── index.html
├── styles.css        (~1800 lignes)
├── script.js         (~600 lignes)
├── CONTEXT.md        (ce fichier)
└── assets/
    ├── hero-bg-2.png         (fond bleu vagues, statique sur tout le site)
    ├── hero-bg.jpeg          (ancien, non utilisé)
    ├── logo-finalyn.svg      (existant mais non utilisé — logo en texte CSS)
    ├── Association.jpg       (cas d'usage)
    ├── Commercant.jpg        (cas d'usage)
    ├── Startup.jpg           (cas d'usage)
    └── mockup/
        ├── laptop.png        (MacBook — pour carousel hero)
        ├── Mac.png           (iMac)
        ├── Ipad.png          (iPad portrait)
        └── Iphone.png        (iPhone)
```

⚠️ **Manquant** : `Restaurateur.jpg` (cas d'usage) — actuellement en placeholder Picsum

### 9.3 Identité visuelle finale

- **Fond global** : `assets/hero-bg-2.png` sur `body` avec `background-attachment: fixed` → image immobile, le contenu scroll par-dessus
- **Sections** sont en `background: transparent` → laissent voir le fond du body
- **Pas de dark mode** — la classe data-theme="dark" n'est plus utilisée
- **Logo** : texte CSS "finalyn.web" (avec `.web` en bleu `--electric`)

### 9.4 Section HERO

**Côté gauche (texte)** :
- Titre H1 : "Construisons votre projet [MOT]." où [MOT] change toutes les 5.6s
  - Cycle des mots : **E-commerce → SaaS → Application → Page Web** (en boucle)
  - Direction : **descendant** (le nouveau mot vient d'en haut, scroll vers le bas)
  - Sync avec la rotation des dots du carousel à droite
- Sous-titre + 3 puces
- 2 CTAs : "Planifier un appel" (dark, `border-radius: 10px`) + "Voir comment ça fonctionne →"
- Meta "Sans engagement · Réponse en 24h"
- **Formulaire capture email** : "votre@email.ch" + bouton dark "Recevoir mon visuel →" → submit = mailto
  - Effet shine sweep automatique sur les boutons dark (animation CSS infinie 4.5s)

**Côté droit (carousel arc)** :
- SVG : cercle complet (stroke `#0f172a` solide, width 5) + 4 dots bleus (`#4a7fd4`, r=15, fill plat)
- Centre du cercle calculé hors écran à droite : `cx = leftmostX + r` où leftmostX = 78% width
- Rayon `r` calculé dynamiquement : l'arc visible touche les coins haut-droite et bas-droite du conteneur
- **Mockup** : fenêtre 240×380 avec overflow hidden contenant un stack scrollable de 4 mockups PNG (laptop / iPhone / iPad / Mac) + 1 duplicate du premier pour boucle invisible
- Stack ordre top→bottom : `[laptop dup, Mac, iPad, iPhone, laptop]` (inversé pour scroll descendant)
- **Animation step-based** pilotée en JS :
  - 5s de pause sur chaque dot
  - 600ms de rotation `-90°` du groupe de dots + 376px translate du track mockup (sync exact)
  - Easing `cubic-bezier(0.4, 0, 0.2, 1)`
  - Après 4 ticks (360° complet) → reset sans transition (loop invisible)
- **Scale par device** (compense le whitespace dans les PNG) :
  ```css
  laptop:  1.1
  Mac:     1.3
  iPad:    1.2
  iPhone:  1.45
  ```
- **Mask fade** sur `.hero__visual` : top/bottom 12% fade → l'arc se fond, pas de coupure nette
- Responsive via CSS vars (`--mw`, `--mh`, `--gap`) recalculées par JS au resize

### 9.5 Section CAS D'USAGE

- Titre : "Vous vous reconnaissez ?"
- **Desktop** : 4 cards en arc 3D (positions `--slot:1` à `--slot:4` avec translate + rotate)
  - Front : image (Association.jpg, Commercant.jpg, Startup.jpg, Restaurateur placeholder)
  - Back : numéro + "Vous êtes [persona] ?" + hint
  - Flip 3D au hover (rotateY 180°)
  - Hover : scale 1.08 + lift -12px avec easing bounce
  - Clic = ouvre la `<dialog class="usecases__modal">` (fullscreen mobile, centrée desktop)
- **Mobile (< 880px)** : grille 2×2, image cachée, verso (texte) directement visible
- Modal contient : numéro + titre long + lede + 6 puces de services + CTA "Démarrer mon projet" (mailto)
- 4 personas : `restaurateur`, `commercant`, `startup`, `association`
- CTA bas section : "Le mien n'est pas là" → mailto

### 9.6 Section RÉALISATIONS

- Titre : "Ce qu'on a livré récemment"
- **Desktop** : grille 2×2 de cards (image + body)
- **Mobile (< 880px)** : swipe horizontal scroll-snap (1 card à 82% width)
- Chaque card : `<button>` avec `data-work="..."` (clé : `pasta-mario`, `atelier-celeste`, `novia`, `solidaria`)
  - Image (aspect 16:10) + tag en chip blanc translucide
  - Body : nom du projet + description courte + footer (délai · livraison / année)
- Clic = ouvre la `<dialog class="work-modal">` natively
  - Image 21:9 large + tag overlay
  - Titre, description longue, meta (Délai / Stack / Année)
  - 2 CTAs : "Voir le site" (target blank) + "Démarrer mon projet" (mailto)
  - Mobile : modal fullscreen, image 21:9 (24:9 en très petit), méta en 1 col, CTAs stack
  - Body en flex column avec `flex: 1; overflow-y: auto; min-height: 0`
  - Au open : `scrollTop = 0` + focus sur le close button (avec `preventScroll: true`) pour éviter le scroll auto natif de `<dialog>` qui peut cacher le titre/desc
- Images : Picsum avec seeds `finalyn-pasta-mario`, etc. (à remplacer par vraies captures)
- CTA bas section : "Démarrer mon projet" (mailto)

### 9.7 Section PROCESS

- Titre : "5 étapes, 10 jours max."
- Sous-titre : "Pas de réunions à rallonge. Pas de devis à 30 pages. On code, vous regardez."
- **Stats panel** (au lieu du browser mockup initialement prévu) :
  - Card blanche avec subtle shadow + pulse vert "live"
  - Titre : "Notre standard de livraison"
  - **4 stats animées** avec compteurs qui s'incrémentent au scroll (IntersectionObserver) :
    - **14 j** — Livré en / de l'idée au live
    - **98/100** — Score Lighthouse / performance + SEO
    - **100 %** — Mobile-first / testé sur 12 devices
    - **< 24 h** — Première réponse / à votre brief
  - Trait bleu fin au-dessus de chaque stat
- **Timeline 5 étapes** : Brief (1j) → Maquette (2-3j) → Production (3-5j) → Tests (1j) → Livraison (jour J)
  - 5 cercles bleus alignés avec ligne horizontale grise au milieu (passe à `top: 25px` pour centrer pile)
  - Sur mobile : reste 5 colonnes mais texte plus petit + ligne et noms restent visibles

### 9.8 Animations / mécaniques JS importantes

**Carousel hero** :
- Module IIFE `Carousel`
- `tick()` exécuté à chaque cycle : rotation dots + scroll track mockup (sync exact)
- Variables CSS calculées au layout : `--mw`, `--mh`, `--gap`, `--c-x-end`, `--c-y-half`...
- Reset après révolution complète (4 ticks) sans transition

**Rotator titre H1** :
- Module séparé, **sync identique** au carousel (`PAUSE_MS = 5000`, `ROTATE_MS = 600`, `CYCLE_MS = 5600`)
- Track avec 5 éléments (4 mots + duplicate du 1er au top)
- Position initiale : `translateY(-4.8em)` (montre le mot du bas)
- À chaque tick : translateY augmente (track shift DOWN) → mot suivant vient d'en haut

**Modals (Réalisations + Cas d'usage)** :
- Native `<dialog>` avec `showModal()` / `close()`
- ESC, X et clic backdrop ferment
- Anim entrée 0.3s avec léger overshoot
- Au open : `scrollTop = 0` du body + focus sur close button avec `preventScroll: true`
- Délégation d'événements (un seul listener sur document)

**Compteurs stats** :
- `IntersectionObserver` à 40% threshold
- Animation ease-out cubic sur 1.5s
- Une seule fois (obs.disconnect après premier déclenchement)

### 9.9 Responsive — breakpoints

```
> 1280px  : layout desktop XL (carousel 680×620, padding 200 left)
1080-1280 : layout desktop (560×520, padding 120)
880-1080  : layout desktop compact (460×440, padding 80, grid 1fr 1.2fr)
< 880px   : layout STACK / mobile (single column, padding 24-40)
< 600px   : mobile (modals fullscreen, padding 20, timeline réduite)
< 540px   : timeline encore réduite (cercles 28px, noms 10.5px, ligne top:20)
< 380px   : très petit (cercles 24px, modal image 24:9)
```

### 9.10 Bugs connus / TODO

- ⚠️ La modal réalisations peut afficher un contenu vide si JS error silencieux. Logs de debug actuellement actifs (`console.log` au load + au clic) pour diagnostiquer.
- Pas encore d'image `Restaurateur.jpg` pour le cas d'usage (placeholder Picsum)
- Images des réalisations sont des placeholders Picsum (à remplacer par vraies captures)
- Pas de section Contact dédiée (tout passe par mailto contact@finalyn.com)
- Pas de section Stack / Tarifs / FAQ (planifiées mais pas codées)
- Le logo SVG `logo-finalyn.svg` existe mais n'est plus utilisé (logo en texte CSS dans le header)
- `.proc-phase` ancien CSS conservé en `display: none` (peut être supprimé)

### 9.11 Liens externes / API

- Images placeholders : `https://picsum.photos/seed/{seed}/{w}/{h}` — peut être lent ou bloqué
- Google Fonts : Inter + Plus Jakarta Sans (preconnect dans le head)
- Formulaires : tous mailto `contact@finalyn.com` (pas de backend)
