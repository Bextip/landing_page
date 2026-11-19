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
styles.css       – wygląd; kolory z karty znaku 1.4 i czcionki jako zmienne w :root na górze pliku
assets/logo/     – pliki SVG z paczki znaku 1.4 (19.11.2026): napis (znak podstawowy), logo z polem, ikona/, deskryptor/, powered-by/, motyw-x/, animacja/
favicon.ico, favicon.svg, favicon-64x64.png, apple-touch-icon.png, icon-192/512.png, icon-maskable-512.png,
site.webmanifest – zestaw favikon z paczki znaku 1.4 (katalog główny, jak w jej instrukcji)
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
  bez poświaty za oknem (zdjęta 19.11.2026 razem ze zmniejszeniem cienia pod oknem).
- **Menu u góry białe, z rozmyciem** (Łukasz, 10.11.2026): półprzezroczyste białe tło z `backdrop-filter: blur`, więc
  to, co przewija się pod menu, jest rozmyte; po przewinięciu w dół `script.js` dodaje `.is-scrolled` (cień i linia).
  Logo w menu: `Bextip-napis-kolor.svg` (napis – znak podstawowy na stronie WWW według karty 1.4), 43px wysokości.
- **Układ menu jak na eqrento.com** (Łukasz, 10.11.2026): trzy kolumny (`1fr auto 1fr`) – logotyp z lewej, linki
  na środku (ok. 300px od logotypu przy 1536px), przyciski z prawej; odstępy między linkami 36px, do 1440px 28px,
  do 1240px 22px. Napis w menu ma 43px wysokości (karta 1.4, 19.11.2026; przy karcie 1.0 logo z polem 48px). Linia bazowa
  linków stoi na podstawie napisu „Bextip” (bez ogonka „p”): `translateY(--nav-shift)`, 7px – zmierzone
  w przeglądarce (różnica ok. 0,4px). Zmiana wysokości logo albo rozmiaru linków = zmierz ponownie.
- **Podkreślenie widocznej sekcji** (Łukasz, 10.11.2026): niebieska linia 2px pod linkiem (`.is-active`; karta 1.4: mięty
  nie używać do cienkich linii na bieli); `script.js` zaznacza ostatnią sekcję z menu, której góra minęła 30% ekranu pod menu, a na samym dole
  strony – FAQ. Sekcje bez linku (`#inside`, `#who`) zostawiają zaznaczoną poprzednią.
- **Wybór języka w stopce** (Łukasz, 10.11.2026 – lista w menu wyglądała jak przyciski): kolumna „Język” z flagami
  i nazwami w danym języku („Polski”, „English”…); wybrany jest biały z miętową kropką. **Język startowy:** `?lang=`
  w adresie → wybór zapamiętany w przeglądarce (localStorage `bextip-lang`) → przeglądarka ustawiona na polski
  (pierwszy język w `navigator.languages`) – wersja polska, każda inna – angielska. Lista bierze się z `languages`
  w `config.js`, ale pokazuje tylko języki z tekstami w `i18n.js` – dziś PL i EN; flagi DE, ES i RU czekają
  w `assets/flags/`. Nowy język: teksty w `i18n.js` pod kodem z `languages`; trzeba też zdecydować, czy przeglądarki
  w tym języku mają go dostawać zamiast angielskiego (dziś automatycznie tylko PL / EN).
- Tła na przemian: hero białe → `#about` szare (`section--tint`, `#F1F4F8`) → `#features` białe → `#inside` szare →
  `#how` białe → `#who` niebieskie z logo (`section--blue`) → `#pricing` szare (białe kafelki odcinają się jak w EQrento) → `#faq` białe →
  stopka niebieska. Dodając sekcję, zachowaj naprzemienność.
- **Jeden odstęp góra / dół dla wszystkich sekcji** (Łukasz, 10.11.2026): `--sec-y` w `:root` (72px na komputerze,
  mniej na węższych ekranach) – wzorem był dolny odstęp hero od przycisków do krawędzi. Hero, sekcje i góra stopki
  używają tej samej zmiennej, a ostatni element sekcji nie ma dolnego marginesu. Okno w hero ma `margin-top`
  (32px), żeby stało na wysokości nagłówka h1 i mieściło się na ekranie laptopa 1366×768.
