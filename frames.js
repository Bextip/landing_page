/* Bextip – okna przeglądarek wokół ekranów aplikacji (Łukasz, 11.11.2026).
   Odwiedzający widzi ekrany w oknie swojej przeglądarki: Chrome, Safari, Edge, Firefox albo Samsung Internet
   (5 najpopularniejszych w Europie i USA – StatCounter, październik 2026). Klasy br-* i os-* ustawia skrypt w <head>
   index.html; dla pozostałych (br-other) zostaje uniwersalne okno Windows ze styles.css.
   Każde okno to SVG o szerokości 1080 (jak obrazy ekranów), więc skaluje się razem z ekranem jak zrzut prawdziwej
   przeglądarki. Chrome, Edge i Firefox na sprzęcie Apple mają kolorowe kropki macOS z lewej, na innych systemach –
   przyciski Windows (minimalizuj / maksymalizuj / zamknij) z prawej. Wysokości (H) są też w styles.css
   (aspect-ratio dla .br-…), żeby miejsce na pasek było zarezerwowane, zanim ten skrypt go narysuje. */
(function () {
  var W = 1080;
  var FONT = "Inter, 'Segoe UI', system-ui, -apple-system, sans-serif";
  // ikona karty – adres liczony od położenia frames.js, więc działa też w narzedzia/okna.html
  var FAV = new URL("favicon.svg", (document.currentScript && document.currentScript.src) || location.href).href;
  var uid = 0;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function svg(h, body) {
    return '<svg viewBox="0 0 ' + W + " " + h + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' + body + "</svg>";
  }
  function text(x, y, s, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" font-family="' + FONT + '" font-size="' + (o.size || 14) + '"' +
      (o.weight ? ' font-weight="' + o.weight + '"' : "") + ' fill="' + (o.fill || "#202124") + '"' +
      (o.anchor ? ' text-anchor="' + o.anchor + '"' : "") + ">" + s + "</text>";
  }
  function line(d, c, w) {
    return '<path d="' + d + '" fill="none" stroke="' + (c || "#5F6368") + '" stroke-width="' + (w || 1.6) +
      '" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  function dot(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + c + '"/>'; }

  // --- ikony (ok. 16 × 16 wokół środka x, y) ---
  function back(x, y, c) { return line("M" + (x + 6) + " " + y + "H" + (x - 6) + "M" + (x - 1) + " " + (y - 5) + "L" + (x - 6) + " " + y + "L" + (x - 1) + " " + (y + 5), c); }
  function fwd(x, y, c) { return line("M" + (x - 6) + " " + y + "H" + (x + 6) + "M" + (x + 1) + " " + (y - 5) + "L" + (x + 6) + " " + y + "L" + (x + 1) + " " + (y + 5), c); }
  function reload(x, y, c) {
    return line("M" + (x + 5.2) + " " + (y - 3.2) + "A6 6 0 1 0 " + (x + 6) + " " + (y + 1.5), c) +
      line("M" + (x + 6) + " " + (y - 7.5) + "V" + (y - 2.6) + "H" + (x + 1.2), c);
  }
  function lock(x, y, c) {
    c = c || "#5F6368";
    return '<rect x="' + (x - 4.5) + '" y="' + (y - 1) + '" width="9" height="7" rx="1.5" fill="' + c + '"/>' +
      line("M" + (x - 2.6) + " " + (y - 1) + "V" + (y - 3) + "a2.6 2.6 0 0 1 5.2 0V" + (y - 1), c, 1.4);
  }
  var STAR = [[0, -6.5], [1.59, -2.18], [6.18, -2.01], [2.57, .83], [3.82, 5.26], [0, 2.7], [-3.82, 5.26], [-2.57, .83], [-6.18, -2.01], [-1.59, -2.18]];
  function star(x, y, c) {
    return line(STAR.map(function (p, i) { return (i ? "L" : "M") + (x + p[0]).toFixed(2) + " " + (y + p[1]).toFixed(2); }).join("") + "Z", c, 1.4);
  }
  function plus(x, y, c) { return line("M" + x + " " + (y - 6) + "v12M" + (x - 6) + " " + y + "h12", c); }
  function cross(x, y, c, s) { s = s || 4; return line("M" + (x - s) + " " + (y - s) + "l" + 2 * s + " " + 2 * s + "m0 " + (-2 * s) + "l" + (-2 * s) + " " + 2 * s, c, 1.4); }
  function dotsV(x, y, c) { return dot(x, y - 6, 1.9, c) + dot(x, y, 1.9, c) + dot(x, y + 6, 1.9, c); }
  function dotsH(x, y, c) { return dot(x - 6, y, 1.9, c) + dot(x, y, 1.9, c) + dot(x + 6, y, 1.9, c); }
  function burger(x, y, c) { return line("M" + (x - 7) + " " + (y - 5) + "h14M" + (x - 7) + " " + y + "h14M" + (x - 7) + " " + (y + 5) + "h14", c); }
  function shield(x, y, c) {
    return line("M" + x + " " + (y - 7) + "L" + (x + 6) + " " + (y - 4.5) + "V" + y + "C" + (x + 6) + " " + (y + 4) + " " + (x + 3) + " " + (y + 6.5) + " " + x + " " + (y + 7.5) +
      "C" + (x - 3) + " " + (y + 6.5) + " " + (x - 6) + " " + (y + 4) + " " + (x - 6) + " " + y + "V" + (y - 4.5) + "Z", c, 1.4);
  }
  function account(x, y, c) {
    return '<circle cx="' + x + '" cy="' + y + '" r="8" fill="none" stroke="' + c + '" stroke-width="1.4"/>' +
      '<circle cx="' + x + '" cy="' + (y - 2.2) + '" r="2.6" fill="none" stroke="' + c + '" stroke-width="1.4"/>' +
      line("M" + (x - 4.6) + " " + (y + 5.3) + "a5 4 0 0 1 9.2 0", c, 1.4);
  }
  function person(x, y, r, bg) {   // okrągły awatar profilu
    return dot(x, y, r, bg) + dot(x, y - r * .22, r * .3, "#FFFFFF") +
      '<path d="M' + (x - r * .55) + " " + (y + r * .62) + "a" + r * .55 + " " + r * .45 + ' 0 0 1 ' + r * 1.1 + ' 0z" fill="#FFFFFF"/>';
  }
  function cards(x, y, c) {   // dwie karty (kolekcje w Edge, przegląd kart w Safari)
    return '<rect x="' + (x - 7) + '" y="' + (y - 4) + '" width="11" height="11" rx="2" fill="none" stroke="' + c + '" stroke-width="1.4"/>' +
      line("M" + (x - 3) + " " + (y - 7) + "h8a2 2 0 0 1 2 2v8", c, 1.4);
  }
  function share(x, y, c) {
    return line("M" + (x - 6) + " " + (y - 1) + "V" + (y + 7) + "H" + (x + 6) + "V" + (y - 1), c, 1.5) +
      line("M" + x + " " + (y + 3) + "V" + (y - 8) + "M" + (x - 3.5) + " " + (y - 4.5) + "L" + x + " " + (y - 8) + "L" + (x + 3.5) + " " + (y - 4.5), c, 1.5);
  }
  function home(x, y, c) {
    return line("M" + (x - 9) + " " + (y - 1) + "L" + x + " " + (y - 9) + "L" + (x + 9) + " " + (y - 1) +
      "M" + (x - 6.5) + " " + (y - 3) + "V" + (y + 8) + "H" + (x + 6.5) + "V" + (y - 3), c, 1.8);
  }
  function fav(x, y) { return '<image href="' + FAV + '" x="' + x + '" y="' + y + '" width="15" height="15"/>'; }
  // kolorowe kropki macOS (zamknij / zminimalizuj / pełny ekran)
  function lights(y) { return dot(22, y, 6, "#FF5F57") + dot(42, y, 6, "#FEBC2E") + dot(62, y, 6, "#28C840"); }
  // przyciski Windows przy prawej krawędzi: trzy pola po 46 jednostek
  function winCtrls(y, c) {
    return line("M960 " + (y + .5) + "h10", c, 1) +
      '<rect x="1006.5" y="' + (y - 4.5) + '" width="9" height="9" rx="1" fill="none" stroke="' + c + '" stroke-width="1"/>' +
      line("M1052.5 " + (y - 4.5) + "l9 9m0 -9l-9 9", c, 1);
  }
  function splitUrl(url) { var i = url.indexOf("/"); return i < 0 ? [url, ""] : [url.slice(0, i), url.slice(i)]; }

  var BUILD = {
    // Google Chrome: karty z zaokrąglonymi „skrzydełkami”, pasek adresu w kształcie pigułki, awatar i ⋮
    chrome: function (url, apple) {
      var x0 = apple ? 84 : 12, x1 = x0 + 232;
      return svg(76,
        '<rect width="1080" height="34" fill="#DEE1E6"/><rect y="34" width="1080" height="42" fill="#FFFFFF"/>' +
        '<path d="M0 75.5H1080" stroke="#DADCE0"/>' +
        (apple ? lights(17) : winCtrls(17, "#202124")) +
        '<path d="M' + (x0 - 8) + " 34Q" + x0 + " 34 " + x0 + " 26V14Q" + x0 + " 6 " + (x0 + 8) + " 6H" + (x1 - 8) + "Q" + x1 + " 6 " + x1 + " 14V26Q" + x1 + " 34 " + (x1 + 8) + ' 34Z" fill="#FFFFFF"/>' +
        fav(x0 + 12, 12.5) + text(x0 + 35, 24.5, "Bextip", { size: 12.5, fill: "#3C4043" }) + cross(x1 - 16, 20, "#5F6368", 3.5) +
        plus(x1 + 26, 20, "#5F6368") +
        back(22, 55) + fwd(54, 55, "#BDC1C6") + reload(86, 55) +
        '<rect x="110" y="41" width="770" height="28" rx="14" fill="#F1F3F4"/>' +
        lock(129, 55) + text(146, 60, esc(url), { size: 14 }) + star(858, 55, "#5F6368") +
        person(1008, 55, 11, "#1C4F95") + dotsV(1048, 55, "#5F6368"));
    },
    // Microsoft Edge: ikona akcji kart, pasek adresu z zaokrąglonymi rogami i „https://”, Copilot, profil i ⋯
    edge: function (url, apple) {
      var x0 = apple ? 112 : 46, x1 = x0 + 236, ta = apple ? 92 : 24, g = "cp" + (++uid);
      return svg(76,
        '<defs><linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1F6FEB"/>' +
        '<stop offset=".5" stop-color="#22C1C3"/><stop offset="1" stop-color="#E35CB8"/></linearGradient></defs>' +
        '<rect width="1080" height="34" fill="#EBEBEB"/><rect y="34" width="1080" height="42" fill="#F9F9F9"/>' +
        '<path d="M0 75.5H1080" stroke="#E0E0E0"/>' +
        (apple ? lights(17) : winCtrls(17, "#1F1F1F")) +
        '<rect x="' + (ta - 8) + '" y="10" width="16" height="14" rx="3" fill="none" stroke="#5F5F5F" stroke-width="1.4"/>' +
        line("M" + (ta - 3) + " 10v14", "#5F5F5F", 1.4) +
        '<path d="M' + x0 + " 34V12Q" + x0 + " 5 " + (x0 + 7) + " 5H" + (x1 - 7) + "Q" + x1 + " 5 " + x1 + ' 12V34Z" fill="#F9F9F9"/>' +
        fav(x0 + 12, 12) + text(x0 + 35, 24, "Bextip", { size: 12.5, fill: "#1F1F1F" }) + cross(x1 - 16, 19.5, "#5F5F5F", 3.5) +
        plus(x1 + 24, 19.5, "#5F5F5F") +
        back(22, 55, "#424242") + fwd(54, 55, "#B4B4B4") + reload(86, 55, "#424242") +
        '<rect x="110.5" y="41.5" width="740" height="27" rx="7" fill="#FFFFFF" stroke="#E3E3E3"/>' +
        lock(129, 55, "#616161") + text(146, 60, '<tspan fill="#767676">https://</tspan>' + esc(url), { size: 14, fill: "#1F1F1F" }) +
        star(830, 55, "#616161") +
        star(880, 54, "#424242") + line("M884 61h6M886 58h4", "#424242", 1.4) +
        cards(918, 55, "#424242") +
        dot(958, 55, 10, "url(#" + g + ")") + line("M961.5 51.5A5 5 0 1 0 961.5 58.5", "#FFFFFF", 2) +
        person(1000, 55, 10.5, "#0F6CBD") + dotsH(1046, 55, "#424242"));
    },
    // Mozilla Firefox: Firefox View, „pływająca” karta, tarcza ochrony przed śledzeniem, konto i ≡
    firefox: function (url, apple) {
      var x0 = apple ? 112 : 46, x1 = x0 + 236, fv = apple ? 92 : 24, u = splitUrl(url);
      return svg(76,
        '<rect width="1080" height="34" fill="#F0F0F4"/><rect y="34" width="1080" height="42" fill="#F9F9FB"/>' +
        '<path d="M0 75.5H1080" stroke="#E0E0E6"/>' +
        (apple ? lights(17) : winCtrls(17, "#15141A")) +
        '<rect x="' + (fv - 8) + '" y="10" width="16" height="14" rx="3" fill="none" stroke="#5B5B66" stroke-width="1.4"/>' +
        line("M" + (fv - 8) + " 14.5h16", "#5B5B66", 1.4) +
        '<rect x="' + (x0 + .5) + '" y="5.5" width="235" height="24" rx="4" fill="#FFFFFF" stroke="#D7D7DB"/>' +
        fav(x0 + 10, 10) + text(x0 + 32, 22, "Bextip", { size: 12.5, fill: "#15141A" }) + cross(x1 - 14, 17.5, "#5B5B66", 3.5) +
        plus(x1 + 22, 17.5, "#5B5B66") +
        line("M" + (apple ? 1041 : 917) + " 15l5 5 5-5", "#5B5B66") +
        back(22, 55, "#5B5B66") + fwd(54, 55, "#B1B1B9") + reload(86, 55, "#5B5B66") +
        '<rect x="110" y="41" width="770" height="28" rx="4" fill="#F0F0F4"/>' +
        shield(128, 55, "#5B5B66") + lock(148, 55, "#5B5B66") +
        text(164, 60, esc(u[0]) + '<tspan fill="#6F6F78">' + esc(u[1]) + "</tspan>", { size: 14, fill: "#15141A" }) +
        star(858, 55, "#5B5B66") +
        account(960, 55, "#5B5B66") + burger(1048, 55, "#5B5B66"));
    },
    // Safari (macOS): jeden pasek – kropki, panel boczny, wstecz / dalej, adres (sama domena) na środku, udostępnij, +, karty
    safari: function (url) {
      var domain = splitUrl(url)[0];
      return svg(56,
        '<rect width="1080" height="56" fill="#F6F6F6"/><path d="M0 55.5H1080" stroke="#D9D9D9"/>' +
        lights(28) +
        '<rect x="94" y="21" width="20" height="15" rx="3" fill="none" stroke="#6E6E73" stroke-width="1.5"/>' + line("M101 21v15", "#6E6E73", 1.5) +
        line("M147 22l-6 6 6 6", "#6E6E73", 1.8) + line("M171 22l6 6-6 6", "#BDBDC2", 1.8) +
        '<rect x="330" y="14" width="420" height="28" rx="8" fill="#E8E8EA"/>' +
        lock(493, 28, "#6E6E73") + text(546, 33, esc(domain), { size: 14, fill: "#1D1D1F", anchor: "middle" }) +
        reload(730, 28, "#6E6E73") +
        share(970, 28, "#6E6E73") + plus(1010, 28, "#6E6E73") + cards(1050, 29, "#6E6E73"));
    },
    // Samsung Internet (Android): dom, pasek adresu w kształcie pigułki, licznik kart (fiolet Samsung Internet) i ≡
    samsung: function (url) {
      return svg(64,
        '<rect width="1080" height="64" fill="#FFFFFF"/><path d="M0 63.5H1080" stroke="#E6E6E6"/>' +
        home(30, 32, "#333333") +
        '<rect x="58" y="12" width="870" height="40" rx="20" fill="#F2F2F2"/>' +
        lock(84, 32, "#555555") + text(100, 38, esc(url), { size: 17, fill: "#222222" }) + reload(904, 32, "#555555") +
        '<rect x="975" y="21" width="22" height="22" rx="5" fill="none" stroke="#6E5CF6" stroke-width="1.8"/>' +
        text(986, 36.5, "2", { size: 12, weight: 600, fill: "#6E5CF6", anchor: "middle" }) +
        burger(1048, 32, "#333333"));
    }
  };

  // rysuje okno danej przeglądarki we wszystkich .window__bar (adres bierze z .window__url)
  function render(br, apple) {
    if (!BUILD[br]) return;
    document.querySelectorAll(".window__bar").forEach(function (bar) {
      if (!bar.hasAttribute("data-url")) bar.setAttribute("data-url", (bar.querySelector(".window__url") || {}).textContent || "bextip.com");
      var old = bar.querySelector(":scope > svg");
      if (old) old.remove();
      bar.insertAdjacentHTML("beforeend", BUILD[br](bar.getAttribute("data-url"), apple));
      bar.classList.add("window__bar--svg");
    });
  }

  var cls = document.documentElement.className;
  var m = /\bbr-(chrome|safari|edge|firefox|samsung)\b/.exec(cls);
  if (m) render(m[1], /\bos-apple\b/.test(cls));
  // do podglądu wariantów: bextipFrames("edge", true) w konsoli – Edge na Macu; bextipFrameSVG – narzedzia/okna.html
  window.bextipFrames = render;
  window.bextipFrameSVG = function (br, url, apple) { return BUILD[br] ? BUILD[br](url, apple) : ""; };
})();
