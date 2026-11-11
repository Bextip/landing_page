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
assets/icons/    – białe ikony kart „Dla kogo” – Uicons (Flaticon): shop, users, trophy; robi je narzedzia/uicons.ps1
assets/flags/    – flagi listy języków (pl, gb, de, es, ru; SVG, bo Windows nie pokazuje emoji flag)
assets/og-image.png – obraz do podglądu linków (1200×630), tworzony przez narzedzia/og-image.ps1
robots.txt, sitemap.xml – dla wyszukiwarek (adres https://bextip.site/)
narzedzia/       – og-image.html/.ps1 (obraz do podglądu linków), uicons.html/.ps1 (ikony z Flaticon); nie trafiają na stronę
.claude/         – lokalny podgląd: launch.json + serve.ps1 (PowerShell, bez Node i Pythona)
.github/workflows/static.yml – publikacja na GitHub Pages przy każdym pushu do main
```

## Sekcje (w kolejności)

Nagłówek (logo, menu, „Zaloguj się” → bextip.com/login, „Wybierz pakiet”) → hero → Czym jest Bextip
(`#about`, porównanie: arkusz / Bextip / jednorazowy event) → Funkcje (`#features`, 9 kafelków) → Każdy gracz widzi
swoją formę (`#inside`, ekran Tips&Stats) → Jak to działa (`#how`, 4 kroki) → Dla kogo (`#who`) → Cennik
(`#pricing`) → FAQ (`#faq`) → stopka. Sekcja kontaktowa „Zróbcie z piłkarskich emocji wspólne przeżycie całej firmy”
(`#contact`) usunięta (Łukasz, 10.11.2026) – kontakt jest w stopce.

- **Nagłówki sekcji** (Łukasz, 10.11.2026: jak na eqrento.com): tytuł i opis pod nim w `<div class="section-head">`,
  wyśrodkowane. Wyjątek: `#inside`, gdzie tekst stoi obok ekranu i zostaje wyrównany do lewej.
- **Hero jest białe** (Łukasz, 10.11.2026: niebieski panel boczny aplikacji na ekranie ginął na niebieskim tle),
  z delikatną niebieską poświatą za oknem.
- **Menu u góry białe, z rozmyciem** (Łukasz, 10.11.2026): półprzezroczyste białe tło z `backdrop-filter: blur`, więc
  to, co przewija się pod menu, jest rozmyte; po przewinięciu w dół `script.js` dodaje `.is-scrolled` (cień i linia).
  Logotyp w menu: `Bextip-Stadion-logotyp-na-jasnym-tle-zlota-kropka.svg`.
- **Układ menu jak na eqrento.com** (Łukasz, 10.11.2026): trzy kolumny (`1fr auto 1fr`) – logotyp z lewej, linki
  na środku (ok. 300px od logotypu przy 1536px), przyciski z prawej; odstępy między linkami 36px, do 1440px 28px,
  do 1240px 22px. Logo w menu ma 43px wysokości (o ok. 20% więcej niż wcześniej – Łukasz, 10.11.2026). Linia bazowa
  linków stoi na podstawie napisu „Bextip” (bez ogonka „p”): `translateY(--nav-shift)`, 7px – zmierzone
  w przeglądarce (różnica ok. 0,5px). Zmiana wysokości logo albo rozmiaru linków = zmierz ponownie.
- **Podkreślenie widocznej sekcji** (Łukasz, 10.11.2026): złota linia 2px pod linkiem (`.is-active`, kolor kropki
  nad „i”); `script.js` zaznacza ostatnią sekcję z menu, której góra minęła 30% ekranu pod menu, a na samym dole
  strony – FAQ. Sekcje bez linku (`#inside`, `#who`) zostawiają zaznaczoną poprzednią.
- **Wybór języka w stopce** (Łukasz, 10.11.2026 – lista w menu wyglądała jak przyciski): kolumna „Język” z flagami
  i nazwami w danym języku („Polski”, „English”…); wybrany jest biały ze złotą kropką. **Język startowy:** `?lang=`
  w adresie → wybór zapamiętany w przeglądarce (localStorage `bextip-lang`) → przeglądarka ustawiona na polski
  (pierwszy język w `navigator.languages`) – wersja polska, każda inna – angielska. Lista bierze się z `languages`
  w `config.js`, ale pokazuje tylko języki z tekstami w `i18n.js` – dziś PL i EN; flagi DE, ES i RU czekają
  w `assets/flags/`. Nowy język: teksty w `i18n.js` pod kodem z `languages`; trzeba też zdecydować, czy przeglądarki
  w tym języku mają go dostawać zamiast angielskiego (dziś automatycznie tylko PL / EN).
- Tła na przemian: hero białe → `#about` szare (`section--tint`, `#F1F4F8`) → `#features` białe → `#inside` szare →
  `#how` białe → `#who` niebieskie z logo (`section--blue`) → `#pricing` szare (białe kafelki odcinają się jak w EQrento) → `#faq` białe →
  stopka granatowa. Dodając sekcję, zachowaj naprzemienność.
- **Jeden odstęp góra / dół dla wszystkich sekcji** (Łukasz, 10.11.2026): `--sec-y` w `:root` (72px na komputerze,
  mniej na węższych ekranach) – wzorem był dolny odstęp hero od przycisków do krawędzi. Hero, sekcje i góra stopki
  używają tej samej zmiennej, a ostatni element sekcji nie ma dolnego marginesu. Okno w hero ma `margin-top`
  (32px), żeby stało na wysokości nagłówka h1 i mieściło się na ekranie laptopa 1366×768.
- **Telefon (do 820px): grafika zaraz pod hasłem** (Łukasz, 10.11.2026): `.hero__copy` ma `display: contents`,
  a elementy hero dostają `order` – etykieta, h1, okno z ekranem, opis, zalety, przyciski.
- **Kroki** (`#how`, Łukasz, 10.11.2026: żeby było widać, że jeden następuje po drugim): karty z numerem w kółku
  i złote strzałki w odstępach między nimi (`.steps li::after`, strzałka to SVG w CSS); do 1100px karty jedna pod
  drugą i strzałki w dół.
- **Cienie i głębia** (Łukasz, 10.11.2026: strona była zbyt płaska): trzy poziomy `--shadow-sm / -md / -lg` w `:root`
  na kartach, kafelkach cennika, krokach, pytaniach FAQ (każde na osobnej karcie), etykietach i przyciskach; karty
  unoszą się po najechaniu myszą (wyłączone przy „ogranicz animacje”); poświaty na niebieskich i granatowych
  sekcjach.
- **Ekrany aplikacji w oknie przeglądarki** (Łukasz, 10.11.2026): `<div class="window">` z paskiem `.window__bar`
  (trzy kropki i adres – `bextip.com/predictions`, `bextip.com/tips-stats`, prawdziwe adresy tych ekranów
  w aplikacji). Ramka to sam CSS (`.window` w styles.css), obrazy są bez ramki. Ta sama ramka jest na obrazie do
  podglądu linków.
- **„Dla kogo jest Bextip?”** (Łukasz, 10.11.2026): tło w niebieskim z logo `#1C4F95`, białe karty, a w każdej obok
  tekstu mała biała ikona na niebieskim kafelku (`.who__icon`), jak ikony na „chipach” w sekcji „One platform” na
  eqrento.com – sklep (właściciele firm), ludzie (HR), puchar (liderzy). Duże ilustracje z poprzedniej wersji Łukasz
  odrzucił (są w historii gita). Plik ikony to pole `icon` przy pozycji w `who.items` w `i18n.js`.
- **Ikony: Uicons z Flaticon** (Łukasz, 10.11.2026: „Możesz używać ikony z Flaticon”), zestaw regular rounded – ten sam
  co na eqrento.com. Paczka npm Uicons ma tylko font, więc `narzedzia/uicons.html` wyciąga z niego ścieżki SVG
  (opentype.js), a `narzedzia/uicons.ps1` zapisuje je jako białe `assets/icons/<plik>.svg` 24×24 (potrzebny podgląd
  lokalny i Edge). Nowa ikona: dopisz `plik → fi-rr-nazwa` w `ICONS` w uicons.html i uruchom skrypt.
  **Licencja wymaga podpisu „Uicons by Flaticon” z linkiem** – jest w dolnym wierszu stopki, jak na eqrento.com;
  zostaw go, póki strona używa Uicons.
- **FAQ w dwóch kolumnach** od 901px (Łukasz, 10.11.2026): `script.js` dzieli pytania na pół (pierwsza połowa
  w lewej kolumnie), każda kolumna układa się osobno, więc otwarte pytanie nie przesuwa drugiej; niżej jedna kolumna
  w tej samej kolejności.
- **Stopka** (Łukasz, 10.11.2026: schemat eqrento.com): logotyp z dwoma akapitami, kolumny Kontakt / Serwis
  (sekcje strony) / Aplikacja (bextip.com/login i /register) / Język. Marka ma do 340px, a wolne miejsce rozkłada się
  po równo między kolumny (`justify-content: space-between`), więc odstęp marka → Kontakt jest taki sam jak między
  pozostałymi (Łukasz, 10.11.2026). Hasło (Łukasz, 11.11.2026): „Stworzone z pasją w [flaga] Polsce, dla zespołów,
  które typują razem na [kula ziemska] świecie” – grafiki przed słowami, jak na eqrento.com (obie jako SVG, nie emoji;
  kula – ta sama co na eqrento.com); tekst w czterech kluczach `footer.tagline1–4`. Na dole prawa
  autorskie, Regulamin / Polityka prywatności i podpis „Uicons by Flaticon”. „Zaloguj się” i „Załóż konto” w stopce
  otwierają aplikację w nowej karcie (Łukasz, 10.11.2026); „Zaloguj się” w menu – w tej samej. Kolumna „Firma”
  z danymi spółki (jak w EQrento) – dopiero po podaniu danych przez Łukasza.

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
- Rozgrywki: w aplikacji (10.11.2026) można stworzyć grę dla Ligi Mistrzów 2026/27 (i MŚ 2026). Od 10.11.2026 strona
  mówi wszędzie o typerze **sportowym**, a cennik i FAQ wymieniają przykłady Łukasza: Liga Mistrzów UEFA, Premier
  League, Ekstraliga, NHL (plus wielkie turnieje jak MŚ). FAQ dodaje, że dostępne rozgrywki widać przy tworzeniu gry.
- Czas uruchomienia: wszędzie **„w kilka minut”** (Łukasz, 10.11.2026 – stopka; reszta ujednolicona na jego OK):
  etykieta w hero, karta Bextip w porównaniu, opis „Jak to działa”, FAQ „Jak szybko możemy zacząć?”. Uwaga: PDF
  z ofertą dla firm mówi jeszcze o „kilku godzinach”.
- Etykieta nad hasłem (Łukasz, 10.11.2026): PL „Automatyczny typer on-line dla firm”, EN „Automated online prediction game for companies”. W hero jest jeden przycisk – „Wybierz pakiet” („Zobacz, jak to działa” usunięty, Łukasz, 10.11.2026).
  Etykieta ma wymiary tego przycisku (Łukasz, 11.11.2026): 55px wysokości, ta sama czcionka i lewy odstęp; na telefonie
  stoi na środku, a do 480px ma mniejszą czcionkę, żeby mieściła się w jednej linii (wysokość zostaje).
- Opis pod hasłem w dwóch akapitach (`hero.lead` i `hero.lead2`, Łukasz, 11.11.2026), podobnie opis cennika
  (`pricing.sub` i `pricing.sub2`).
- **Kafelek Bextip w porównaniu** (`#about`, Łukasz, 11.11.2026): niebieski, zamiast napisu „Bextip” biały logotyp
  w rozmiarze tytułów kafelków (17px – wielkie „B” ma 13px jak wielkie litery tytułów), etykieta „Stworzony dla firm”
  na górnej krawędzi i przycisk „Wybierz pakiet” na dolnej – do połowy poza kafelkiem, jak na eqrento.com; kafelek ma
  `margin-bottom`, żeby przycisk nie zjadał odstępu sekcji. Na telefonie jest pierwszy (`order: -1`).
- **Funkcje** (`#features`, Łukasz, 11.11.2026): ikona i tytuł kafelka w jednym rzędzie, opis pod nimi.

## Cennik i Stripe

- Pakiety: `plans` w `config.js` – 20 / 30 / 100 / 250 graczy i Bez Limitu (3950 zł + 1,25 zł / os.).
  Ceny netto w zł, jednorazowo za jedną grę na wybrane rozgrywki. **Ten sam cennik dla wszystkich rozgrywek**
  (MŚ 2026, Liga Mistrzów 2026/27 – Łukasz, 10.11.2026). **Pakiet 50 (1690 zł) zdjęty ze strony** (Łukasz,
  10.11.2026), choć jest w PDF-ie z ofertą.
- Układ (Łukasz, 10.11.2026: mniejsze kafelki jak w EQrento): pakiety z limitem graczy to `.tier` w `.tiers` –
  4 w rzędzie powyżej 1100px, 2 × 2 niżej, jeden pod drugim na telefonach; Bez Limitu (`players: null`) to
  `.tier--wide` pod nimi na całą szerokość. Kafelek: nazwa, cena z „netto / za rozgrywki” obok, limit graczy,
  „wszystkie funkcje w cenie”, przycisk. Piąty pakiet z limitem nie zmieści się w rzędzie – trzeba by zmienić siatkę.
- Nazwy pakietów i napisy przy cenach: `pricing` w `i18n.js`.
- **„W każdym pakiecie”** – `pricing.included`: 20 funkcji z PDF-u „Oferta dla firm 2026” w brzmieniu Łukasza
  (10.11.2026), `**…**` = pogrubienie tam, gdzie PDF ma pogrubienie (`rich()` w `script.js`). Trzy kolumny czytane
  z góry na dół (CSS `columns`), dwie do 1100px, jedna na telefonach; ptaszki w złotych kółkach.
- Ceny w kafelkach: Lexend 600, jak hasło i tytuły (wcześniej 800 – po odchudzeniu nagłówków wyglądały za ciężko).
- „Polecany”: `recommended: true` daje granatowy kafelek z etykietą na górnej krawędzi. Teraz żaden pakiet (był
  Pakiet 50).
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
  - `Bextip-Stadion-logotyp.svg` – biały napis z zielonym „x”, bez tła (wersja z paczki „Stadion”);
  - `Bextip-Stadion-logotyp-z-tlem.svg` – to samo na tle `#1C4F95`, do użycia poza stroną.
  - Oba wycięte z `Bextip-Stadion-logo-kompaktowe-z-tlem.svg` (6 ścieżek napisu; kształty i kolory bez zmian).
  - **Na stronie: `Bextip-Stadion-logotyp-zlota-kropka.svg`** – kropka nad „i” w kolorze `--gold` `#F5B82E`
    (pomysł Łukasza, decyzja Claude, 10.11.2026; ścieżka „i” rozdzielona na trzon i kropkę) – w nagłówku, stopce
    i na obrazie do podglądu linków; w białym menu wersja na jasne tło (niżej). Jest też `-zlota-kropka-z-tlem.svg`. Aplikacja i inne materiały mają na razie
    logo bez złotej kropki – do ujednolicenia, jeśli Łukasz ją zostawi.
  - **Na jasne tło** (białe menu): `Bextip-Stadion-logotyp-na-jasnym-tle-zlota-kropka.svg` – litery niebieskie
    `#1C4F95`, „x” zielone `#86C93E`, złota kropka (Łukasz, 10.11.2026 – zamiast granatu i niebieskiego „x” z palety);
    jest też wersja bez złotej kropki. Stopka (granatowa) i obraz do podglądu linków mają dalej biały napis
    z zielonym „x”.
- **Sygnet** – podstawowy (Łukasz, 10.11.2026): `Bextip-Stadion-logo-sygnet-ikona.svg` („Bx” bez tła) – ikona karty
  przeglądarki.
- Pozostałe warianty z paczki „Stadion” (z claimem, panel, biały, na jasnym tle) zostają w `assets/logo/`, strona ich
  nie używa. Biały logotyp ze złotą kropką jest też w kafelku Bextip w porównaniu.
- Czcionki: Lexend (nagłówki) i Inter (tekst) z Google Fonts – dobrane na oko, bo w plikach SVG litery są krzywymi.
  Do potwierdzenia przez Łukasza. Hasło (h1), tytuły sekcji (h2) i tytuły kart (h3) mają grubość 600, nie 700
  (Łukasz, 10.11.2026: były za ciężkie); ceny w cenniku też 600, numery kroków 700.
- **Szerokość jak na eqrento.com** (Łukasz, 10.11.2026): treść do 1360px (`.wrap`), boczne odstępy `--gutter`
  48px, do 1440px 40px, do 1200px 32px, na telefonach (do 640px) 20px. Przy 1366×768 okno w hero mieści się
  na styk – szerszej treści albo wyższego okna nie da się już dodać bez zmniejszenia okna.
- Główne przyciski: zielone z granatowym napisem – biały napis na tej zieleni ma za słaby kontrast. **Lekki gradient
  i strzałka na końcu** jak na eqrento.com (Łukasz, 10.11.2026): `.btn--primary` ma gradient `#9AD452 → #7CBC35`;
  `.btn--arrow` + `<span class="btn__icon">` dodaje na końcu granatowe kółko ze złotą strzałką (`--ico-arrow`), tekst
  idzie wtedy w `<span>` (atrybut `data-i18n` na `<span>`, nie na `<a>`, bo inaczej zniknęłaby strzałka). Strzałkę
  mają: przycisk w hero, „Wybierz pakiet” w porównaniu i przyciski pakietów; „Wybierz pakiet” w menu – bez strzałki
  (jak „Book a demo” w nagłówku EQrento).
- Ptaszki na listach i w etykietach hero: złote kółko z granatowym ptaszkiem (`--ico-check`; Łukasz, 10.11.2026).
- Trzeci akcent: złoty `#F5B82E` (`--gold`; ciemniejszy `--gold-dark` na jasnym tle) – decyzja Claude za zgodą Łukasza, 10.11.2026, żeby strona nie była tylko niebiesko-zielona; nawiązuje do pucharu i żółtych ikon Jokera w aplikacji. Używany oszczędnie: kropka nad „i” w logo, kropka w etykiecie hero (rozmiar `--dot` = 8,4px, jak kropka nad „i” w logo z nagłówka – Łukasz, 10.11.2026; po powiększeniu logo do 43px kropka też urosła), strzałki między krokami, etykiety „Polecany” / „Stworzony dla firm”, co trzecia ikona funkcji (`--gold-soft`), górna krawędź kart „Dla kogo”, plusy w FAQ.
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

`index.html` ładuje `styles.css`, `config.js`, `i18n.js` i `script.js` z wersją w adresie (`?v=20261111a`).
Po zmianie któregoś z tych plików podbij wersję (np. `20261111a`) we wszystkich linkach – GitHub Pages
trzyma pliki w pamięci przeglądarki do 10 minut. Tę samą wersję mają logo w menu i stopce oraz favicon,
a ikony kart „Dla kogo” – `ASSET_V` w `script.js`: po podmianie pliku z tą samą nazwą (10.11.2026 nowe kolory logo
nie pokazały się Łukaszowi właśnie przez pamięć przeglądarki) podbij i je.

## Przed uruchomieniem – do zrobienia

- Linki Stripe w `config.js`.
- Regulamin i Polityka prywatności – linki w stopce prowadzą na razie do `#`.
- Konto GitHub, repozytorium i DNS bextip.site (patrz „Publikacja”).
- Lżejsze ekrany: `typowania.svg` i `tips-stats.svg` mają po 400–600 KB.
