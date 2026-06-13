/* Bandeau de consentement cookies / tracking, finalyn.web (nLPD + RGPD)
   Aucun cookie de mesure/tracking n'est posé tant que l'utilisateur n'a pas accepté.
   Le choix est mémorisé dans localStorage et exposé via window.finalynConsent
   ('all' = mesure acceptée, 'essential' = strictement nécessaire uniquement). */
(function () {
  var KEY = 'finalyn-consent';
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  window.finalynConsent = saved;

  // Hook de mesure d'audience (vide tant qu'aucun backend n'est branché)
  var tracked = false;
  function trackPageview() {
    if (tracked) return;
    tracked = true;
    // Quand un endpoint sera branché, l'ajouter ici :
    // fetch('/api/track', { method:'POST', body: JSON.stringify({ path: location.pathname }) }).catch(function(){});
  }

  function apply(v) {
    window.finalynConsent = v;
    try { document.dispatchEvent(new CustomEvent('finalyn:consent', { detail: v })); } catch (e) {}
    if (v === 'all') trackPageview();
  }

  // Choix déjà fait : on applique et on n'affiche rien.
  if (saved === 'all' || saved === 'essential') { apply(saved); return; }

  var css = ''
    + '.fcc{position:fixed;left:16px;right:16px;bottom:16px;z-index:300;max-width:580px;margin:0 auto;'
    + 'background:#FFFFFF;border:1px solid rgba(15,23,42,0.08);border-radius:18px;padding:20px 22px;'
    + 'box-shadow:0 28px 70px -24px rgba(15,23,42,0.35),0 12px 28px -14px rgba(37,99,235,0.18);'
    + 'font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;'
    + 'opacity:0;transform:translateY(14px);transition:opacity .35s ease,transform .35s ease;}'
    + '.fcc.show{opacity:1;transform:none;}'
    + '.fcc p{margin:0 0 14px;font-size:14px;line-height:1.55;color:#0F0F0F;letter-spacing:-0.005em;}'
    + '.fcc a{color:#2563EB;text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1.5px;font-weight:500;}'
    + '.fcc a:hover{color:#1D4FD8;}'
    + '.fcc-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;}'
    + '.fcc-btn{font-family:inherit;font-size:13.5px;font-weight:600;cursor:pointer;border-radius:999px;padding:10px 18px;border:1.5px solid transparent;transition:background .25s ease,color .25s ease,border-color .25s ease,transform .25s ease,box-shadow .25s ease;letter-spacing:-0.005em;}'
    + '.fcc-accept{background:linear-gradient(135deg,#2563EB 0%,#1D4FD8 100%);color:#FFFFFF;box-shadow:0 8px 20px -6px rgba(37,99,235,0.5);}'
    + '.fcc-accept:hover{transform:translateY(-1px);box-shadow:0 12px 28px -6px rgba(37,99,235,0.6);}'
    + '.fcc-refuse{background:transparent;color:#0F0F0F;border-color:rgba(15,23,42,0.18);}'
    + '.fcc-refuse:hover{border-color:#2563EB;color:#2563EB;}'
    + '@media (max-width:540px){.fcc{left:10px;right:10px;bottom:10px;padding:18px 18px;border-radius:14px;}.fcc-row{flex-direction:column;align-items:stretch;}.fcc-btn{width:100%;}}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Path relatif vers la page de confidentialité — détecte si on est dans un sous-dossier
  var depth = (location.pathname.match(/\/[^/]+/g) || []).length - 1;
  var prefix = depth > 0 ? '../'.repeat(depth) : '';

  var bar = document.createElement('div');
  bar.className = 'fcc';
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-live', 'polite');
  bar.setAttribute('aria-label', 'Consentement aux cookies');
  bar.innerHTML =
    '<p>On utilise uniquement des cookies nécessaires au fonctionnement du site. '
    + 'Avec votre accord, on pourrait aussi mesurer l’audience de façon anonyme pour l’améliorer. '
    + 'Aucune donnée n’est partagée à des fins publicitaires. '
    + '<a href="' + prefix + 'confidentialite.html">En savoir plus</a>.</p>'
    + '<div class="fcc-row">'
    + '<button type="button" class="fcc-btn fcc-accept" data-consent="all">Tout accepter</button>'
    + '<button type="button" class="fcc-btn fcc-refuse" data-consent="essential">Nécessaires uniquement</button>'
    + '</div>';

  function mount() {
    document.body.appendChild(bar);
    requestAnimationFrame(function () { bar.classList.add('show'); });
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);

  bar.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-consent]');
    if (!btn) return;
    var v = btn.getAttribute('data-consent');
    try { localStorage.setItem(KEY, v); } catch (e) {}
    apply(v);
    bar.classList.remove('show');
    setTimeout(function () { if (bar.parentNode) bar.parentNode.removeChild(bar); }, 350);
  });
})();
