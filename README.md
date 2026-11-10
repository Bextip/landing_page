# Bextip – landing page

Strona statyczna: HTML + CSS + JavaScript, bez budowania, bez zależności, bez kodu po stronie serwera.
Edytowana przez Claude, tak jak strona EQrento (`../EQrento - landing page/eqrento-landing`).
Decyzje Łukasza są zapisane poniżej z datą – przy zmianach trzymaj się ich.

## Pliki

```
index.html       – struktura strony i kolejność sekcji; teksty NIE są wpisane w HTML (patrz „Teksty”)
i18n.js          – wszystkie teksty strony, PL i EN, te same klucze w obu językach
config.js        – pakiety, ceny, linki Stripe, e-mail, telefon, adres aplikacji
script.js        – wybór języka, wypełnianie list i cennika, menu mobilne
styles.css       – wygląd; kolory „Stadion” i czcionki jako zmienne w :root na górze pliku
assets/logo/     – logo „Stadion” (SVG od Łukasza, 10.11.2026) i wycięty z niego logotyp (patrz „Wygląd”)
assets/screens/  – wizualizacje aplikacji: typowania.svg (hero), tips-stats.svg (sekcja #inside)
assets/og-image.png – obraz do podglądu linków (1200×630), tworzony przez narzedzia/og-image.ps1
robots.txt, sitemap.xml – dla wyszukiwarek (adres https://bextip.site/)
narzedzia/       – szablon i skrypt obrazu do podglądu linków (nie trafiają na stronę)
.claude/         – lokalny podgląd: launch.json + serve.ps1 (PowerShell, bez Node i Pythona)
.github/workflows/static.yml – publikacja na GitHub Pages przy każdym pushu do main
```

## Sekcje (w kolejności)

Nagłówek (logo, menu, PL/EN, „Zaloguj się” → bextip.com/login, „Wybierz pakiet”) → hero → Czym jest Bextip
(`#about`, porównanie: arkusz / Bextip / jednorazowy event) → Funkcje (`#features`, 9 kafelków) → Każdy gracz widzi
swoją formę (`#inside`, ekran Tips&Stats) → Jak to działa (`#how`, 4 kroki) → Dla kogo (`#who`) → Cennik
(`#pricing`) → FAQ (`#faq`) → kontakt (`#contact`) → stopka.

## Teksty i języki

- Element w HTML ma `data-i18n="klucz"` (tekst), `data-i18n-list="klucz"` (lista) lub
  `data-i18n-attr="atrybut:klucz"`; treść bierze się z `i18n.js`. Kafelki funkcji, kroki, „Dla kogo” i FAQ to tablice
  w `i18n.js` – dodanie elementu tablicy dodaje kafelek / pytanie.
- Każda zmiana tekstu – w obu językach (`pl` i `en`).
- Język: `?lang=en` w adresie → zapamiętany wybór (localStorage `bextip-lang`) → język przeglądarki (polski albo
  angielski dla pozostałych).
- `<title>`, opis i znaczniki `og:` w `index.html` są wpisane po polsku na stałe (dla wyszukiwarek i podglądu linków
  na LinkedIn / Facebooku, które nie uruchamiają JavaScriptu). Zmieniając `meta.title` / `meta.description` w PL,
  zmień je też tam.
- Obraz do podglądu linków: `assets/og-image.png`, zrobiony z `narzedzia/og-image.html`. Po zmianie hasła, logo albo
  ekranu popraw szablon i uruchom `narzedzia/og-image.ps1` (potrzebny działający podgląd lokalny i Microsoft Edge).
  LinkedIn i Facebook trzymają stary obraz w pamięci – odświeża się go w LinkedIn Post Inspector / Facebook
  Sharing Debugger.
- Źródła treści: „BEXTIP – oferta dla firm 2026.pdf”, „Bextip – Zasady Gry (MŚ 2026).pdf”, „Bextip.com – rejestracja,
  stworzenie i dołączenie do gry.pdf” oraz zrzuty aplikacji (10.11.2026). Nie dopisuj funkcji, których tam nie ma.