- **Telefon (do 820px): grafika zaraz pod hasłem** (Łukasz, 10.11.2026): `.hero__copy` ma `display: contents`,
  a elementy hero dostają `order` – etykieta, h1, okno z ekranem, opis, zalety, przyciski.
- **Kroki** (`#how`, Łukasz, 10.11.2026: żeby było widać, że jeden następuje po drugim): karty z numerem w kółku
  i miętowe strzałki w odstępach między nimi (`.steps li::after`, strzałka to SVG w CSS); do 1100px karty jedna pod
  drugą i strzałki w dół.
- **Cienie i głębia** (Łukasz, 10.11.2026: strona była zbyt płaska): trzy poziomy `--shadow-sm / -md / -lg` w `:root`
  na kartach, kafelkach cennika, krokach, pytaniach FAQ (każde na osobnej karcie), etykietach i przyciskach; karty
  unoszą się po najechaniu myszą (wyłączone przy „ogranicz animacje”); bez poświat i gradientów (karta 1.4), cienie mają odcień niebieskiego.
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
  niebieska, „2 mies. gratis” w miętowym znaczniku (w EN bez znacznika). `script.js` rysuje kafelki od nowa
  (`billing`). Przy płatności rocznej pod ceną jest cena za gracza miesięcznie, przy miesięcznej – ile kosztuje rok.
- Układ (Łukasz, 10.11.2026: mniejsze kafelki jak w EQrento): pakiety z limitem graczy to `.tier` w `.tiers` –
  4 w rzędzie powyżej 1100px, 2 × 2 niżej, jeden pod drugim na telefonach; Enterprise (`players: null`) to
  `.tier--wide` pod nimi na całą szerokość. Piąty pakiet z limitem nie zmieści się w rzędzie – trzeba by zmienić siatkę.
- **Kafelek** (Łukasz, 11.11.2026): u góry nazwa i trzy punkty z miętowymi kropkami – „do **20 graczy**”, „miękki
  limit **+10%** (+2 graczy gratis)”, „**wszystkie funkcje** w cenie” (pogrubienia `**…**` w `i18n.js`, nawias
  z nierozdzielającymi spacjami, żeby łamał się w całości); na dole cena z „netto za rok” w jednej linii obok, „X,XX zł za gracza / miesiąc”
  i przycisk. Blok z ceną (`.tier__buy`) jest przyklejony do dołu, więc ceny stoją w jednej linii we wszystkich
  kafelkach. Enterprise: „ponad **200 graczy** • miękki limit **+10%** graczy gratis • **wszystkie funkcje** w cenie”
  w jednym rzędzie z miętowymi kropkami między punktami; do 1240px jeden pod drugim, z kropką przy każdym.
- Nazwy pakietów i napisy przy cenach: `pricing` w `i18n.js`.
- **„W każdym pakiecie”** – `pricing.included`: 19 funkcji z PDF-u „Oferta dla firm 2026” w brzmieniu Łukasza (bez „Własna subdomena” – usunięta z całej strony, Łukasz, 11.11.2026)
  (10.11.2026), `**…**` = pogrubienie tam, gdzie PDF ma pogrubienie (`rich()` w `script.js`). Trzy kolumny czytane
  z góry na dół (CSS `columns`), dwie do 1100px, jedna na telefonach; ptaszki w miętowych kółkach.
- Ceny w kafelkach: Sora 600, jak hasło i tytuły (wcześniej 800 – po odchudzeniu nagłówków wyglądały za ciężko).
- „Polecany”: `recommended: true` – **Mid** (Łukasz, 11.11.2026): niebieski kafelek z etykietą na górnej krawędzi
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

## Wygląd – karta znaku Bextip 1.4 (19.11.2026)

