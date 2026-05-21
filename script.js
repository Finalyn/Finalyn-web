(() => {
  'use strict';

  // ---------- Réalisations : popup au clic sur card ----------
  const WORKS = {
    'pasta-mario': {
      img: 'https://picsum.photos/seed/finalyn-pasta-mario/1200/675',
      tag: 'Restaurant',
      title: 'Pasta Mario',
      desc: 'Trattoria italienne à Lausanne. Site vitrine moderne avec carte digitale, galerie photo professionnelle et réservation de table en 2 clics. Intégration Google Maps, SEO local optimisé pour attirer les habitants du quartier.',
      delay: '7 jours',
      stack: 'Vanilla HTML/CSS/JS + Stripe',
      year: '2026',
      link: 'https://pasta-mario.ch',
    },
    'atelier-celeste': {
      img: 'https://picsum.photos/seed/finalyn-atelier-celeste/1200/675',
      tag: 'E-commerce',
      title: 'Atelier Céleste',
      desc: 'Bijouterie indépendante à Genève. Boutique en ligne propre avec catalogue de pièces uniques, paiement Stripe sécurisé, gestion de stock simple et back-office léger pour la créatrice.',
      delay: '3 semaines',
      stack: 'Vanilla + Stripe + Sanity',
      year: '2025',
      link: 'https://atelier-celeste.ch',
    },
    'novia': {
      img: 'https://picsum.photos/seed/finalyn-novia/1200/675',
      tag: 'SaaS / MVP',
      title: 'Novia App',
      desc: 'MVP pour une startup romande, livré à temps pour une démo investisseurs réussie. Authentification, base de données Supabase, dashboard métier, déploiement cloud, le tout en 4 semaines.',
      delay: '4 semaines',
      stack: 'Vue 3 + Supabase + Vercel',
      year: '2025',
      link: 'https://novia-app.ch',
    },
    'solidaria': {
      img: 'https://picsum.photos/seed/finalyn-solidaria/1200/675',
      tag: 'Association',
      title: 'Solidaria',
      desc: 'Association romande d\'aide sociale. Site clair présentant la mission, espace dons sécurisés avec Stripe, formulaire d\'adhésion bénévole et agenda d\'événements à venir.',
      delay: '10 jours',
      stack: 'Vanilla + Stripe',
      year: '2026',
      link: 'https://solidaria.org',
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
      setText('[data-modal-delay]', data.delay);
      setText('[data-modal-stack]', data.stack);
      setText('[data-modal-year]', data.year);
      setAttr('[data-modal-link]', 'href', data.link);

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
})();