- Rozgrywki: w aplikacji można stworzyć grę dla Ligi Mistrzów 2026/27 (i MŚ 2026). Teksty mówią ogólnie
  o „rozgrywkach”, Liga Mistrzów jest podana jako przykład.

## Cennik i Stripe

- Pakiety: `plans` w `config.js` – 20 / 30 / 50 / 100 / 250 graczy i Bez Limitu (3950 zł + 1,25 zł / os.).
  Ceny netto w zł, jednorazowo za jedną grę na wybrane rozgrywki. **Ten sam cennik dla wszystkich rozgrywek**
  (MŚ 2026, Liga Mistrzów 2026/27 – Łukasz, 10.11.2026).
- Nazwy pakietów i napisy przy cenach: `pricing` w `i18n.js`. Lista „W każdym pakiecie” – `pricing.included`.
- „Polecany”: `recommended: true` – teraz Pakiet 50 (propozycja Claude, do potwierdzenia przez Łukasza).
- Przycisk pakietu zależy od pola `stripe`:
  - adres Payment Linku → „Kup pakiet”, otwiera Stripe w nowej karcie;
  - `""` (pusty) → „Zamów pakiet”, otwiera e-mail do kontakt@bextip.com z nazwą pakietu w temacie;
  - `null` → „Zapytaj o ofertę” (Bez Limitu – cena zależy od liczby graczy).
- Do ustalenia przy zakładaniu Stripe (konto jeszcze nie istnieje – 10.11.2026): VAT (ceny na stronie są netto),
  zbieranie NIP i danych do faktury, strona po płatności z tym, co klient robi dalej (stworzenie gry, kod zaproszenia).

## Wygląd „Stadion”

- Paleta (z „Bextip-Stadion-00-Logo-i-paleta”): `#1C4F95` tło firmowe / panel, `#FFFFFF` napis, `#86C93E` akcent „x”,
  `#0C2A55` kontur sygnetu i tekst, `#1F86CF` „x” na jasnym tle, `#F1F4F8` tło strony UI.
- **Logotyp** – podstawowy znak serwisu (Łukasz, 10.11.2026): sam napis „Bextip” z wersji kompaktowej, bez sygnetu „Bx”.
  - `Bextip-Stadion-logotyp.svg` – biały napis z zielonym „x”, bez tła: nagłówek, stopka, obraz do podglądu linków;
  - `Bextip-Stadion-logotyp-z-tlem.svg` – to samo na tle `#1C4F95`, do użycia poza stroną.
  - Oba wycięte z `Bextip-Stadion-logo-kompaktowe-z-tlem.svg` (6 ścieżek napisu; kształty i kolory bez zmian).
  - Napis jest biały, dlatego nagłówek strony jest niebieski (`#1C4F95`), jak panel boczny w aplikacji.
- **Sygnet** – podstawowy (Łukasz, 10.11.2026): `Bextip-Stadion-logo-sygnet-ikona.svg` („Bx” bez tła) – ikona karty
  przeglądarki.
- Pozostałe warianty z paczki „Stadion” (z claimem, panel, biały, na jasnym tle) zostają w `assets/logo/`, strona ich
  nie używa.
- Czcionki: Lexend (nagłówki) i Inter (tekst) z Google Fonts – dobrane na oko, bo w plikach SVG litery są krzywymi.
  Do potwierdzenia przez Łukasza.
- Główne przyciski: zielone `#86C93E` z granatowym napisem – biały napis na tej zieleni ma za słaby kontrast.
- Wizualizacje „Tabele” i „Typowanie wyniku” zawierają prawdziwe imiona i nazwiska graczy – celowo nie są na stronie.
  Ekran tabeli można dodać, gdy powstanie wersja z fikcyjnymi nazwiskami.