Źródło: „Bextip – karta znaku”, wersja 1.4 (listopad 2026) z paczki `Bextip - logo pack ver. 1.4.rar` od Łukasza
(19.11.2026: „najnowsza oficjalnie stosowana wersja logotypu”). Zastępuje kartę 1.0 z 11.11.2026 (logo z polem
w gradiencie, limonka, złota kropka, granat) – tamte pliki i kolory są w historii gita.

- **Kolory marki – dwa i biel:** niebieski `#1C4F95` (napis, x, teksty, ciemne tło), mięta `#22DCAF` (kwadrat pod x,
  tło wyróżnień i przycisków), biel. Szary `#6B7280` tylko w wersjach „cichych” i „powered by” – strona go nie używa.
  **Bez granatu, limonki i złota, bez gradientów** („ciemnym tłem jest niebieski”; „unikaj neonów, gradientów
  i estetyki serwisów z zakładami”). Tło stron UI `#F1F4F8` i linie `#D8E0EC` zostają jako neutralne.
- **Zasady mięty:** to kolor kwadratu i tła; **na mięcie tekst niebieski, nie biały**; **nie używać mięty do tekstu
  ani cienkich linii na bieli** – dlatego podkreślenie widocznej sekcji w menu i plusy w FAQ są niebieskie.
- **Kolory na stronie** (`:root` w `styles.css`):
  - tekst `--ink` = niebieski `#1C4F95` (tytuły, hasło, ceny, pytania FAQ, pogrubienia); opisy i teksty pomocnicze
    `--muted` = `#3E69A5` (85% niebieskiego + 15% bieli, kontrast z bielą 5,6:1) – ta sama zasada co przy decyzji
    Łukasza z 11.11.2026: opisy w jaśniejszym odcieniu koloru tytułów, żeby tytuły się wyróżniały;
  - ciemne tła `--blue`, płaskie: stopka, sekcja „Dla kogo”, kafelek Bextip w porównaniu, wyróżniony pakiet, wybrana
    opcja przełącznika w cenniku, numery kroków, ikony kart „Dla kogo”, tło obrazu do podglądu linków; teksty
    pomocnicze na niebieskim `--on-blue` = `#D5E2F5` (6,1:1);
  - mięta `--mint`: przyciski główne (niebieski tekst, po najechaniu `--mint-dark`), etykiety „Stworzony dla firm”,
    „Polecany” i „2 mies. gratis”, kropki (etykieta w hero, punkty w kafelkach cennika, wybrany język), kółka
    z ptaszkami, strzałki między krokami, co druga ikona funkcji (`--mint-soft`);
  - kółko ze strzałką w przyciskach: niebieskie z białą strzałką.
- **Logo na stronie** (karta: „napis” jest znakiem podstawowym na stronie WWW; logo z polem – gra, kampanie, social media):
  - menu: `assets/logo/Bextip-napis-kolor.svg`, 43px wysokości (jak napis sprzed pola – Łukasz, 10.11.2026);
  - stopka, kafelek Bextip (28px) i obraz do podglądu linków: `Bextip-napis-kolor-ciemne-tlo.svg` (biały napis,
    miętowy kwadrat z niebieskim x);
  - pozostałe pliki SVG z paczki są w `assets/logo/` (jednokolorowe, logo z polem, `ikona/`, `deskryptor/`,
    `powered-by/`, `motyw-x/`, `animacja/`) – strona ich nie używa. Najmniejsze wysokości na ekranie: napis 12px,
    logo z polem 20px, ikona 16px, deskryptor PL 50px / EN 70px;
  - `animacja/Bextip-napis-animacja.svg`: kwadrat z x obraca się raz przy wczytaniu (0,8 s, szanuje „ogranicz
    animacje”) – do ewentualnego użycia w menu, na razie napis jest statyczny.
