(function () {
  var CFG = window.BEXTIP_CONFIG, I18N = window.BEXTIP_I18N;
  var ASSET_V = "20261111a";   // wersja w adresach ikon – podbij razem z ?v= w index.html, gdy zmieni się plik ikony
  var lang = "pl";

  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, I18N[lang]);
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  // tekst z i18n.js, w którym **…** to pogrubienie (lista „W każdym pakiecie”)
  function rich(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); }
  function money(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  function $(id) { return document.getElementById(id); }
  // przycisk ze strzałką na końcu (złota strzałka w granatowym kółku – .btn__icon w styles.css), jak na eqrento.com
  var ARROW = '<span class="btn__icon" aria-hidden="true"></span>';

  // Cennik: pakiety z limitem graczy jako małe kafelki w rzędzie, pakiet bez limitu pod nimi na całą szerokość
  function renderPlans() {
    var t = get("pricing");
    function button(p, cls) {
      var name = t.names[p.id];
      var mail = "mailto:" + CFG.contactEmail + "?subject=" + encodeURIComponent(t.orderSubject + " – " + name);
      var href = p.stripe || mail;
      var label = p.stripe ? t.buy : (p.stripe === null ? t.ask : t.order);
      var ext = p.stripe ? ' target="_blank" rel="noopener"' : "";
      return '<p class="tier__cta"><a class="btn btn--arrow ' + cls + '" href="' + esc(href) + '"' + ext + "><span>" +
        esc(label) + "</span>" + ARROW + "</a></p>";
    }
    function per(lines) {
      return '<span class="tier__per"><span>' + esc(lines[0]) + "</span><span>" + esc(lines[1]) + "</span></span>";
    }
    var tiers = CFG.plans.filter(function (p) { return p.players; });
    var wide = CFG.plans.filter(function (p) { return !p.players; });
    $("planGrid").innerHTML =
      '<ul class="tiers">' + tiers.map(function (p) {
        return '<li class="tier' + (p.recommended ? " tier--hero" : "") + '">' +
          (p.recommended ? '<span class="tag tier__badge">' + esc(t.recommended) + "</span>" : "") +
          '<h3 class="tier__name">' + esc(t.names[p.id]) + "</h3>" +
          '<p class="tier__price"><b>' + money(p.price) + " zł</b>" + per(t.per) + "</p>" +
          '<ul class="tier__limits"><li>' + esc(t.upTo).replace("{n}", "<b>" + p.players + "</b>") + "</li>" +
          "<li>" + esc(t.allFeatures) + "</li></ul>" +
          button(p, "btn--primary") + "</li>";
      }).join("") + "</ul>" +
      wide.map(function (p) {
        var pp = String(p.perPlayer).replace(".", lang === "pl" ? "," : ".");
        return '<div class="tier tier--wide">' +
          '<div><h3 class="tier__name">' + esc(t.names[p.id]) + "</h3>" +
          '<p class="tier__desc">' + esc(t.unlimitedDesc) + "</p></div>" +
          '<p class="tier__price"><b>' + money(p.price) + " zł</b>" +
          per([t.unlimitedPer[0].replace("{p}", pp), t.unlimitedPer[1]]) + "</p>" +
          button(p, "btn--ghost") + "</div>";
      }).join("");
    $("includedList").innerHTML = t.included.map(function (x) { return "<li>" + rich(x) + "</li>"; }).join("");
  }

  function render() {
    document.documentElement.lang = lang;
    document.title = get("meta.title");
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = get(el.dataset.i18n) || ""; });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var parts = el.dataset.i18nAttr.split(":");
      el.setAttribute(parts[0], get(parts[1]));
    });
    document.querySelectorAll("[data-i18n-list]").forEach(function (el) {
      el.innerHTML = get(el.dataset.i18nList).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    });
    $("featureGrid").innerHTML = get("features.items").map(function (f) {
      return '<article class="card feature"><div class="ico">' + f.ico + "</div><h3>" + esc(f.t) + "</h3><p>" + esc(f.d) + "</p></article>";
    }).join("");
    $("stepList").innerHTML = get("how.steps").map(function (s) {
      return "<li><h3>" + esc(s.t) + "</h3><p>" + esc(s.d) + "</p></li>";
    }).join("");
    // „Dla kogo”: mała biała ikona na niebieskim kafelku obok tekstu, jak w sekcji „One platform” na eqrento.com
    // (assets/icons/, pole icon w i18n.js)
    $("whoGrid").innerHTML = get("who.items").map(function (w) {
      return '<article class="card who"><span class="who__icon"><img src="assets/icons/' + esc(w.icon) + "?v=" + ASSET_V +
        '" alt="" width="24" height="24"></span><h3>' + esc(w.t) + "</h3><p>" + esc(w.d) + "</p></article>";
    }).join("");
    // FAQ w dwóch kolumnach: pierwsza połowa pytań w lewej, reszta w prawej (otwarcie pytania nie przesuwa drugiej
    // kolumny); na węższych ekranach kolumny stoją jedna pod drugą, więc kolejność zostaje ta sama
    var faq = get("faq.items"), half = Math.ceil(faq.length / 2);
    function qa(f) { return "<details><summary>" + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>"; }
    $("faqList").innerHTML = '<div class="faq__col">' + faq.slice(0, half).map(qa).join("") + "</div>" +
      '<div class="faq__col">' + faq.slice(half).map(qa).join("") + "</div>";
    renderPlans();
    // wybrany język na liście w stopce
    document.querySelectorAll("[data-lang]").forEach(function (b) { b.setAttribute("aria-current", b.dataset.lang === lang ? "true" : "false"); });
    spy();
  }

  function setLang(l, save) {
    lang = I18N[l] ? l : "en";
    if (save) { try { localStorage.setItem("bextip-lang", lang); } catch (e) {} }
    render();
  }

  // Wybór języka w stopce (Łukasz, 10.11.2026): flaga i nazwa w danym języku; tylko języki z languages w config.js,
  // które mają teksty w i18n.js
  var LANGS = CFG.languages.filter(function (l) { return I18N[l.code]; });
  $("langList").innerHTML = LANGS.map(function (l) {
    return '<li><button type="button" class="footer__lang" data-lang="' + l.code + '" lang="' + l.code + '">' +
      '<img src="assets/flags/' + l.flag + '.svg" alt="" width="18" height="13"><span>' + esc(l.name) + "</span></button></li>";
  }).join("");

  // Start: ?lang=en → zapamiętany wybór w stopce → przeglądarka po polsku: wersja polska, każda inna: angielska
  // (Łukasz, 10.11.2026)
  var saved = null;
  try { saved = localStorage.getItem("bextip-lang"); } catch (e) {}
  var q = new URLSearchParams(location.search).get("lang");
  var primary = String((navigator.languages && navigator.languages[0]) || navigator.language || "").toLowerCase();
  var browser = primary.indexOf("pl") === 0 ? "pl" : "en";

  document.querySelectorAll('[data-href="app"]').forEach(function (a) { a.href = CFG.appUrl; });
  document.querySelectorAll('[data-href="register"]').forEach(function (a) { a.href = CFG.registerUrl; });
  document.querySelectorAll('[data-href="mail"]').forEach(function (a) { a.href = "mailto:" + CFG.contactEmail; });
  document.querySelectorAll('[data-href="tel"]').forEach(function (a) { a.href = "tel:" + CFG.phone.replace(/\s/g, ""); a.textContent = CFG.phone; });
  document.querySelectorAll("[data-lang]").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.lang, true); });
  });
  $("burger").addEventListener("click", function () {
    var open = $("navLinks").classList.toggle("is-open");
    this.setAttribute("aria-expanded", open);
  });
  $("navLinks").addEventListener("click", function () { this.classList.remove("is-open"); });
  $("year").textContent = new Date().getFullYear();

  // menu: po przewinięciu strony w dół – cień i linia pod spodem (rozmycie tła daje CSS: backdrop-filter)
  // oraz podkreślenie sekcji, którą właśnie widać (złota linia, .is-active – jak na eqrento.com)
  var nav = document.querySelector(".nav");
  var spyLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
  var spySections = spyLinks.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  function spy() {
    var line = nav.offsetHeight + window.innerHeight * 0.3, active = -1;
    spySections.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= line) active = i; });
    // na samym dole strony: ostatni link (FAQ jest niższe niż ekran pod nim)
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) active = spySections.length - 1;
    spyLinks.forEach(function (a, i) { a.classList.toggle("is-active", i === active); });
  }
  var ticking = false;
  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 4);
    if (!ticking) { ticking = true; window.requestAnimationFrame(function () { ticking = false; spy(); }); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", spy);
  onScroll();

  setLang(q || saved || browser, false);
})();