## Podgląd lokalny

W Claude: podgląd `bextip-landing` z `.claude/launch.json` → http://localhost:8123/ (`?lang=en` – wersja angielska).
Stronę otwieraj przez serwer, nie przez dwuklik w `index.html`.

## Publikacja

- **Adres: https://bextip.site/** (Łukasz, 10.11.2026). Aplikacja zostaje pod bextip.com – „Zaloguj się” prowadzi do
  bextip.com/login. Ten adres jest wpisany w `index.html` (canonical, `og:url`, `og:image`), `robots.txt`
  i `sitemap.xml`.
- Domena jest w OVH (DNS `dns200.anycast.me` / `ns200.anycast.me`, jak bextip.com). 10.11.2026 pokazywała stronę OVH
  „Site en construction” (rekordy A `213.186.33.5` dla `bextip.site` i `www`).
- Hosting: GitHub Pages. Repozytorium **https://github.com/Bextip/landing_page** (konto `Bextip`, publiczne),
  gałąź `main`. Pages włączone przez GitHub Actions (10.11.2026); strona działa pod
  **https://bextip.github.io/landing_page/** (bez własnej domeny).
- Logowanie: GitHub CLI na tym komputerze zna dwa konta – aktywne jest `eqrento` (dla EQrento). To repozytorium ma
  własny `credential.helper` w `.git/config`, który bierze token konta `Bextip` (`gh auth token --user Bextip`),
  więc push działa bez przełączania kont. Commity podpisane `Bextip <355040911+Bextip@users.noreply.github.com>`.
  Polecenia `gh` dla tego repozytorium: z `-R Bextip/landing_page` (zapis, np. ustawienia Pages, wymaga
  `gh auth switch --user Bextip`, a potem powrotu na `eqrento`).
- Dalsze kroki do podpięcia domeny:
  1. ~~Repozytorium, pierwszy commit, push~~ – zrobione 10.11.2026.
  2. ~~Settings → Pages → Source: GitHub Actions~~ – zrobione 10.11.2026.
  3. Weryfikacja domeny (chroni przed przejęciem adresu): ustawienia konta / organizacji → Pages → Add a domain →
     `bextip.site`. GitHub poda rekord TXT `_github-pages-challenge-Bextip` do dodania w strefie DNS w OVH.
  4. Strefa DNS bextip.site w OVH: usunąć rekordy A `213.186.33.5` (`bextip.site` i `www`) i dodać:
     - A `bextip.site` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     - AAAA `bextip.site` → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
     - CNAME `www` → `bextip.github.io.`
  5. Settings → Pages → Custom domain: `bextip.site`, potem **Enforce HTTPS**. Zmiany DNS mogą się rozchodzić do
     24 h; certyfikat HTTPS GitHub wystawia sam.
  Plik `CNAME` w repozytorium nie jest potrzebny – przy publikacji przez GitHub Actions GitHub go pomija.
- Po podpięciu domeny każdy push do `main` od razu zmienia bextip.site (osobnego podglądu, jak w EQrento, już nie ma).
  Dlatego push do `main` – tylko po OK Łukasza; wcześniej zmiany ogląda się w podglądzie lokalnym.

## Wersje plików (cache)

`index.html` ładuje `styles.css`, `config.js`, `i18n.js` i `script.js` z wersją w adresie (`?v=20261110b`).
Po zmianie któregoś z tych plików podbij wersję (np. `20261111a`) we wszystkich czterech linkach – GitHub Pages
trzyma pliki w pamięci przeglądarki do 10 minut.

## Przed uruchomieniem – do zrobienia

- Linki Stripe w `config.js`.
- Regulamin i Polityka prywatności – linki w stopce prowadzą na razie do `#`.
- Konto GitHub, repozytorium i DNS bextip.site (patrz „Publikacja”).
- Lżejsze ekrany: `typowania.svg` i `tips-stats.svg` mają po 400–600 KB.
