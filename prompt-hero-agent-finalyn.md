# Hero « agent-as-hero » — Prompt Claude Code (option 2)

> Ce bloc remplace et détaille la section §4 (« Élément star ») du prompt principal. Objectif : faire de **l'agent qui qualifie le besoin** la pièce centrale du hero, au-dessus de la ligne de flottaison. L'agent ne doit pas « faire joli » : il doit **démontrer** le positionnement IA-native de Finalyn en donnant une recommandation chiffrée instantanée.

---

## 0. Avant de coder

1. Repère dans le repo l'agent actuel (« Notre agent vous oriente / Quel est votre besoin ? ») et le hero existant. Dis-moi s'il est déjà fonctionnel ou statique avant de partir.
2. **Contrainte SEO non négociable** : le `<h1>`, la proposition de valeur et le CTA principal doivent rester dans le **HTML rendu côté serveur / statique**, pas injectés uniquement par JS. L'agent est une couche interactive *par-dessus* un hero sémantiquement complet, pour rester crawlable (Google + LLM).
3. Ne dégrade pas le Lighthouse : l'agent doit être léger (pas de grosse lib de chat), et le premier paint ne doit pas attendre le JS de l'agent.

---

## 1. Layout du hero

Hero en deux temps, responsive :

- **Colonne gauche (ou haut sur mobile)** — la promesse : `<h1>` d'ancrage (« Construisons votre projet »), sous-titre, et les 3 preuves (Design sur mesure · Perf & SEO inclus · Livraison 5-10 j). C'est le contenu SEO, toujours visible.
- **Colonne droite (ou bas sur mobile)** — **l'agent en vedette** : champ de saisie « Décrivez votre projet… », les chips d'exemples cliquables, et la zone de réponse de l'agent qui apparaît au-dessus/sous le champ.

L'agent occupe une surface forte et identifiable, avec un léger relief (voir §4-5). Sur mobile, la promesse reste en premier, l'agent juste en dessous, sans casser le above-the-fold.

---

## 2. Comportement de l'agent (le cœur)

Promesse à tenir littéralement : **réponse chiffrée en moins de 2 secondes**.

### 2.1 — Moteur de recommandation
Implémente un **moteur déterministe côté client** (rapide, fiable, zéro coût API, aucune clé exposée). Il mappe l'intention (chip cliquée *ou* texte libre via mots-clés) vers une des offres, et renvoie une reco structurée. Mets les données dans un objet de config que je pourrai éditer :

```js
const OFFERS = {
  vitrine:   { label: "Site vitrine",            delai: "5 à 10 jours",  prixDes: null, points: ["Design sur mesure", "Perfs 95+ Lighthouse", "SEO technique inclus"] },
  ecommerce: { label: "E-commerce",              delai: "2 à 4 semaines", prixDes: null, points: ["Paiement Stripe (Twint, Apple Pay)", "Gestion de stock", "Livraison Suisse"] },
  saas:      { label: "Application SaaS / MVP",  delai: "3 à 8 semaines", prixDes: null, points: ["Auth + base PostgreSQL", "Dashboard", "Déploiement cloud"] },
  refonte:   { label: "Refonte",                 delai: "2 à 5 semaines", prixDes: null, points: ["Audit perf/SEO/UX", "Refonte priorisée par impact", "Comparatif avant/après chiffré"] },
  surmesure: { label: "Sur mesure",              delai: "sur devis",      prixDes: null, points: ["Cadrage technique gratuit", "Devis en 48 h", "Livraison par étapes"] }
};
```

Mapping des chips existantes : *site vitrine pro* → `vitrine`, *vendre en ligne* → `ecommerce`, *MVP / app SaaS* → `saas`, *refaire mon site* → `refonte`, *optimiser vitesse/SEO* → `refonte`, *améliorer conversion* → `refonte`, *projet sur mesure* → `surmesure`.

Pour le **texte libre**, matche par mots-clés (boutique/vendre/stock → ecommerce ; app/dashboard/saas/mvp → saas ; lent/seo/vitesse/refaire → refonte ; etc.). Si rien ne matche clairement → `surmesure`.

