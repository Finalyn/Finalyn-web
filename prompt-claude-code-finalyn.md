# Mission — Refonte UI/UX du site Finalyn (duplicata)

Tu travailles sur une **copie** du site Finalyn (la version actuelle de `finalyn.github.io/Finalyn-web`). Ton job : appliquer une série d'améliorations UI/UX, corriger des bugs et faire évoluer la structure des sections, en gardant le site rapide, propre et cohérent avec son positionnement « agence digitale suisse, IA-native, livraison en 5-10 jours ».

---

## 0. Avant de toucher à quoi que ce soit

1. **Explore le repo** et identifie la stack réelle (HTML/CSS/JS statique ? Next.js ? un framework de carousel ? une lib d'animation ?). Liste-moi les fichiers clés (hero, section services, réalisations, prise de RDV, l'agent) avant de modifier.
2. **Travaille par étapes**, une zone à la fois. Après chaque bloc de modifs, fais un récap court de ce que tu as changé.
3. **Ne régresse pas** : préserve le SEO existant (meta, structured data, sitemap, balises OG), la performance (objectif Lighthouse 95+, ne charge pas de grosses libs inutiles) et l'accessibilité de base (contrastes, focus, aria sur les composants interactifs).
4. Quand un choix est **esthétique et ouvert** (hero, identité de l'agent), propose-moi **2-3 directions vraiment différentes** avant de trancher — pas des micro-variantes.

---

## 1. Bugs & cohérence (priorité haute)

**1.1 — Hero, mots qui défilent**
Le mot « E-commerce » apparaît **deux fois** dans la rotation (`E-commerce. Page Web. Application. SaaS. E-commerce.`). Dédoublonne et vérifie l'ordre.

**1.2 — Funnel de réservation incohérent**
Aujourd'hui les CTAs sont éclatés : certains font `mailto:`, d'autres pointent vers `#audit`, et le widget de réservation (sélecteur de jour + créneaux 08:00→17:00) **finit en mailto** (« votre client mail s'est ouvert »).
- Unifie **toutes** les actions de conversion vers **une seule destination** : le widget de prise de RDV.
- Le CTA principal du hero (« Planifier un appel ») doit **scroller vers le widget**, pas ouvrir un mail.
- Décision à me proposer : soit on branche un **vrai système de réservation** (Cal.com / Calendly embarqué) pour que l'UI tienne sa promesse, soit on assume le mail mais on **simplifie l'UI** pour ne plus afficher un faux calendrier. Donne-moi le pour/contre des deux et ta reco.

**1.3 — Pop-up qui décale le scroll (mobile)**
Quand on ouvre le pop-up d'une carte, la page **remonte vers le haut**. Le pop-up doit s'ouvrir **sans modifier la position de scroll** : la page reste exactement là où elle était (gère le scroll-lock proprement, sans reset de `scrollTop`).

---

## 2. Comportements interactifs

**2.1 — Carrousel « Réalisations » : swipe infini (mobile)**
Rendre le défilement des cartes **infini et bidirectionnel** : on doit pouvoir glisser de gauche à droite **et** de droite à gauche en boucle, sans butée.

**2.2 — « Réalisations » : proportions (desktop)**
Sur desktop, tout rentre mais c'est **trop serré**. Réduis légèrement la taille des cartes pour aérer la mise en page (plus de respiration, marges/gaps revus). Garde la lisibilité des labels Type / Stack / Année.

**2.3 — Section « Ce que nous concevons pour vous » : accordéon**
- Au clic sur un service, le bloc se **déplie** et affiche l'explication détaillée + la liste de points.
- **Un seul panneau ouvert à la fois** : ouvrir un service referme automatiquement les autres.
- Chaque panneau déplié contient un CTA **« Prendre rendez-vous »**.

**2.4 — Formulaire de RDV pré-rempli selon le contexte**
- Tous les CTAs de service mènent vers **le même** formulaire de RDV.
- Au clic depuis un service, le champ **« Type de projet » se pré-remplit automatiquement** à partir de la **liste figée existante** (Site vitrine, E-commerce, Application SaaS / MVP, Refonte, Sur mesure, Autre).
- Ex : panneau « Site vitrine » ouvert → clic sur le CTA → le formulaire ouvre avec « Site vitrine » déjà sélectionné.

---

## 3. Structure des sections

**3.1 — Supprimer / fusionner « Votre site 100% adapté aux écrans »**
Le responsive est un acquis en 2026, pas un argument de vente. Soit tu **coupes** cette section, soit tu la réduis à **une ligne** intégrée dans l'avant/après. La page est longue (~11 sections), on allège.

**3.2 — Ajouter : preuve sociale (manque critique)**
Aucun témoignage / chiffre client / logo aujourd'hui. Ajoute une section **témoignages** : 2-3 citations clientes courtes avec, si possible, un **résultat chiffré** (ex. « +X% de demandes »). Place-la après les réalisations ou juste avant la prise de RDV. Prévois une structure de données simple pour que je remplisse facilement les contenus réels.

**3.3 — Ajouter : process en 3-4 étapes**
Crée une mini-timeline qui crédibilise la promesse « 5-10 jours » : **Brief → Design → Dev → Live** (ou équivalent). Visuel simple, horizontal sur desktop, vertical sur mobile.

**3.4 — Optionnel (à me proposer) : fourchettes de prix**
Le positionnement insiste sur « prix CHF fixe transparent » mais aucun prix n'apparaît. Propose une façon d'afficher un « à partir de X CHF » par service, discrète, qui qualifie les leads sans casser le côté premium. Ne l'implémente que si je valide.

---

## 4. Élément star — l'agent IA

C'est le plus gros levier du site. L'**agent qui qualifie le besoin et donne une recommandation chiffrée en quelques secondes** est ce qui différencie Finalyn (positionnement IA-native). Aujourd'hui il est sous-exploité.
- **Élève-le visuellement** : fais-en le point focal du haut de page, avec une identité graphique forte et reconnaissable.
- Vérifie / assure qu'il est **réellement fonctionnel** (une promesse « réponse en 2 secondes » qui ne répond pas détruit la confiance). S'il est statique, signale-le-moi et propose une vraie implémentation.
- Son identité visuelle doit devenir un **motif récurrent** (voir §5 rimes visuelles).

---

## 5. Système de design (garde-fous transverses)

Applique ces principes sur **toutes** les sections que tu touches :

- **Typographie** : une police d'**ancrage** forte et distinctive pour les titres + 1-2 polices neutres contrastantes pour le corps, créant une tension visuelle (ex. grotesque suisse expressive type Söhne/Neue Haas + Inter en corps ; ou serif moderne à caractère en headlines + sans géométrique en corps). Utilise du **mono** sur les détails techniques (délais, Type/Stack/Année des réalisations) pour appuyer le côté « agence qui code ». Propose-moi 2-3 paires avant de figer.
- **Rimes visuelles** : définis **2-3 motifs récurrents** (une forme/courbe signature, le bleu actif `#2563EB`, une icône ou un dégradé) et répète-les subtilement entre sections pour la cohérence. L'identité de l'agent (§4) est un bon porteur de ces rimes.
- **Profondeur subtile** : grain / effet glass / texture en **arrière-plan** du hero et de l'agent pour donner du relief — **jamais** sur les cartes de contenu, pour que l'agent reste la vedette.
- **Hiérarchie par opacité** : guide l'œil par l'opacité plutôt que par la couleur. Titres 100 %, sous-titres 60-70 %, texte tertiaire (« Délai : », détails) 40-50 %. Applique-le en priorité à la section services, aujourd'hui trop dense.
- **Itération radicale** : pour le couple **hero + agent** (l'écran qui décide si le visiteur reste), produis **2-3 variations franchement différentes** et présente-les-moi côte à côte avant que je choisisse une direction.

---

## 6. Definition of done

- Plus aucun `mailto` orphelin : toutes les conversions passent par le widget de RDV unifié.
- Hero sans doublon, CTA principal qui scrolle vers le widget.
- Pop-up mobile : zéro saut de scroll.
- Carrousel mobile infini bidirectionnel ; cartes desktop aérées.
- Accordéon services : un seul panneau ouvert, CTA dans chaque panneau, pré-remplissage du type de projet fonctionnel.
- Section responsive supprimée/fusionnée ; section témoignages + process ajoutées.
- Lighthouse toujours 95+, SEO/structured data préservés.
- Tu m'as présenté 2-3 directions hero/agent et les paires typographiques avant de figer le design.

Commence par l'étape 0 (exploration du repo + reco sur le funnel de réservation §1.2), puis attends mon feu vert avant d'attaquer le design visuel (§4-5).
