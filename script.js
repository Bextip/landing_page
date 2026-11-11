(function () {
  var CFG = window.BEXTIP_CONFIG, I18N = window.BEXTIP_I18N;
  var ASSET_V = "20261111k";   // wersja w adresach ikon – podbij razem z ?v= w index.html, gdy zmieni się plik ikony
  var lang = "pl";
  var billing = "year";   // okres płatności w cenniku: "year" (domyślnie) albo "month" – przełącznik nad kafelkami

  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, I18N[lang]);
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  // tekst z i18n.js, w którym **…** to pogrubienie (lista „W każdym pakiecie”)
  function rich(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); }
  // kwota w walucie: pln → „1 990 zł”, „4,13 zł”; eur → „€1,199”, „€0.99” (spacje nierozdzielające, żeby kwota
  // nie łamała się między wierszami)
  function money(n, cur) {
    var parts = (Math.round(n * 100) / 100).toFixed(n % 1 ? 2 : 0).split(".");
    var whole = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, cur === "pln" ? " " : ","), dec = parts[1];
    return cur === "pln" ? whole + (dec ? "," + dec : "") + " zł" : "€" + whole + (dec ? "." + dec : "");
  }
  function $(id) { return document.getElementById(id); }
  // przycisk ze strzałką na końcu (złota strzałka w granatowym kółku – .btn__icon w styles.css), jak na eqrento.com
  var ARROW = '<span class="btn__icon" aria-hidden="true"></span>';

  // Cennik (nowa strategia cenowa – Łukasz, 11.11.2026): pakiety z limitem graczy jako małe kafelki w rzędzie,
  // Enterprise pod nimi na całą szerokość. Ceny z config.js w walucie języka (PL: złote, pozostałe: euro), za rok albo
  // za miesiąc – wg przełącznika nad kafelkami (billing). Przy płatności rocznej pod ceną: cena za gracza miesięcznie,
  // przy miesięcznej: ile kosztuje rok.
  function renderPlans() {
    var t = get("pricing"), cur = CFG.currencyByLang[lang] || "eur", yearly = billing === "year";
    function amount(text, n) { return esc(text).replace("{p}", "<b>" + money(n, cur) + "</b>"); }
    function button(p, cls) {
      var name = t.names[p.id], link = (p.stripe && p.stripe[cur] && p.stripe[cur][billing]) || "";
      var subject = t.orderSubject + " – " + name + " – " + t.billing[billing] + " (" + cur.toUpperCase() + ")";
      var href = link || "mailto:" + CFG.contactEmail + "?subject=" + encodeURIComponent(subject);
      var label = link ? t.buy : (p.players ? t.order : t.ask);
      var ext = link ? ' target="_blank" rel="noopener"' : "";
      return '<p class="tier__cta"><a class="btn btn--arrow ' + cls + '" href="' + esc(href) + '"' + ext + "><span>" +
        esc(label) + "</span>" + ARROW + "</a></p>";
    }
    // cena i obok niej „netto” nad „za rok” / „za miesiąc”; Enterprise z małym „od” przed kwotą
    function price(p) {
      var n = money(p[cur][billing], cur);
      return '<p class="tier__price"><b>' + (p.players ? n : '<span class="tier__from">' + esc(t.from) + "</span> " + n) + "</b>" +
        '<span class="tier__per"><span>' + esc(t.net) + "</span><span>" + esc(yearly ? t.perYear : t.perMonth) + "</span></span></p>";
    }
    var tiers = CFG.plans.filter(function (p) { return p.players; });
    var wide = CFG.plans.filter(function (p) { return !p.players; });
    var maxPlayers = Math.max.apply(null, tiers.map(function (p) { return p.players; }));
    $("planGrid").innerHTML =
      '<ul class="tiers">' + tiers.map(function (p) {
        return '<li class="tier' + (p.recommended ? " tier--hero" : "") + '">' +
          (p.recommended ? '<span class="tag tier__badge">' + esc(t.recommended) + "</span>" : "") +
          '<h3 class="tier__name">' + esc(t.names[p.id]) + "</h3>" + price(p) +
          '<p class="tier__pp">' + (yearly ? amount(t.perPlayer, p[cur].perPlayer) : amount(t.orYear, p[cur].year)) + "</p>" +
          '<ul class="tier__limits">' +
          "<li>" + esc(t.upTo).replace("{n}", "<b>" + p.players + "</b>") + "</li>" +
          "<li>" + esc(t.soft).replace("{pct}", Math.round(CFG.softLimit * 100)).replace("{n}", Math.round(p.players * CFG.softLimit)) + "</li>" +
          "<li>" + esc(t.allFeatures) + "</li></ul>" +
          button(p, "btn--primary") + "</li>";
      }).join("") + "</ul>" +
      wide.map(function (p) {
        return '<div class="tier tier--wide">' +
          '<div><h3 class="tier__name">' + esc(t.names[p.id]) + "</h3>" +
          '<ul class="tier__limits tier__limits--row"><li>' + esc(t.over).replace("{n}", "<b>" + maxPlayers + "</b>") + "</li>" +
          "<li>" + esc(t.allFeatures) + "</li></ul></div>" +
          '<div class="tier__pricebox">' + price(p) + '<p class="tier__pp">' + esc(t.custom) + "</p></div>" +
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
    fitBadge();
  }

  // Etykieta nad hasłem ma wymiary dużego przycisku „Wybierz pakiet” i zawsze stoi w jednej linii (Łukasz, 11.11.2026).
  // Gdy się nie mieści (wąski telefon, dłuższy tekst EN), etykieta i duże przyciski zmniejszają się razem: --fit na <html>
  // (1 = pełny rozmiar) mnoży w CSS czcionkę i odstępy. Przyciski najwyżej do 14px, dalej już tylko etykieta (--fit-pill).
  // Kropka i ramki się nie zmieniają, więc nie wchodzą do skali.
  var FIT_MIN = 14 / 16.8;
  function fitBadge() {
    var root = document.documentElement, pill = document.querySelector(".hero .pill"), h1 = document.querySelector(".hero h1");
    if (!pill || !h1) return;
    root.style.removeProperty("--fit");
    root.style.removeProperty("--fit-pill");
    pill.style.maxWidth = "none";
    var full = pill.getBoundingClientRect().width;
    pill.style.maxWidth = "";
    var room = h1.getBoundingClientRect().width - 1;   // szerokość kolumny hero (hasło ją wypełnia), 1px zapasu
    if (full <= room) return;
    var cs = getComputedStyle(pill);
    var fixed = (parseFloat(getComputedStyle(pill, "::before").width) || 0) +
      parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
    var s = Math.max(0.5, (room - fixed) / (full - fixed));
    root.style.setProperty("--fit", Math.max(s, FIT_MIN).toFixed(4));
    if (s < FIT_MIN) root.style.setProperty("--fit-pill", s.toFixed(4));
  }
  // ponownie po wczytaniu każdej czcionki (Inter zmienia szerokość tekstu), po załadowaniu strony i po zmianie rozmiaru okna
  if (document.fonts) {
    if (document.fonts.ready) document.fonts.ready.then(fitBadge);
    if (document.fonts.addEventListener) document.fonts.addEventListener("loadingdone", fitBadge);
  }
  window.addEventListener("load", fitBadge);
  var fitting = false;
  window.addEventListener("resize", function () {
    if (!fitting) { fitting = true; window.requestAnimationFrame(function () { fitting = false; fitBadge(); }); }
  });

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
  // przełącznik okresu płatności w cenniku (jak na eqrento.com): rocznie / miesięcznie – kafelki rysują się od nowa
  document.querySelectorAll("[data-billing]").forEach(function (b) {
    b.addEventListener("click", function () {
      billing = b.dataset.billing;
      document.querySelectorAll("[data-billing]").forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
      renderPlans();
    });
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