`prixDes` est laissé à `null` : je remplirai les fourchettes moi-même. Si `null`, n'affiche pas de prix, montre seulement délai + scope.

### 2.2 — Option LLM (à me proposer, pas à imposer)
Si tu veux des réponses plus naturelles sur le texte libre, propose une montée en gamme via un **endpoint serverless** (Cloudflare Worker / fonction Vercel) qui appelle l'API Claude côté serveur — **jamais de clé API côté client**. Garde le moteur déterministe comme socle de secours (l'agent doit répondre même si l'endpoint tombe). Donne-moi le pour/contre avant d'implémenter.

### 2.3 — Format de réponse
La réponse de l'agent affiche, en moins de 2 s (anime un faux « typing » de ~400 ms pour le ressenti, pas un vrai délai) :
- le **type de projet recommandé** (`label`),
- le **délai estimé**,
- 2-3 **points de scope** (`points`),
- un **CTA « Réserver mon audit »** (voir §3).

---

## 3. Connexion à la prise de RDV

Le CTA de la réponse mène au **même** widget de RDV que le reste du site, et **pré-remplit automatiquement** le champ « Type de projet » avec le `label` détecté par l'agent (réutilise la même logique de pré-remplissage que les CTAs de la section services). Ex : l'agent recommande « E-commerce » → clic → le formulaire ouvre avec « E-commerce » déjà sélectionné.

---

## 4. Identité visuelle & rimes

L'agent devient un **motif récurrent** du site (principe des rimes visuelles) :
- Donne-lui une signature reconnaissable (une forme, un accent couleur `#2563EB` sur l'état actif, une petite « marque » visuelle de l'agent) que tu pourras réutiliser ailleurs (footer, section services, curseur de réponse).
- Les bulles utilisateur prennent l'accent bleu actif ; les réponses de l'agent prennent une surface neutre. Cohérent avec le reste de l'UI, pas un composant venu d'ailleurs.

---

## 5. Système de design appliqué

- **Profondeur subtile** : grain / effet glass léger **derrière l'agent** (et éventuellement le hero), pour le relief — jamais sur les cartes de contenu plus bas. C'est ici qu'on met la « matière visuelle », pas en image de fond décorative.
- **Hiérarchie par opacité** dans la réponse de l'agent : label 100 %, délai/sous-texte 60-70 %, mentions tertiaires 40-50 %.
- **Typographie** : `<h1>` dans la police d'ancrage ; détails techniques de la réponse (délai, type) en **mono** pour appuyer le côté « agence qui code ».

---

## 6. Mobile

- Promesse + `<h1>` d'abord, agent juste en dessous, le tout au-dessus de la ligne de flottaison.
- Chips en scroll horizontal si besoin, champ de saisie confortable au pouce, zone de réponse qui ne fait **pas sauter le scroll** quand elle apparaît (réserve l'espace ou anime en hauteur).

---

## 7. Garde-fous (SEO / perf / a11y)

- `<h1>` + value prop + CTA en HTML rendu, pas seulement en JS.
- Lighthouse 95+ préservé ; agent léger, chargé sans bloquer le first paint.
- Accessible : champ avec `<label>`, chips au clavier (focus visible), réponses annoncées via `aria-live="polite"`, contrastes OK en thème clair et sombre.

---

## 8. Definition of done

- L'agent est **réellement fonctionnel** : chip ou texte libre → reco chiffrée (type + délai + scope) en < 2 s, à 100 % offline grâce au moteur déterministe.
- Le CTA de la réponse ouvre le widget de RDV avec le **type de projet pré-rempli**.
- Le hero reste crawlable (h1/value prop en dur) et Lighthouse ≥ 95.
- L'agent a une identité visuelle réutilisée ailleurs comme rime visuelle.
- Tu m'as présenté la reco « déterministe seul » vs « déterministe + endpoint LLM » avant de choisir, et la config `OFFERS`/`prixDes` est éditable par moi.

Commence par §0 (état de l'agent actuel) + ta reco sur §2.2, puis attends mon feu vert avant le design visuel (§4-5).