- **Favikony** z folderu „6 - favicon”: `favicon.ico` (48px), `favicon.svg`, `favicon-64x64.png`,
  `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `site.webmanifest`. Adresy w `<head>`
  i w manifeście są względne (paczka ma `/favicon.ico` itd.), bo do podpięcia domeny strona działa w podkatalogu
  bextip.github.io/landing_page/; `display` zostaje `browser` (paczka: `standalone`) – strona to nie aplikacja.
  Ta sama ikona jest na karcie w oknach przeglądarek (frames.js).
- **Ekrany aplikacji** (`assets/screens/*.svg`) dostosowane do karty 1.4, żeby stare i nowe logo nie stały obok
  siebie: napis w panelu bocznym podmieniony na nowy (`<g transform="translate(21 27.57) scale(0.2)">` w miejscu
  sześciu ścieżek starego logo), limonka `#86C93E` → mięta, granat `#0C2A55` → niebieski. Kolory statusów w Tips&Stats
  (zielony / bursztynowy / czerwony) bez zmian. Gdy platforma dostanie nowy wygląd, podmienić na świeże zrzuty.
  Na ekranie typowania jest napis „obstaw wyniki” – karta każe unikać słowa „obstawiać” (tekst jest krzywymi,
  do poprawy przy nowych zrzutach). Adresy obrazów mają `?v=`, bo plik zmienił się pod tą samą nazwą.
- **Cień pod oknami z ekranami** zmniejszony (Łukasz, 19.11.2026: był za mocny i za duży): jedna warstwa
  `0 18px 40px -14px rgba(28, 79, 149, .36)` zamiast dużego cienia z niebieską poświatą, tak samo w hero
  i w `#inside`; hero bez poświaty w tle; mniejszy cień także w obrazie do podglądu linków.
- **Zasady z karty:** litera x zawsze na kwadracie; nie rozciągać znaku; bez gradientów, cieni i obrysów na znaku;
  pole ochronne co najmniej wysokość litery x. Język: typer, liga, drużyny, ranking, punkty, integracja – unikać słów
  obstawiać, zakład, kurs, kupon, stawka, wygrana pieniężna. Obraz: nie pokazywać kuponów, pieniędzy, żetonów i kart
  (ikona funkcji „Joker” to emoji karty – do decyzji Łukasza).
- **Krój napisu w logo: Sora ExtraBold** (B własne). Karta: Sora do tytułów, Inter do tekstu i liczb – jak na stronie
  (patrz „Czcionki”).
- Czcionki z Google Fonts: **Sora** w nagłówkach (Łukasz, 11.11.2026: krój napisu z logo według karty znaku;
  wcześniej Lexend) i Inter w tekście. Strona ładuje tylko Sora 600 i 700.
  Hasło (h1), tytuły sekcji (h2) i tytuły kart (h3) mają grubość 600, nie 700
  (Łukasz, 10.11.2026: były za ciężkie); ceny w cenniku też 600, numery kroków 700.
- **Szerokość jak na eqrento.com** (Łukasz, 10.11.2026): treść do 1360px (`.wrap`), boczne odstępy `--gutter`
  48px, do 1440px 40px, do 1200px 32px, na telefonach (do 640px) 20px. Przy 1366×768 okno w hero mieści się
  na styk – szerszej treści albo wyższego okna nie da się już dodać bez zmniejszenia okna.
- Główne przyciski: miętowe z niebieskim napisem, płaskie (karta 1.4; wcześniej zielony gradient). **Strzałka na
  końcu** jak na eqrento.com (Łukasz, 10.11.2026): `.btn--arrow` + `<span class="btn__icon">` dodaje na końcu
  niebieskie kółko z białą strzałką (`--ico-arrow`), tekst idzie wtedy w `<span>` (atrybut `data-i18n` na `<span>`,
  nie na `<a>`, bo inaczej zniknęłaby strzałka). Strzałkę mają: przycisk w hero, „Wybierz pakiet” w porównaniu,
  pod Funkcjami i pod Krokami oraz przyciski pakietów; „Wybierz pakiet” w menu – bez strzałki (jak „Book a demo”
  w nagłówku EQrento).
- Ptaszki na listach i w etykietach hero: miętowe kółko z niebieskim ptaszkiem (`--ico-check`).
- Kropki-akcenty (`--dot`) mają 8px – tyle, ile kropka nad „i” w napisie z menu (43px wysokości).
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

`index.html` ładuje `styles.css`, `config.js`, `i18n.js` i `script.js` z wersją w adresie (`?v=20261119a`).
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
