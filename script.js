(function () {
  var CFG = window.BEXTIP_CONFIG, I18N = window.BEXTIP_I18N;
  var lang = "pl";

  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, I18N[lang]);
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function money(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  function $(id) { return document.getElementById(id); }

  // Cennik: pakiety z limitem graczy jako małe kafelki w rzędzie, pakiet bez limitu pod nimi na całą szerokość
  function renderPlans() {
    var t = get("pricing");
    function button(p, cls) {
      var name = t.names[p.id];
      var mail = "mailto:" + CFG.contactEmail + "?subject=" + encodeURIComponent(t.orderSubject + " – " + name);
      var href = p.stripe || mail;
      var label = p.stripe ? t.buy : (p.stripe === null ? t.ask : t.order);
      var ext = p.stripe ? ' target="_blank" rel="noopener"' : "";
      return '<p class="tier__cta"><a class="btn ' + cls + '" href="' + esc(href) + '"' + ext + ">" + esc(label) + "</a></p>";
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
    $("includedList").innerHTML = t.included.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
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
    // „Dla kogo”: ilustracja (assets/illustrations/, pole img w i18n.js) nad tytułem i opisem
    $("whoGrid").innerHTML = get("who.items").map(function (w) {
      return '<article class="card who"><div class="who__art"><img src="assets/illustrations/' + esc(w.img) +
        '" alt="" width="320" height="180" loading="lazy"></div><h3>' + esc(w.t) + "</h3><p>" + esc(w.d) + "</p></article>";
    }).join("");
    // FAQ w dwóch kolumnach: pierwsza połowa pytań w lewej, reszta w prawej (otwarcie pytania nie przesuwa drugiej
    // kolumny); na węższych ekranach kolumny stoją jedna pod drugą, więc kolejność zostaje ta sama
    var faq = get("faq.items"), half = Math.ceil(faq.length / 2);
    function qa(f) { return "<details><summary>" + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>"; }
    $("faqList").innerHTML = '<div class="faq__col">' + faq.slice(0, half).map(qa).join("") + "</div>" +
      '<div class="faq__col">' + faq.slice(half).map(qa).join("") + "</div>";
    renderPlans();
    // przycisk listy języków: flaga i nazwa wybranego języka, zaznaczenie na liście
    var cur = LANGS.filter(function (l) { return l.code === lang; })[0] || LANGS[0];
    $("langFlag").src = flagSrc(cur);
    $("langName").textContent = cur.name;
    $("langBtn").setAttribute("aria-label", get("nav.language") + ": " + cur.name);
    document.querySelectorAll("[data-lang]").forEach(function (b) { b.setAttribute("aria-current", b.dataset.lang === lang ? "true" : "false"); });
  }

  function setLang(l, save) {
    lang = I18N[l] ? l : "pl";
    if (save) { try { localStorage.setItem("bextip-lang", lang); } catch (e) {} }
    render();
  }

  // Języki: tylko te z listy w config.js, które mają teksty w i18n.js
  var LANGS = CFG.languages.filter(function (l) { return I18N[l.code]; });
  function flagSrc(l) { return "assets/flags/" + l.flag + ".svg"; }
  $("langList").innerHTML = LANGS.map(function (l) {
    return '<li><button type="button" class="lang__opt" data-lang="' + l.code + '" lang="' + l.code + '">' +
      '<img class="lang__flag" src="' + flagSrc(l) + '" alt="" width="20" height="14"><span>' + esc(l.name) + "</span></button></li>";
  }).join("");
  function openLang(open) {
    $("langList").hidden = !open;
    $("langBtn").setAttribute("aria-expanded", open ? "true" : "false");
  }
  $("langBtn").addEventListener("click", function () { openLang($("langList").hidden); });
  document.addEventListener("click", function (e) { if (!$("lang").contains(e.target)) openLang(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !$("langList").hidden) { openLang(false); $("langBtn").focus(); }
  });

  // Start: ?lang=en → zapamiętany wybór → pierwszy język przeglądarki, który strona ma (inaczej angielski)
  var saved = null;
  try { saved = localStorage.getItem("bextip-lang"); } catch (e) {}
  var q = new URLSearchParams(location.search).get("lang");
  var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "pl"];
  var browser = "en";
  for (var i = 0; i < prefs.length; i++) {
    var code = String(prefs[i]).slice(0, 2).toLowerCase();
    if (I18N[code]) { browser = code; break; }
  }

  document.querySelectorAll('[data-href="app"]').forEach(function (a) { a.href = CFG.appUrl; });
  document.querySelectorAll('[data-href="register"]').forEach(function (a) { a.href = CFG.registerUrl; });
  document.querySelectorAll('[data-href="mail"]').forEach(function (a) { a.href = "mailto:" + CFG.contactEmail; });
  document.querySelectorAll('[data-href="tel"]').forEach(function (a) { a.href = "tel:" + CFG.phone.replace(/\s/g, ""); a.textContent = CFG.phone; });
  document.querySelectorAll("[data-lang]").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.lang, true); openLang(false); $("langBtn").focus(); });
  });
  $("burger").addEventListener("click", function () {
    var open = $("navLinks").classList.toggle("is-open");
    this.setAttribute("aria-expanded", open);
  });
  $("navLinks").addEventListener("click", function () { this.classList.remove("is-open"); });
  $("year").textContent = new Date().getFullYear();

  // menu: po przewinięciu strony w dół – cień i linia pod spodem (rozmycie tła daje CSS: backdrop-filter)
  var nav = document.querySelector(".nav");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 4); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  setLang(q || saved || browser, false);
})();
