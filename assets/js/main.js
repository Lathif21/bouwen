(function(){
  /* ---------- language toggle ---------- */
  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-en]'));
  nodes.forEach(function(n){ n.setAttribute('data-nl', n.innerHTML); });

  function setLang(lang){
    nodes.forEach(function(n){
      var v = n.getAttribute('data-' + lang);
      if (v !== null) n.innerHTML = v;
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang button').forEach(function(b){
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
  }

  document.querySelectorAll('.lang button').forEach(function(b){
    b.addEventListener('click', function(){ setLang(b.dataset.lang); });
  });

  /* ---------- page routing ---------- */
  var pages = ['home','honden','puppyinfo','werkwijze','gastgezin','media','contact'];

  function show(id){
    if (pages.indexOf(id) === -1) id = 'home';
    pages.forEach(function(p){
      document.getElementById('page-' + p).classList.toggle('active', p === id);
    });
    document.querySelectorAll('nav.primary a').forEach(function(a){
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
    document.getElementById('primary-nav').classList.remove('open');
    document.querySelector('.menu-btn').setAttribute('aria-expanded','false');
    window.scrollTo({top:0, behavior:'instant'});
  }

  function route(){ show((location.hash || '#home').slice(1)); }
  window.addEventListener('hashchange', route);
  route();

  /* ---------- mobile menu ---------- */
  var mb = document.querySelector('.menu-btn');
  mb.addEventListener('click', function(){
    var nav = document.getElementById('primary-nav');
    var open = nav.classList.toggle('open');
    mb.setAttribute('aria-expanded', String(open));
  });

  /* ---------- one orchestrated entrance ---------- */
  requestAnimationFrame(function(){
    document.querySelector('.hero').classList.add('hero-loaded');
  });
})();
