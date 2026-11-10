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

  function renderPlans() {
    var t = get("pricing");
    $("planGrid").innerHTML = CFG.plans.map(function (p) {
      var name = t.names[p.id];
      var players = p.players ? t.upTo.replace("{n}", p.players) : t.unlimited;
      var per = t.net + (p.perPlayer ? "<br>" + t.perPlayer.replace("{p}", String(p.perPlayer).replace(".", lang === "pl" ? "," : ".")) : "");
      var mail = "mailto:" + CFG.contactEmail + "?subject=" + encodeURIComponent(t.orderSubject + " – " + name);
      var href = p.stripe || mail;
      var label = p.stripe ? t.buy : (p.stripe === null ? t.ask : t.order);
      var ext = p.stripe ? ' target="_blank" rel="noopener"' : "";
      return '<article class="card plan' + (p.recommended ? " card--hl" : "") + '">' +
        (p.recommended ? '<span class="tag">' + esc(t.recommended) + "</span>" : "") +
        "<h3>" + esc(name) + "</h3>" +
        '<p class="desc">' + esc(players) + "</p>" +
        '<p class="price">' + money(p.price) + " <small>zł</small></p>" +
        '<p class="per">' + per + "</p>" +
        '<a class="btn btn--block ' + (p.recommended ? "btn--primary" : "btn--ghost") + '" href="' + esc(href) + '"' + ext + ">" + esc(label) + "</a>" +
        "</article>";
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
    $("whoGrid").innerHTML = get("who.items").map(function (w) {
      return '<article class="card who"><h3>' + esc(w.t) + "</h3><p>" + esc(w.d) + "</p></article>";
    }).join("");
    $("faqList").innerHTML = get("faq.items").map(function (f) {
      return "<details><summary>" + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>";
    }).join("");
    renderPlans();
    document.querySelectorAll("[data-lang]").forEach(function (b) { b.classList.toggle("is-on", b.dataset.lang === lang); });
  }

  function setLang(l, save) {
    lang = I18N[l] ? l : "pl";
    if (save) { try { localStorage.setItem("bextip-lang", lang); } catch (e) {} }
    render();
  }

  // Start: ?lang=en → zapamiętany wybór → język przeglądarki
  var saved = null;
  try { saved = localStorage.getItem("bextip-lang"); } catch (e) {}
  var q = new URLSearchParams(location.search).get("lang");
  var browser = (navigator.language || "pl").toLowerCase().indexOf("pl") === 0 ? "pl" : "en";

  document.querySelectorAll('[data-href="app"]').forEach(function (a) { a.href = CFG.appUrl; });
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

  setLang(q || saved || browser, false);
})();
