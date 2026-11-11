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
frames.js        – okna przeglądarek (Chrome, Safari, Edge, Firefox, Samsung Internet) wokół ekranów aplikacji
styles.css       – wygląd; kolory z karty znaku, gradient i czcionki jako zmienne w :root na górze pliku
assets/logo/     – logo z paczki znaku (11.11.2026): 6 wersji logo w SVG; assets/logo/ikona/ – 11 wariantów ikony „Bx”
favicon.ico, favicon.svg, favicon-16/32.png, apple-touch-icon.png, icon-192/512.png, icon-maskable-192/512.png,
site.webmanifest – favikona i ikony z paczki znaku (katalog główny, jak w jej instrukcji)
assets/screens/  – wizualizacje aplikacji: typowania.svg (hero), tips-stats.svg (sekcja #inside)
assets/icons/    – białe ikony kart „Dla kogo” – Uicons (Flaticon): shop, users, trophy; robi je narzedzia/uicons.ps1
assets/flags/    – flagi listy języków (pl, gb, de, es, ru; SVG, bo Windows nie pokazuje emoji flag)
assets/og-image.png – obraz do podglądu linków (1200×630), tworzony przez narzedzia/og-image.ps1
robots.txt, sitemap.xml – dla wyszukiwarek (adres https://bextip.site/)
narzedzia/       – og-image.html/.ps1 (obraz do podglądu linków), uicons.html/.ps1 (ikony z Flaticon), okna.html (podgląd okien przeglądarek); nie trafiają na stronę
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
  wyśrodkowane; tytuł ma do 840px (angielski tytuł sekcji funkcji ma w Sora 822px), opis pod nim do 720px.
  Wyjątek: `#inside`, gdzie tekst stoi obok ekranu i zostaje wyrównany do lewej.
- **Hero jest białe** (Łukasz, 10.11.2026: niebieski panel boczny aplikacji na ekranie ginął na niebieskim tle),
  z delikatną niebieską poświatą za oknem.
- **Menu u góry białe, z rozmyciem** (Łukasz, 10.11.2026): półprzezroczyste białe tło z `backdrop-filter: blur`, więc
  to, co przewija się pod menu, jest rozmyte; po przewinięciu w dół `script.js` dodaje `.is-scrolled` (cień i linia).
  Logo w menu: `Bextip-logo-gradient.svg` (wersja ekranowa z gradientem – na jasne tło), 48px wysokości.
- **Układ menu jak na eqrento.com** (Łukasz, 10.11.2026): trzy kolumny (`1fr auto 1fr`) – logotyp z lewej, linki
  na środku (ok. 300px od logotypu przy 1536px), przyciski z prawej; odstępy między linkami 36px, do 1440px 28px,
  do 1240px 22px. Logo w menu ma 48px wysokości (nowe logo z polem, 11.11.2026; wcześniej logotyp 43px). Linia bazowa
  linków stoi na podstawie napisu „Bextip” (bez ogonka „p”): `translateY(--nav-shift)`, 4px – zmierzone
  w przeglądarce (różnica ok. 0,3px). Zmiana wysokości logo albo rozmiaru linków = zmierz ponownie.
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
  w aplikacji). Ramka to sam CSS (`.window` w styles.css), obrazy są bez ramki. Obraz do podglądu linków jest jeden
  dla wszystkich, więc ma na stałe okno w stylu Windows (Łukasz, 11.11.2026 – większość odbiorców pracuje na
  Windows); okno mieści się w kadrze, żeby było widać przyciski minimalizuj / maksymalizuj / zamknij, a hasło ma
  grubość 600 jak na stronie.
- **Okno przeglądarki odwiedzającego** (Łukasz, 11.11.2026): ekrany aplikacji stoją w oknie tej przeglądarki, której
  używa odwiedzający – jednej z pięciu najpopularniejszych w Europie i USA (StatCounter, październik 2026, wszystkie
  urządzenia; Europa: Chrome 60,0%, Safari 20,1%, Edge 7,1%, Firefox 4,2%, Samsung Internet 3,2%; USA: Chrome 56,0%,
  Safari 28,0%, Edge 7,1%, Firefox 3,6%, Samsung Internet 1,6%; szósta jest Opera). Pozostali (Opera, przeglądarki
  wbudowane w aplikacje jak LinkedIn…) – uniwersalne okno w stylu Windows (CSS, `.br-other`).
  - Skrypt w `<head>` `index.html` dodaje do `<html>` klasę `br-chrome / br-safari / br-edge / br-firefox / br-samsung /
    br-other` (z user agenta) i `os-apple / os-other`, zanim strona się narysuje.
  - `frames.js` rysuje okno jako SVG szerokie na 1080 (jak obrazy ekranów), więc skaluje się razem z ekranem jak zrzut
    prawdziwej przeglądarki: Chrome (karty ze „skrzydełkami”, pasek adresu-pigułka, ⋮), Edge (akcje kart, adres
    z „https://”, Copilot, ⋯), Firefox (Firefox View, pływająca karta, tarcza, ≡), Safari (jeden pasek, sama domena
    na środku), Samsung Internet (dom, pigułka adresu, licznik kart, ≡). Chrome, Edge i Firefox na sprzęcie Apple mają
    kolorowe kropki macOS z lewej, na innych systemach – przyciski Windows z prawej.
  - Miejsce na pasek jest zarezerwowane od razu (`aspect-ratio` w styles.css: 1080/76 Chrome, Edge, Firefox; 1080/56
    Safari; 1080/64 Samsung) – zmieniając wysokość SVG w frames.js, zmień ją też tam.
  - **Podgląd innych wariantów:** dopisz do adresu `?okno=chrome-mac`, `chrome-win`, `edge-mac`, `edge-win`,
    `firefox-mac`, `firefox-win`, `safari`, `samsung` albo `other`; wszystkie naraz – `narzedzia/okna.html` w podglądzie
    lokalnym.
  - Skrypt w `<head>` jest jedynym skryptem wpisanym w HTML: gdyby strona trafiła kiedyś na serwer z nagłówkiem
    Content-Security-Policy (jak eqrento.com na OVH), trzeba go dopuścić hashem albo przenieść do pliku.
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
- Etykieta nad hasłem (Łukasz, 10.11.2026): PL „Automatyczny typer on-line dla firm”, EN „Automated office prediction game” (Łukasz, 11.11.2026; wcześniej „Automated online prediction game for companies” – za długie, żeby na telefonach mieć rozmiar przycisku). W hero jest jeden przycisk – „Wybierz pakiet” („Zobacz, jak to działa” usunięty, Łukasz, 10.11.2026).
  **Etykieta = duży przycisk „Wybierz pakiet”** (Łukasz, 11.11.2026: te same proporcje, czcionka i odstępy, kolory
  własne): 55px wysokości, 1,05rem / 600, 26px od krawędzi, 14px między kropką a tekstem (jak między tekstem a kółkiem
  ze strzałką). Zawsze w jednej linii: gdy się nie mieści, `fitBadge()` w `script.js` ustawia `--fit` na `<html>`
  i etykieta zmniejsza się razem ze wszystkimi dużymi przyciskami (czcionka i odstępy, wysokość zostaje); przyciski
  najwyżej do 14px, dalej już tylko etykieta (`--fit-pill`). Na telefonach etykieta i przyciski mają w obu językach
  ten sam rozmiar: od 412px pełne 16,8px, przy 390px 15,8px (PL) / 16,6px (EN), przy 360px 14,5px / 15,1px. Dłuższy
  tekst etykiety = mniejsze przyciski na telefonach (poniżej 14px zmniejsza się już tylko etykieta). Na telefonie
  etykieta stoi na środku.
- Opis pod hasłem w dwóch akapitach (`hero.lead` i `hero.lead2`, Łukasz, 11.11.2026), podobnie opis cennika
  (`pricing.sub` i `pricing.sub2`).
- **Kafelek Bextip w porównaniu** (`#about`, Łukasz, 11.11.2026): niebieski, zamiast napisu „Bextip” biały logotyp
  28px wysokości – większy od tytułów kafelków obok (Łukasz, 11.11.2026: przy 17px ginął wśród punktów; karta znaku: logo co najmniej 24px), etykieta „Stworzony dla firm”
  na górnej krawędzi i przycisk „Wybierz pakiet” na dolnej – do połowy poza kafelkiem, jak na eqrento.com; kafelek ma
  `margin-bottom`, żeby przycisk nie zjadał odstępu sekcji. Na telefonie jest pierwszy (`order: -1`).
  **Etykieta „Stworzony dla firm” = przycisk „Wybierz pakiet” z tego kafelka** (Łukasz, 11.11.2026, kolory własne):
  45px wysokości, .95rem / 600, 20px od krawędzi do tekstu. Selektor `.tag.card__badge`, bo `.tag` stoi w CSS niżej
  i nadpisywał czcionkę i odstępy. Pod etykietą tyle miejsca co nad przyciskiem (54px górnego i dolnego odstępu).
- **Przycisk „Wybierz pakiet” na dole sekcji Funkcje i Jak to działa** (Łukasz, 11.11.2026): duży, ze strzałką, jak
  w hero, na środku (`.section-cta`, odstęp nad nim jak pod nagłówkiem sekcji), prowadzi do cennika.
- **Funkcje** (`#features`, Łukasz, 11.11.2026): ikona i tytuł kafelka w jednym rzędzie, opis pod nimi.

## Cennik i Stripe

- **Cennik od 11.11.2026** (Łukasz, nowa strategia cenowa): abonament miesięczny albo roczny, ceny netto, w `plans`
  w `config.js`. Wersja polska pokazuje złote, pozostałe języki euro (`currencyByLang`).

  | Pakiet | Graczy | Miesięcznie | Rocznie | Za gracza / mies. przy płatności rocznej |
  |---|---|---|---|---|
  | Micro | do 20 | 99 zł / €29 | 990 zł / €239 | 4,13 zł / €0.99 |
  | Small | do 50 | 199 zł / €59 | 1 990 zł / €479 | 3,32 zł / €0.79 |
  | Mid (Polecany) | do 100 | 299 zł / €89 | 2 990 zł / €689 | 2,49 zł / €0.57 |
  | Large | do 200 | 499 zł / €149 | 4 990 zł / €1,199 | 2,08 zł / €0.50 |
  | Enterprise | ponad 200 | od 790 zł / od €179 | od 7 900 zł / od €1,990 | wycena indywidualna |

  W złotych cena roczna = 10 × miesięczna („2 mies. gratis” przy przełączniku, w podtytule i przy cenie miesięcznej).
  W euro roczne ceny są inne – celowo, Łukasz potwierdził 11.11.2026 (np. Micro 239 € zamiast 12 × 29 = 348 €,
  Enterprise 1 990 € zamiast 2 148 €), więc
  wersja angielska nie pisze o „2 months free” – podtytuł: „yearly billing works out cheaper”. Ceny za gracza są
  wpisane tak, jak podał Łukasz (strona ich nie liczy). Miękki limit: `softLimit` 10% – na kafelku „miękki limit
  +10% (+2 / +5 / +10 / +20 graczy gratis)”. FAQ „Co, jeśli mamy więcej niż 200 graczy?” – Enterprise z cenami „od”.
  Poprzedni cennik (do 11.11.2026, jednorazowo za grę na wybrane rozgrywki): Pakiet 20 / 30 / 100 / 250 – 850 / 1150 /
  2850 / 3950 zł, Bez Limitu 3950 zł + 1,25 zł za osobę.
- **Przełącznik „Rocznie / Miesięcznie”** nad kafelkami (jak na eqrento.com): domyślnie rocznie, wybrana opcja
  w gradiencie, „2 mies. gratis” w złotym znaczniku (w EN bez znacznika). `script.js` rysuje kafelki od nowa
  (`billing`). Przy płatności rocznej pod ceną jest cena za gracza miesięcznie, przy miesięcznej – ile kosztuje rok.
- Układ (Łukasz, 10.11.2026: mniejsze kafelki jak w EQrento): pakiety z limitem graczy to `.tier` w `.tiers` –
  4 w rzędzie powyżej 1100px, 2 × 2 niżej, jeden pod drugim na telefonach; Enterprise (`players: null`) to
  `.tier--wide` pod nimi na całą szerokość. Piąty pakiet z limitem nie zmieści się w rzędzie – trzeba by zmienić siatkę.
- **Kafelek** (Łukasz, 11.11.2026): u góry nazwa i trzy punkty ze złotymi kropkami – „do **20 graczy**”, „miękki
  limit **+10%** (+2 graczy gratis)”, „**wszystkie funkcje** w cenie” (pogrubienia `**…**` w `i18n.js`, nawias
  z nierozdzielającymi spacjami, żeby łamał się w całości); na dole cena z „netto za rok” w jednej linii obok, „X,XX zł za gracza / miesiąc”
  i przycisk. Blok z ceną (`.tier__buy`) jest przyklejony do dołu, więc ceny stoją w jednej linii we wszystkich
  kafelkach. Enterprise: „ponad **200 graczy** • miękki limit **+10%** graczy gratis • **wszystkie funkcje** w cenie”
  w jednym rzędzie ze złotymi kropkami między punktami; do 1240px jeden pod drugim, z kropką przy każdym.
- Nazwy pakietów i napisy przy cenach: `pricing` w `i18n.js`.
- **„W każdym pakiecie”** – `pricing.included`: 19 funkcji z PDF-u „Oferta dla firm 2026” w brzmieniu Łukasza (bez „Własna subdomena” – usunięta z całej strony, Łukasz, 11.11.2026)
  (10.11.2026), `**…**` = pogrubienie tam, gdzie PDF ma pogrubienie (`rich()` w `script.js`). Trzy kolumny czytane
  z góry na dół (CSS `columns`), dwie do 1100px, jedna na telefonach; ptaszki w złotych kółkach.
- Ceny w kafelkach: Sora 600, jak hasło i tytuły (wcześniej 800 – po odchudzeniu nagłówków wyglądały za ciężko).
- „Polecany”: `recommended: true` – **Mid** (Łukasz, 11.11.2026): kafelek w gradiencie z etykietą na górnej krawędzi
  w wymiarach przycisku z kafelka (45px, .95rem / 600 – ta sama reguła co „Stworzony dla firm”). Kafelki mają 40px
  górnego odstępu, żeby nazwy pakietów stały w jednej linii; przy 2 × 2 odstęp między rzędami 44px, na telefonie
  24px więcej tylko nad wyróżnionym kafelkiem.
- Przycisk pakietu zależy od linku Stripe dla wybranego okresu i waluty (`stripe.pln.year`, `stripe.eur.month` itd.):
  - adres Payment Linku → „Kup pakiet”, otwiera Stripe w nowej karcie;
  - `""` (pusty) → „Zamów pakiet”, e-mail do kontakt@bextip.com z pakietem, okresem i walutą w temacie;
  - Enterprise (`stripe: null`) → „Zapytaj o ofertę” (wycena indywidualna).
  Stripe: osobny Payment Link na każdy pakiet, okres i walutę (4 pakiety × 2 okresy × 2 waluty = 16 linków).
- Do ustalenia przy zakładaniu Stripe (konto jeszcze nie istnieje – 10.11.2026): VAT (ceny na stronie są netto),
  zbieranie NIP i danych do faktury, strona po płatności z tym, co klient robi dalej (stworzenie gry, kod zaproszenia).

## Wygląd – karta znaku Bextip (11.11.2026)

Źródło: „Bextip – karta znaku” (skrócona księga znaku, wersja 1.0, listopad 2026) z paczki `Bextip-logo-pakiet.zip`
od Łukasza. Poprzednie logo „Stadion” zostało zastąpione (pliki są w historii gita).

- **Kolory:** niebieski `#1C4F95` (podstawowy, pole logo), granat `#0C2A55` (koniec gradientu, teksty), zielony
  `#86C93E` (litera x, akcje – przyciski), złoty `#EEC13E` (kropka nad „i”, akcenty), biel. Tło stron UI `#F1F4F8`
  zostaje z poprzedniej palety.
- **Kolory tekstu** (Łukasz, 11.11.2026): tytuły, hasło, ceny, pytania FAQ i pogrubienia w granacie `#0C2A55`
  (`--ink`); opisy i teksty pomocnicze w jaśniejszym odcieniu tego granatu `#475F80` (`--muted`: 75% granatu,
  25% bieli, kontrast z bielą 6,5:1; wcześniej szaroniebieski `#55627D`). Wszystko w granacie było rozważane –
  tytuły przestałyby się wyróżniać, a długie opisy zrobiłyby się ciężkie.
- **Gradient ekranowy:** liniowy, od `#1C4F95` do `#0C2A55`, kierunek 110° (`--grad` w styles.css). Na stronie:
  stopka, sekcja „Dla kogo”, kafelek Bextip w porównaniu, ikony kart „Dla kogo”, numery kroków, wyróżniony pakiet
  i tło obrazu do podglądu linków (Łukasz, 11.11.2026: gradient w stopce i innych ciemnych elementach).
- **Logo na stronie** (zasady karty: gradient tylko na ekranach i na jasnym tle; na niebieskim tle sam napis, bez pola):
  - menu (białe): `Bextip-logo-gradient.svg` – pole z gradientem, 48px wysokości;
  - stopka (gradient od niebieskiego), kafelek Bextip (gradient) i obraz do podglądu linków:
    `Bextip-napis-bez-pola-na-niebieskie-tlo.svg` – sam napis. Wersja płaska z polem na ciemne tło
    (`Bextip-logo-plaskie.svg`) zlewała się z niebieskim początkiem gradientu stopki.
  - Pozostałe wersje (płaska, jednokolorowe: granat, czerń, biel) są w `assets/logo/` – strona ich nie używa.
- **Ikona „Bx”:** favikona z paczki (`favicon.svg` – wariant do małych rozmiarów z szerszą przerwą w B, `favicon.ico`,
  `apple-touch-icon.png`, ikony w `site.webmanifest`); ta sama ikona jest na karcie w oknach przeglądarek (frames.js).
- **Zasady z karty:** nie rozciągać logo i nie zmieniać pochylenia pola; napis biały, x zielone, kropka złota; bez
  cieni, obrysów i efektów na logo; pole ochronne co najmniej wysokość litery x; najmniejsza wysokość logo 24px;
  **złoty to akcent – wypełnienia i znaczniki, nie tekst na bieli** (dlatego plusy w FAQ są niebieskie).
- **Krój napisu w logo: Sora ExtraBold** (B własne) – tym samym krojem są złożone nagłówki strony (patrz „Czcionki”).
- Czcionki z Google Fonts: **Sora** w nagłówkach (Łukasz, 11.11.2026: krój napisu z logo według karty znaku;
  wcześniej Lexend) i Inter w tekście. Strona ładuje tylko Sora 600 i 700.
  Hasło (h1), tytuły sekcji (h2) i tytuły kart (h3) mają grubość 600, nie 700
  (Łukasz, 10.11.2026: były za ciężkie); ceny w cenniku też 600, numery kroków 700.
- **Szerokość jak na eqrento.com** (Łukasz, 10.11.2026): treść do 1360px (`.wrap`), boczne odstępy `--gutter`
  48px, do 1440px 40px, do 1200px 32px, na telefonach (do 640px) 20px. Przy 1366×768 okno w hero mieści się
  na styk – szerszej treści albo wyższego okna nie da się już dodać bez zmniejszenia okna.
- Główne przyciski: zielone z granatowym napisem – biały napis na tej zieleni ma za słaby kontrast. **Lekki gradient
  i strzałka na końcu** jak na eqrento.com (Łukasz, 10.11.2026): `.btn--primary` ma gradient `#9AD452 → #7CBC35`;
  `.btn--arrow` + `<span class="btn__icon">` dodaje na końcu granatowe kółko ze złotą strzałką (`--ico-arrow`), tekst
  idzie wtedy w `<span>` (atrybut `data-i18n` na `<span>`, nie na `<a>`, bo inaczej zniknęłaby strzałka). Strzałkę
  mają: przycisk w hero, „Wybierz pakiet” w porównaniu, pod Funkcjami i pod Krokami oraz przyciski pakietów; „Wybierz pakiet” w menu – bez strzałki
  (jak „Book a demo” w nagłówku EQrento).
- Ptaszki na listach i w etykietach hero: złote kółko z granatowym ptaszkiem (`--ico-check`; Łukasz, 10.11.2026).
- Akcent: złoty z karty znaku `#EEC13E` (`--gold`; wcześniej `#F5B82E`). Używany oszczędnie i tylko jako wypełnienie lub znacznik: kropka w etykiecie hero (`--dot` 8,4px), podkreślenie widocznej sekcji w menu, strzałki między krokami i w przyciskach, ptaszki, etykiety „Polecany” / „Stworzony dla firm”, co trzecia ikona funkcji (`--gold-soft`), kropka przy wybranym języku w stopce.
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
- Dalsze kroki do podpięcia domeny (najpierw dane firmy do stopki i pełny przegląd strony – patrz
  „Przed uruchomieniem – do zrobienia”, Łukasz 11.11.2026):
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

`index.html` ładuje `styles.css`, `config.js`, `i18n.js` i `script.js` z wersją w adresie (`?v=20261111n`).
Po zmianie któregoś z tych plików podbij wersję (np. `20261111a`) we wszystkich linkach – GitHub Pages
trzyma pliki w pamięci przeglądarki do 10 minut. Tę samą wersję mają logo w menu i stopce oraz favicon,
a ikony kart „Dla kogo” – `ASSET_V` w `script.js`: po podmianie pliku z tą samą nazwą (10.11.2026 nowe kolory logo
nie pokazały się Łukaszowi właśnie przez pamięć przeglądarki) podbij i je.

## Przed uruchomieniem – do zrobienia

**Uruchomienie = podpięcie bextip.site** (Łukasz, 11.11.2026). Wtedy projekt strony jest skończony, więc przy
podpinaniu domeny Claude najpierw przypomina Łukaszowi o danych firmy do stopki, a potem robi pełny przegląd strony
(lista niżej) – przed przełączeniem DNS.

- **Dane firmy do stopki** – Łukasz je poda (10.11.2026: „Podam inne dane”): kolumna „Firma” z nazwą, adresem, NIP
  i KRS albo REGON; przy sp. z o.o. także sąd rejestrowy i kapitał zakładowy.
- Linki Stripe w `config.js` – 16 Payment Links: 4 pakiety × miesięcznie / rocznie × PLN / EUR (cennik od 11.11.2026).
- Regulamin i Polityka prywatności – linki w stopce prowadzą na razie do `#`.
- ~~Konto GitHub i repozytorium~~ – zrobione 10.11.2026. DNS i własna domena bextip.site – patrz „Publikacja”.
- Lżejsze ekrany: `typowania.svg` i `tips-stats.svg` mają po 400–600 KB.
- **Pełny przegląd przed przełączeniem DNS:**
  - teksty PL i EN: literówki, brakujące klucze w `i18n.js`, nazwy pakietów i ceny zgodne z ofertą;
  - linki: menu, stopka, bextip.com/login i /register, e-mail, telefon, Stripe, Regulamin, Polityka prywatności,
    „Uicons by Flaticon”;
  - wygląd od 360 do 1920 px w obu językach, okna przeglądarek (`?okno=…`, `narzedzia/okna.html`);
  - walidator HTML (W3C), błędy w konsoli, dostępność (teksty alternatywne, kontrast, obsługa klawiaturą), Lighthouse;
  - meta tagi i podgląd linków (canonical, `og:url`, `og:image`), `robots.txt`, `sitemap.xml`, favikony,
    `site.webmanifest`, strona 404 (teraz domyślna GitHuba).
- **Po przełączeniu:** Enforce HTTPS, `www.bextip.site` przekierowuje na `bextip.site`, podgląd linku do bextip.site
  na LinkedInie i Facebooku, wersje plików `?v=`.
