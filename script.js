(() => {
  'use strict';

  // ---------- Scroll lock pour modals (overflow hidden — ne déplace pas le body) ----------
  let lockCount = 0;
  let savedPaddingRight = '';
  function lockBodyScroll() {
    if (lockCount === 0) {
      // Compense la largeur de la scrollbar pour éviter le saut de layout
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      savedPaddingRight = document.body.style.paddingRight;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    lockCount++;
  }
  function unlockBodyScroll() {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.paddingRight = savedPaddingRight;
    }
  }

  // ---------- Réalisations : popup au clic sur card ----------
  const WORKS = {
    'max2c4d': {
      img: 'https://finalyn.com/attached_assets/max2c4d-hero.webp',
      tag: 'Plugin 3D',
      title: 'MAX2C4D',
      desc: 'Plugin professionnel de conversion de scènes 3ds Max (Corona & V-Ray) vers Cinema 4D natif. Indispensable aux studios d\'archviz et artistes 3D travaillant entre les deux logiciels. Développement complet du plugin et du site vitrine par Finalyn Studio.',
      type: 'Plugin + Site',
      stack: 'C++ · Python · 3ds Max & C4D SDK',
      year: '2026',
      link: 'https://max2c4d.com',
    },
    'pulci2': {
      img: 'https://finalyn.com/attached_assets/pulci2-after-desktop.webp',
      tag: 'Restaurant',
      title: 'Pulci2',
      desc: 'Refonte complète du site vitrine de Pulci2, restaurant & pizzeria italienne à Rolle. Site multilingue FR/EN/IT, réduction des coûts d\'hébergement et d\'emails.',
      type: 'Refonte',
      stack: 'HTML5 · CSS3 · JS · i18n',
      year: '2026',
      link: 'https://pulci2.ch',
    },
    'townproject': {
      img: 'https://finalyn.com/attached_assets/IMG_5087_1768207285302.webp',
      tag: 'Construction',
      title: 'TownProject',
      desc: 'Site vitrine élégant pour TownProject Sàrl, entreprise suisse de construction et rénovation. Deux gammes présentées : Normal et Signature.',
      type: 'Vitrine',
      stack: 'React · TypeScript · Tailwind · Framer Motion',
      year: '2026',
      link: 'https://townproject.ch',
    },
    'bfc-app': {
      img: 'https://finalyn.com/attached_assets/IMG_1725_1768155846009.webp',
      tag: 'App métier',
      title: 'BFC APP',
      desc: 'Application développée pour BFC Sàrl afin de digitaliser leur processus de commande. Avant : papier, Excel et Word. Maintenant : tout en un clic depuis le smartphone.',
      type: 'PWA',
      stack: 'React · TS · PWA · Node · PostgreSQL',
      year: '2026',
      link: '',
    },
    'arkia': {
      img: 'https://finalyn.com/attached_assets/image_1768065010993.webp',
      tag: 'SaaS / IA',
      title: 'Arkia',
      desc: 'Plateforme SaaS d\'IA générative pour l\'architecture. Du croquis au rendu photoréaliste en quelques secondes. Développement, stratégie et branding par Finalyn.',
      type: 'SaaS',
      stack: 'React · Python · IA générative · GPU Cloud',
      year: '2025',
      link: 'https://arkia.app',
    },
    'brandify': {
      img: 'https://finalyn.com/attached_assets/image_1765189783731.webp',
      tag: 'Outil web',
      title: 'Brandify',
      desc: 'Application web pour ajouter automatiquement votre logo ou filigrane sur vos images. Design, UX/UI et développement par Finalyn.',
      type: 'Outil web',
      stack: 'JS · HTML5 Canvas · Web APIs',
      year: '2025',
      link: '',
    },
    'cityguess': {
      img: 'https://finalyn.com/attached_assets/image_1765190009891.webp',
      tag: 'Jeu en ligne',
      title: 'CityGuess',
      desc: 'Jeu de géographie multijoueur avec duels, défis quotidiens et abonnement premium. Branding, UX/UI et développement par Finalyn.',
      type: 'Jeu',
      stack: 'React · Mapbox · Node · PostgreSQL · Stripe',
      year: '2025',
      link: 'https://cityguess.com',
    },
    'purcheez': {
      img: 'https://finalyn.com/attached_assets/purcheez_hero.webp',
      tag: 'FinTech',
      title: 'Purcheez',
      desc: 'Plateforme de paiement en escrow pour freelances et prestataires. Branding, automatisation, stratégie et développement par Finalyn.',
      type: 'FinTech',
      stack: 'React · Node · TS · PostgreSQL · Stripe',
      year: '2025',
      link: '',
    },
  };

  const workModal = document.querySelector('[data-work-modal]');
  if (workModal && typeof workModal.showModal === 'function') {
    const closeBtn = workModal.querySelector('[data-work-close]');

    const open = (key) => {
      const data = WORKS[key];
      if (!data) {
        console.error('[Réalisations] Pas de data pour la clé:', key);
        return;
      }

      // Re-query à chaque ouverture (plus robuste qu'un cache au module load)
      const setText = (sel, val) => {
        const el = workModal.querySelector(sel);
        if (el) el.textContent = val;
      };
      const setAttr = (sel, attr, val) => {
        const el = workModal.querySelector(sel);
        if (el) el[attr] = val;
      };

      setAttr('[data-modal-img]', 'src', data.img);
      setText('[data-modal-tag]', data.tag);
      setText('[data-modal-title]', data.title);
      setText('[data-modal-desc]', data.desc);
      setText('[data-modal-type]', data.type);
      setText('[data-modal-stack]', data.stack);
      setText('[data-modal-year]', data.year);

      // Cache "Voir le site" si pas de lien live
      const linkEl = workModal.querySelector('[data-modal-link]');
      if (linkEl) {
        if (data.link) {
          linkEl.href = data.link;
          linkEl.style.display = '';
        } else {
          linkEl.style.display = 'none';
        }
      }

      lockBodyScroll();
      workModal.showModal();

      const body = workModal.querySelector('.work-modal__body');
      if (body) body.scrollTop = 0;
      if (closeBtn) requestAnimationFrame(() => closeBtn.focus({ preventScroll: true }));
    };

    // Délégation : un seul listener sur le document, robuste aux clics enfants
    document.addEventListener('click', (e) => {
      const card = e.target.closest('button.work-card[data-work]');
      if (!card) return;
      const key = card.getAttribute('data-work');
      if (key) open(key);
    });

    workModal.addEventListener('close', unlockBodyScroll);
    if (closeBtn) closeBtn.addEventListener('click', () => workModal.close());

    // Click sur le backdrop ferme
    workModal.addEventListener('click', (e) => {
      if (e.target === workModal) workModal.close();
    });
  }

  // ---------- Stats panel : compteurs animés au scroll ----------
  const statspanel = document.querySelector('[data-statspanel]');
  if (statspanel && 'IntersectionObserver' in window) {
    const counters = statspanel.querySelectorAll('[data-count-to]');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animateCount = (el, target, durationMs) => {
      const startTime = performance.now();
      const ease = (t) => 1 - Math.pow(1 - t, 3);
      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        el.textContent = Math.round(ease(progress) * target);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries, obs) => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      counters.forEach((el) => {
        const target = parseInt(el.dataset.countTo, 10) || 0;
        if (reduced) el.textContent = target;
        else animateCount(el, target, 1500);
      });
    }, { threshold: 0.4 });
    io.observe(statspanel);
  }

  // ---------- Arc carousel : 5 dots rotation step-based ----------
  const Carousel = (() => {
    const PCT_X = 0.78;
    const PCT_Y = 0.50;
    const PCT_R = 0.68;

    const TOTAL = 4;
    const STEP_ANGLE = 360 / TOTAL; // 90°
    const PAUSE_MS = 5000;          // pause sur chaque point
    const ROTATE_MS = 600;          // durée de la rotation entre 2 points

    // Mockup scroll : stack [dup-laptop, iPhone, iPad, Mac, laptop].
    // La hauteur du slot est lue dynamiquement depuis le DOM (responsive).
    // À chaque tick : translateY augmente (track shift DOWN) → l'item suivant
    // descend depuis le haut, sens visuel = CCW comme la rotation des dots.
    let mockupH = 620; // valeur courante (mise à jour dans layout())

    let container, svg, circle, dotsGroup, dots, mockup, track;
    let cx = 0, cy = 0, r = 0;
    let cumulativeRotation = 0;
    let mockupStep = 0;
    let intervalId = null;
    let timeoutId = null;

    const getInitialOffset = () => -(TOTAL) * mockupH;
    const getCurrentOffset = () => getInitialOffset() + (mockupStep * mockupH);

    const init = () => {
      container = document.querySelector('[data-carousel]');
      if (!container) return;

      svg       = container.querySelector('[data-carousel-svg]');
      circle    = container.querySelector('[data-carousel-circle]');
      dotsGroup = container.querySelector('[data-carousel-dots]');
      dots      = dotsGroup ? dotsGroup.querySelectorAll('circle') : [];
      mockup    = container.querySelector('[data-carousel-mockup]');
      track     = container.querySelector('[data-carousel-track]');

      if (!svg || !circle || !dotsGroup || dots.length !== TOTAL || !mockup) return;

      layout();
      window.addEventListener('resize', onResize, { passive: true });

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      start();
    };

    const layout = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w === 0 || h === 0) return;

      const leftmostX = w * PCT_X;
      cy = h * PCT_Y;
      const d = w - leftmostX;
      const r_needed = (d * d + cy * cy) / (2 * d);
      r = Math.max(r_needed, h * PCT_R);
      cx = leftmostX + r;

      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('r', r);

      // 5 dots positionnés aux angles 180°, 252°, 324°, 36°, 108°
      dots.forEach((dot, i) => {
        const baseDeg = 180 + i * STEP_ANGLE;
        const rad = baseDeg * Math.PI / 180;
        dot.setAttribute('cx', cx + r * Math.cos(rad));
        dot.setAttribute('cy', cy + r * Math.sin(rad));
      });

      dotsGroup.style.transformOrigin = `${cx}px ${cy}px`;

      // Lecture dynamique des dimensions du mockup (peut changer via CSS media queries)
      const mockupRect = mockup.getBoundingClientRect();
      const mw = mockupRect.width || 680;
      const mh = mockupRect.height || 620;
      mockupH = mh; // stocké pour les calculs de scroll

      // Lecture du gap depuis la CSS variable (--gap)
      const gapStr = getComputedStyle(container.querySelector('.carousel') || container).getPropertyValue('--gap');
      const gap = parseInt(gapStr) || 60;
      const dotR = 15;

      const activeX = cx - r;
      mockup.style.left = `${activeX - dotR - gap - mw}px`;
      mockup.style.top  = `${cy - mh / 2}px`;

      // Resync du track à la position courante (avec la nouvelle hauteur)
      if (track) {
        track.style.transition = 'none';
        track.style.transform = `translateY(${getCurrentOffset()}px)`;
        void track.getBoundingClientRect();
      }
    };

    let resizeTimer = null;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 80);
    };

    const tick = () => {
      const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';
      const transition = `transform ${ROTATE_MS}ms ${easing}`;

      // 1. Rotation du groupe de dots de -72° (CCW)
      cumulativeRotation -= STEP_ANGLE;
      dotsGroup.style.transition = transition;
      dotsGroup.style.transform = `rotate(${cumulativeRotation}deg)`;

      // 2. Scroll du mockup : même durée, même easing, même moment → 100% sync
      mockupStep += 1;
      if (track) {
        track.style.transition = transition;
        track.style.transform = `translateY(${getCurrentOffset()}px)`;
      }

      // 3. Après une révolution complète (TOTAL ticks), reset sans transition
      if (mockupStep >= TOTAL) {
        timeoutId = setTimeout(() => {
          dotsGroup.style.transition = 'none';
          cumulativeRotation = 0;
          dotsGroup.style.transform = 'rotate(0deg)';

          if (track) {
            track.style.transition = 'none';
            mockupStep = 0;
            track.style.transform = `translateY(${getInitialOffset()}px)`;
            void track.getBoundingClientRect();
          }
          void dotsGroup.getBoundingClientRect();
        }, ROTATE_MS + 50);
      }
    };

    const start = () => {
      // Premier tick après PAUSE_MS, puis cycle = PAUSE_MS + ROTATE_MS = 6s
      timeoutId = setTimeout(() => {
        tick();
        intervalId = setInterval(tick, PAUSE_MS + ROTATE_MS);
      }, PAUSE_MS);
    };

    return { init };
  })();

  Carousel.init();

  // ---------- Title word rotator : scroll DESCENDANT, sync avec le carousel ----------
  // Timing identique au Carousel : 5s pause + 600ms transition = 5600ms par cycle
  const ROTATOR_PAUSE_MS = 5000;
  const ROTATOR_TRANSITION_MS = 600;
  const ROTATOR_CYCLE_MS = ROTATOR_PAUSE_MS + ROTATOR_TRANSITION_MS;
  const ROTATOR_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

  const rotator = document.querySelector('[data-title-rotator]');
  if (rotator && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const totalSlots = rotator.children.length; // 5 (4 mots + 1 duplicate en haut)
    const totalUnique = totalSlots - 1;          // 4
    const STEP_EM = 1.2;
    const initialOffset = -(totalUnique) * STEP_EM; // -4.8em : montre le dernier item (= premier mot du cycle)

    // Position initiale : le dernier item (bottom du stack) visible
    rotator.style.transform = `translateY(${initialOffset}em)`;

    let idx = 0;

    const tick = () => {
      idx += 1;
      const offset = initialOffset + (idx * STEP_EM);
      rotator.style.transition = `transform ${ROTATOR_TRANSITION_MS}ms ${ROTATOR_EASING}`;
      rotator.style.transform = `translateY(${offset}em)`;

      // Après TOTAL ticks (atteint le duplicate du premier au top), reset invisible
      if (idx >= totalUnique) {
        setTimeout(() => {
          rotator.style.transition = 'none';
          idx = 0;
          rotator.style.transform = `translateY(${initialOffset}em)`;
          void rotator.offsetWidth;
        }, ROTATOR_TRANSITION_MS + 50);
      }
    };

    // Premier tick à PAUSE_MS (synchro avec le 1er tick du carousel), puis tous les CYCLE_MS
    setTimeout(() => {
      tick();
      setInterval(tick, ROTATOR_CYCLE_MS);
    }, ROTATOR_PAUSE_MS);
  }

  // ---------- Cas d'usage : expand au clic ----------
  const UsecasesData = {
    restaurateur: {
      num: '01',
      title: 'Vous êtes restaurateur',
      lede: 'Vos clients veulent voir votre carte, vos photos, et réserver une table en 2 clics — sans appeler.',
      items: [
        'Carte digitale lisible',
        'Galerie photos pro',
        'Réservation en ligne',
        'SEO local (Google Maps)',
        'Mobile-first',
        'Livraison 7-10 jours',
      ],
    },
    commercant: {
      num: '02',
      title: 'Vous êtes commerçant',
      lede: 'Vous voulez vendre en ligne sans dépendre d\'un abonnement Shopify à rallonge.',
      items: [
        'Catalogue + panier',
        'Paiement Stripe',
        'Gestion de stock',
        'Click & collect local',
        'Tableau de bord ventes',
        'Livraison 2-4 semaines',
      ],
    },
    startup: {
      num: '03',
      title: 'Vous lancez une startup',
      lede: 'Vous avez besoin d\'un MVP rapide pour valider une idée, faire une démo investisseurs, ou tester un marché.',
      items: [
        'MVP fonctionnel',
        'Auth + base de données',
        'Dashboard métier',
        'Déploiement cloud',
        'Itérations rapides',
        'Livraison 3-6 semaines',
      ],
    },
    association: {
      num: '04',
      title: 'Vous êtes une association ou ONG',
      lede: 'Vous voulez communiquer votre mission, collecter des dons, recruter des bénévoles et garder votre communauté informée.',
      items: [
        'Page mission claire',
        'Adhésion en ligne',
        'Dons sécurisés (Stripe)',
        'Agenda d\'événements',
        'Newsletter',
        'Livraison 1-2 semaines',
      ],
    },
    independant: {
      num: '05',
      title: 'Vous êtes indépendant·e',
      lede: 'Votre prochain client vous googlise avant de vous appeler. Un site qui rassure, qui montre votre travail et qui prend les RDV pour vous.',
      items: [
        'Portfolio / réalisations',
        'Page tarifs claire',
        'Prise de RDV en ligne',
        'Témoignages clients',
        'Paiement Stripe',
        'Livraison 7-10 jours',
      ],
    },
    medecin: {
      num: '06',
      title: 'Vous êtes médecin ou cabinet',
      lede: 'Vos patients veulent l\'essentiel : horaires, équipe, accès, prise de RDV. Un site rassurant, conforme et facile à mettre à jour.',
      items: [
        'Présentation équipe',
        'Spécialités & soins',
        'Prise de RDV (Doctolib / OneDoc)',
        'Plan d\'accès & horaires',
        'Conformité données patient',
        'Livraison 10-14 jours',
      ],
    },
    coach: {
      num: '07',
      title: 'Vous êtes coach ou formateur·trice',
      lede: 'Vous voulez vendre vos programmes, capter des leads et automatiser l\'onboarding. Un site qui convertit, pas une simple vitrine.',
      items: [
        'Pages programmes',
        'Témoignages & résultats',
        'Tunnel inscription',
        'Paiement Stripe (one-shot ou abonnement)',
        'Lien plateformes (Teachable, Notion)',
        'Livraison 2-3 semaines',
      ],
    },
  };

  const usecasesArc = document.querySelector('[data-usecases]');
  const usecasesModal = document.querySelector('[data-usecase-modal]');

  if (usecasesArc && usecasesModal && typeof usecasesModal.showModal === 'function') {
    const numEl = usecasesModal.querySelector('[data-panel-num]');
    const titleEl = usecasesModal.querySelector('[data-panel-title]');
    const ledeEl = usecasesModal.querySelector('[data-panel-lede]');
    const listEl = usecasesModal.querySelector('[data-panel-list]');
    const closeBtn = usecasesModal.querySelector('[data-usecase-close]');

    const openCase = (key) => {
      const data = UsecasesData[key];
      if (!data) return;
      numEl.textContent = data.num;
      titleEl.textContent = data.title;
      ledeEl.textContent = data.lede;
      listEl.innerHTML = data.items.map((it) => `<li>${it}</li>`).join('');
      lockBodyScroll();
      usecasesModal.showModal();
      // Reset scroll + focus sur le close pour éviter scroll auto
      const body = usecasesModal.querySelector('.usecases__modal-body');
      if (body) body.scrollTop = 0;
      if (closeBtn) requestAnimationFrame(() => closeBtn.focus({ preventScroll: true }));
    };

    usecasesArc.addEventListener('click', (e) => {
      const card = e.target.closest('[data-usecard]');
      if (!card) return;
      openCase(card.dataset.case);
    });

    usecasesModal.addEventListener('close', unlockBodyScroll);
    if (closeBtn) closeBtn.addEventListener('click', () => usecasesModal.close());

    // Click backdrop ferme
    usecasesModal.addEventListener('click', (e) => {
      const rect = usecasesModal.getBoundingClientRect();
      const inDialog = (
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom
      );
      if (!inDialog) usecasesModal.close();
    });
  }

  // ---------- Cas d'usage : infinite swipe mobile (clones + téléport) ----------
  (() => {
    const arc = document.querySelector('[data-usecases]');
    if (!arc) return;
    const mq = window.matchMedia('(max-width: 880px)');
    if (!mq.matches) return;

    const origCards = Array.from(arc.querySelectorAll('.usecard'));
    const n = origCards.length;
    if (n < 2) return;

    // Triplicate : [originals A][originals B (centre, visible au start)][originals C]
    // Téléport invisible quand l'utilisateur scroll dans A ou C.
    const cloneSet = (suffix) => origCards.map(c => {
      const cl = c.cloneNode(true);
      cl.classList.add('is-clone');
      cl.dataset.cloneSet = suffix;
      return cl;
    });
    cloneSet('before').reverse().forEach(cl => arc.insertBefore(cl, arc.firstChild));
    cloneSet('after').forEach(cl => arc.appendChild(cl));

    const measure = () => {
      const first = arc.querySelector('.usecard');
      if (!first) return null;
      const cardW = first.offsetWidth;
      const gap = parseFloat(getComputedStyle(arc).gap) || 0;
      return { itemSize: cardW + gap, sectionWidth: n * (cardW + gap) };
    };

    // Centre le scroll sur la 1ère carte du set du milieu
    const center = () => {
      const m = measure();
      if (!m) return;
      arc.scrollLeft = m.sectionWidth;
    };
    center();
    // Re-centre après que les images aient chargé (changement de largeur possible)
    window.addEventListener('load', center, { once: true });

    let isAdjusting = false;
    let timer = null;
    arc.addEventListener('scroll', () => {
      if (isAdjusting) return;
      if (timer) clearTimeout(timer);
      // Attend la fin du momentum scroll avant de téléporter
      timer = setTimeout(() => {
        const m = measure();
        if (!m) return;
        const sl = arc.scrollLeft;
        if (sl < m.sectionWidth * 0.5) {
          isAdjusting = true;
          arc.scrollLeft = sl + m.sectionWidth;
          requestAnimationFrame(() => { isAdjusting = false; });
        } else if (sl > m.sectionWidth * 2.5) {
          isAdjusting = true;
          arc.scrollLeft = sl - m.sectionWidth;
          requestAnimationFrame(() => { isAdjusting = false; });
        }
      }, 80);
    }, { passive: true });
  })();

  // ---------- Hero prompt form ----------
  const form = document.querySelector('[data-hero-form]');
  const input = document.querySelector('[data-hero-input]');

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        input.focus();
        input.reportValidity?.();
        return;
      }
      const subject = encodeURIComponent('Demande de visuel offert — Finalyn.Web');
      const body = encodeURIComponent(
        `Bonjour Finalyn,\n\nJe souhaite recevoir le premier visuel offert de mon site.\n\nMon email : ${email}\n\nMerci !`
      );
      window.location.href = `mailto:contact@finalyn.com?subject=${subject}&body=${body}`;
    });
  }

  // ---------- Devshow : slider auto-rotation mockups (mobile) ----------
  const devshow = document.querySelector('[data-devshow]');
  if (devshow) {
    const track = devshow.querySelector('[data-devshow-track]');
    const dots = devshow.querySelectorAll('[data-devshow-dots] .devshow__dot');
    const slides = track ? track.children.length : 0;
    if (track && slides > 0 && dots.length === slides) {
      let idx = 0;
      const SLIDE_MS = 2000;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const goTo = (i) => {
        idx = (i + slides) % slides;
        track.style.transform = `translateX(-${idx * 25}%)`;
        dots.forEach((d, j) => d.classList.toggle('is-active', j === idx));
      };

      // Démarre l'auto-rotation seulement si la section est visible (mobile) et anim non bloquée
      const startAuto = () => {
        if (reduced) return;
        return setInterval(() => goTo(idx + 1), SLIDE_MS);
      };

      let timer = null;
      const mq = window.matchMedia('(max-width: 880px)');
      const sync = () => {
        if (timer) { clearInterval(timer); timer = null; }
        if (mq.matches) timer = startAuto();
      };
      sync();
      mq.addEventListener ? mq.addEventListener('change', sync) : mq.addListener(sync);
    }
  }

  // ---------- Calendrier custom (audit gratuit) ----------
  function initCalendar(root) {
    if (!root) return;
    const grid     = root.querySelector('.cal-grid');
    const monthEl  = root.querySelector('.cal-month');
    const prevBtn  = root.querySelector('.cal-arrow[data-dir="-1"]');
    const nextBtn  = root.querySelector('.cal-arrow[data-dir="1"]');
    const slotsBox = root.querySelector('.cal-slots');
    const slotList = root.querySelector('.cal-slots-list');
    const ctaBtn   = root.querySelector('.cal-cta:not(.cal-cta-final)');
    const ctaLabel = ctaBtn ? ctaBtn.querySelector('.cal-cta-label') : null;
    if (!grid || !monthEl || !prevBtn || !nextBtn || !slotsBox || !slotList || !ctaBtn || !ctaLabel) return;

    const formEl       = root.querySelector('.cal-form');
    const formRecap    = root.querySelector('.cal-form-recap');
    const formBack     = root.querySelector('.cal-form-back');
    const firstName    = root.querySelector('input[name="firstname"]');
    const lastName     = root.querySelector('input[name="lastname"]');
    const emailInput   = root.querySelector('input[name="email"]');
    const typeInput   = root.querySelector('select[name="type"]');
    const successRecap = root.querySelector('.cal-success p:not(.cal-success-note)');

    const monthNames = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    const dayShort   = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];

    const today = new Date(); today.setHours(0, 0, 0, 0);
    let view = new Date(today.getFullYear(), today.getMonth(), 1);
    let selectedDay = null;
    let selectedSlot = null;

    function render() {
      grid.innerHTML = '';
      monthEl.textContent = monthNames[view.getMonth()] + ' ' + view.getFullYear();
      const year = view.getFullYear(), month = view.getMonth();
      const first = new Date(year, month, 1);
      const last = new Date(year, month + 1, 0);
      const startCol = (first.getDay() + 6) % 7;
      for (let i = 0; i < startCol; i++) {
        const blank = document.createElement('span');
        blank.className = 'cal-day cal-day-blank';
        grid.appendChild(blank);
      }
      for (let d = 1; d <= last.getDate(); d++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cal-day';
        btn.textContent = d;
        const date = new Date(year, month, d);
        const dow = date.getDay();
        const isWeekend = (dow === 0 || dow === 6);
        const isPast = date < today;
        if (isPast || isWeekend) { btn.disabled = true; btn.classList.add('cal-day-disabled'); }
        if (date.getTime() === today.getTime()) btn.classList.add('cal-day-today');
        if (selectedDay && date.getTime() === selectedDay.getTime()) btn.classList.add('cal-day-selected');
        btn.addEventListener('click', () => pickDay(date));
        grid.appendChild(btn);
      }
      const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      prevBtn.disabled = (view.getTime() <= thisMonth.getTime());
    }

    function pickDay(d) {
      selectedDay = d; selectedSlot = null;
      slotList.querySelectorAll('.cal-slot').forEach((s) => s.classList.remove('is-selected'));
      slotsBox.classList.add('is-open');
      render();
      updateCta();
    }

    function pickSlot(btn) {
      slotList.querySelectorAll('.cal-slot').forEach((s) => s.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedSlot = btn.getAttribute('data-time');
      updateCta();
    }

    function updateCta() {
      if (selectedDay && selectedSlot) {
        ctaBtn.disabled = false;
        const d = selectedDay;
        const label = dayShort[d.getDay()] + ' ' + d.getDate() + ' ' + monthNames[d.getMonth()].toLowerCase() + ' · ' + selectedSlot;
        ctaLabel.textContent = 'Confirmer · ' + label;
      } else if (selectedDay) {
        ctaBtn.disabled = true; ctaLabel.textContent = 'Choisissez un créneau';
      } else {
        ctaBtn.disabled = true; ctaLabel.textContent = 'Sélectionnez un jour';
      }
    }

    function formatRecap() {
      if (!selectedDay) return '';
      return dayShort[selectedDay.getDay()] + ' ' + selectedDay.getDate() + ' ' + monthNames[selectedDay.getMonth()].toLowerCase() + ' · ' + selectedSlot;
    }

    function formatRecapFull() {
      if (!selectedDay) return '';
      const d = selectedDay;
      const dayName = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'][d.getDay()];
      return `${dayName} ${d.getDate()} ${monthNames[d.getMonth()].toLowerCase()} ${d.getFullYear()} à ${selectedSlot} (heure de Zurich)`;
    }

    prevBtn.addEventListener('click', () => {
      view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
      const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      if (view < thisMonth) view = thisMonth;
      render();
    });
    nextBtn.addEventListener('click', () => {
      view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
      render();
    });
    slotList.querySelectorAll('.cal-slot').forEach((s) => {
      s.addEventListener('click', () => pickSlot(s));
    });

    ctaBtn.addEventListener('click', () => {
      if (ctaBtn.disabled || !selectedDay || !selectedSlot) return;
      if (formRecap) formRecap.textContent = 'Visio · ' + formatRecap() + ' (30 min)';
      root.classList.add('is-form');
      if (firstName) setTimeout(() => firstName.focus(), 250);
    });

    if (formBack) {
      formBack.addEventListener('click', () => root.classList.remove('is-form'));
    }

    if (formEl) {
      formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const fn = firstName.value.trim();
        const ln = lastName.value.trim();
        const em = emailInput.value.trim();
        const tp = typeInput.value.trim();
        if (!fn || !ln || !em || !tp) return;

        // Construit le mailto: avec tous les détails de la réservation
        const subject = encodeURIComponent(`Audit gratuit · ${tp} · ${formatRecap()}`);
        const body = encodeURIComponent(
          `Bonjour Finalyn,\n\n` +
          `Je souhaite réserver un audit gratuit (30 min en visio).\n\n` +
          `Créneau souhaité : ${formatRecapFull()}\n\n` +
          `Prénom : ${fn}\n` +
          `Nom : ${ln}\n` +
          `Email : ${em}\n` +
          `Type de projet : ${tp}\n\n` +
          `Merci de confirmer la disponibilité et envoyer le lien visio.\n\n` +
          `Bien cordialement,\n${fn} ${ln}`
        );
        window.location.href = `mailto:contact@finalyn.com?subject=${subject}&body=${body}`;

        // Affiche l'écran de succès
        if (successRecap) {
          successRecap.textContent = `${fn}, votre demande pour le ${formatRecap()} est prête.`;
        }
        root.classList.remove('is-form');
        root.classList.add('is-done');
      });
    }

    render();
  }

  document.querySelectorAll('[data-cal]').forEach(initCalendar);

  // ---------- Burger menu mobile ----------
  (() => {
    const burger = document.querySelector('[data-burger]');
    const panel = document.querySelector('[data-nav-panel]');
    const backdrop = document.querySelector('[data-burger-backdrop]');
    const closeBtn = document.querySelector('[data-burger-close]');
    const links = document.querySelectorAll('[data-burger-link]');
    if (!burger || !panel || !backdrop) return;

    const open = () => {
      panel.classList.add('is-open');
      backdrop.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      panel.setAttribute('aria-hidden', 'false');
      lockBodyScroll();
    };
    const close = () => {
      panel.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      panel.setAttribute('aria-hidden', 'true');
      unlockBodyScroll();
    };

    burger.addEventListener('click', () => {
      if (panel.classList.contains('is-open')) close();
      else open();
    });
    backdrop.addEventListener('click', close);
    if (closeBtn) closeBtn.addEventListener('click', close);
    links.forEach(a => a.addEventListener('click', () => {
      // Laisse le scroll vers l'ancre se faire, puis ferme
      setTimeout(close, 60);
    }));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) close();
    });
  })();

  // ---------- Services accordion CTA → pré-remplit le type + scroll vers l'audit ----------
  document.addEventListener('click', (e) => {
    const cta = e.target.closest('[data-service-cta]');
    if (!cta) return;
    e.preventDefault();
    const type = cta.getAttribute('data-service-cta');
    const audit = document.querySelector('#audit');
    const select = document.querySelector('select[name="type"]');
    if (select && type) {
      const opt = Array.from(select.options).find(o => o.value === type);
      if (opt) select.value = type;
      // Reset l'état du calendrier au cas où il était déjà en succès/form
      const cal = document.querySelector('[data-cal]');
      if (cal) { cal.classList.remove('is-form', 'is-done'); }
    }
    if (audit) {
      audit.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
})();
