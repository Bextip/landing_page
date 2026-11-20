/* Bextip – wszystkie teksty strony (PL / EN).
   Edycja treści = zmiana tekstu w tym pliku. */
window.BEXTIP_I18N = {
  pl: {
    meta: {
      title: "Bextip – firmowy typer sportowy, który integruje zespół",
      description: "Bextip to automatyczny typer on-line dla firm. Pracownicy typują wyniki wydarzeń sportowych, a wyniki, punkty, tabela i statystyki liczą się same. Z identyfikacją wizualną Twojej firmy, bez instalacji."
    },
    nav: { about: "Czym jest Bextip", features: "Funkcje", how: "Jak to działa", pricing: "Cennik", faq: "FAQ", login: "Zaloguj się", cta: "Wybierz pakiet" },
    hero: {
      badge: "Automatyczny typer on-line dla firm",
      title: "Firmowy typer sportowy, który integruje zespół.",
      lead: "Bextip angażuje i integruje pracowników dzięki emocjonującej zabawie w typowanie na punkty wyników wydarzeń sportowych.",
      lead2: "Wyniki, punkty, tabela i statystyki aktualizują się automatycznie.",
      chip1: "To nie hazard: gra na punkty, bez pieniędzy",
      chip2: "Od {minPrice} za gracza miesięcznie",   // {minPrice} = najniższa cena za gracza z config.js (script.js)
      chip3: "Logo i kolory Twojej firmy",
      chip4: "Start w kilka minut",
      cta: "Wybierz pakiet",
      shotAlt: "Ekran typowania wyników w serwisie Bextip"
    },
    inside: {
      title: "Każdy gracz widzi swoją formę",
      // zdanie i piąty punkt o czacie (Łukasz, 20.11.2026)
      sub: "Bextip to nie tylko samo typowanie. Statystyki, historia typowań i tabele sprawiają, że gracze chętniej wracają po każdym meczu, żeby sprawdzić skuteczność swoją oraz innych graczy. Jest też czat, na którym gracze rozmawiają i wymieniają opinie o wynikach meczów, punktacji i sytuacji w tabeli.",
      items: ["Pozycja w tabeli i suma punktów na żywo", "Średnia punktów na mecz i z Jokera", "Wykres trafionych wyników, zwycięzców i błędnych typów", "Pełna historia typowań – swoich i innych graczy", "Czat dla wszystkich graczy – rozmowy o wynikach i tabeli"],
      shotAlt: "Ekran statystyk gracza w serwisie Bextip"
    },
    about: {
      title: "Integracja na całe rozgrywki, a nie na jeden wieczór",
      // dwa akapity: sub, potem sub2 w nowej linii (<br> w index.html; Łukasz, 20.11.2026)
      sub: "Firmowy typer robi się zwykle w arkuszu, który ktoś musi ręcznie prowadzić – albo zastępuje go jednorazowe wydarzenie, po którym emocje szybko opadają.",
      sub2: "Bextip daje wspólną zabawę na tygodnie, a nawet na miesiące – i nie wymaga od nikogo dodatkowej pracy.",
      a: {
        title: "Typer w arkuszu",
        quote: "„Fajny pomysł, dopóki ktoś nie musi tego liczyć.”",
        items: ["Wyniki i punkty wpisywane ręcznie", "Jedna osoba pilnuje wszystkiego", "Pomyłki i spory o punktację", "Brak czatu i statystyk", "Niewygodne na telefonie"]
      },
      b: {
        tag: "Stworzony dla firm",
        quote: "„Wspólne emocje dla całej firmy – od recepcji po zarząd.”",
        items: ["Wyniki meczów, punkty i tabela liczone automatycznie", "Branding firmy: logo, kolory i własna nazwa gry", "Rywalizacja między wewnętrznymi drużynami (do 4)", "Czat, statystyki i historia typowań", "Działa w każdej przeglądarce, na komputerze i telefonie", "Uruchomienie dosłownie w kilka minut"]
      },
      c: {
        title: "Jednorazowy event",
        quote: "„Świetny wieczór. A w poniedziałek po staremu.”",
        items: ["Jeden dzień zamiast tygodni, a nawet miesięcy emocji", "Trudny do zorganizowania dla zespołów rozproszonych", "Wymaga logistyki i terminu pasującego wszystkim", "Koszt rośnie z każdą osobą", "Nie każdy może wziąć udział"]
      }
    },
    features: {
      title: "Wszystko, czego potrzebuje firmowy typer",
      sub: "Każdy pakiet zawiera pełen zestaw funkcji – pakiety różnią się wyłącznie liczbą graczy.",
      items: [
        { icon: "funkcja-wyniki.svg", t: "Automatyczne wyniki i punkty", d: "Wyniki meczów aktualizują się same, a punkty graczy są zliczane automatycznie: 3 pkt za dokładny rezultat, 1 pkt za wskazanie zwycięzcy." },
        { icon: "funkcja-tabela.svg", t: "Tabela graczy na żywo", d: "Ranking aktualizuje się po każdym meczu. Każdy od razu widzi, kto prowadzi i ile brakuje mu do podium." },
        { icon: "funkcja-branding.svg", t: "Branding Twojej firmy", d: "Logo, kolorystyka i własna nazwa gry." },
        { icon: "funkcja-druzyny.svg", t: "Wewnętrzne drużyny", d: "Podziel graczy na maksymalnie 4 drużyny – działy, oddziały lub biura – i pozwól im rywalizować między sobą." },
        { icon: "funkcja-joker.svg", t: "Joker i zdarzenia Ekstra", d: "Joker podwaja punkty w wybranych meczach, a dodatkowe zdarzenia „Ekstra” podkręcają emocje i mieszają w tabeli." },
        { icon: "funkcja-bonus.svg", t: "Bonus za mistrza", d: "Dodatkowe punkty dla tych, którzy przed startem rozgrywek trafnie wytypują ich zwycięzcę." },
        { icon: "funkcja-czat.svg", t: "Czat dla graczy", d: "Wspólny czat dla wszystkich uczestników – miejsce na komentarze, gratulacje i przyjacielskie docinki." },
        { icon: "funkcja-statystyki.svg", t: "Statystyki i historia typowań", d: "Rozbudowane statystyki graczy, historia typowań oraz opcja ukrycia swoich typów do rozpoczęcia meczu." },
        { icon: "funkcja-jezyki.svg", t: "5 języków, zero instalacji", d: "Polski, angielski, niemiecki, hiszpański i rosyjski. Działa w każdej przeglądarce – bez aplikacji i bez integracji z IT." }
      ]
    },
    how: {
      title: "Od wyboru pakietu do pierwszego typowania w zaledwie cztery kroki",
      // dwa akapity: sub, potem sub2 w nowej linii (<br> w index.html; Łukasz, 20.11.2026)
      sub: "Nie potrzebujesz działu IT, instalacji oprogramowania ani szkolenia.",
      sub2: "Typera Bextip dla wszystkich pracowników uruchomisz dosłownie w kilka minut.",
      steps: [
        { t: "Wybierz pakiet", d: "Dobierz pakiet do liczby graczy i opłać go on-line." },
        { t: "Stwórz grę", d: "Nadaj grze nazwę, wgraj logo i wybierz kolory firmy. Wszystko możesz później zmienić." },
        { t: "Zaproś pracowników", d: "Przekaż graczom 6-cyfrowy kod gry. Rejestracja i dołączenie do gry zajmie im zaledwie minutę." },
        { t: "Typujcie i kibicujcie", d: "Gracze typują wyniki do rozpoczęcia meczu. Wyniki, punkty i tabela liczą się same." }
      ]
    },
    who: {
      title: "Dla kogo jest Bextip?",
      items: [
        { icon: "who-firmy.svg", t: "Właściciele małych i średnich firm", d: "Prosty i niedrogi sposób na lepszą atmosferę w zespole. Uruchamiasz raz – zabawa toczy się sama przez całe rozgrywki." },
        { icon: "who-hr.svg", t: "Działy HR", d: "Gotowe narzędzie do integracji i employer brandingu – także dla zespołów zdalnych, rozproszonych i międzynarodowych." },
        { icon: "who-liderzy.svg", t: "Menedżerowie i liderzy zespołów", d: "Wspólny temat do rozmów i zdrowa rywalizacja między działami, bez odrywania ludzi od pracy." }
      ]
    },
    pricing: {
      title: "Cennik dopasowany do wielkości zespołu",
      // cennik od 20.11.2026 (Łukasz): tylko abonament miesięczny, akcent na cenę za gracza; ceny w config.js
      sub: "Płatność miesięczna – im więcej graczy, tym niższa cena za gracza.",
      sub2: "Każdy pakiet zawiera wszystkie funkcje.",
      // przełącznik nad kafelkami – zawieszony (config.js: billingPeriods); save = znacznik przy „Rocznie” (pusty = bez znacznika)
      billing: { label: "Okres płatności", year: "Rocznie", month: "Miesięcznie", save: "2 mies. gratis" },
      // duża cena „6,45 zł za gracza / miesiąc”, pod nią cena pakietu „129 zł / miesiąc”; bez „netto” (dopisek pod kafelkami)
      // „od” przed cenami (Łukasz, 20.11.2026: niektóre turnieje i rozgrywki będą droższe – podane ceny są minimalne)
      from: "od",
      unitPerPlayer: "za gracza / miesiąc",
      perPeriod: { month: "od {p} / miesiąc", year: "od {p} / rok" },
      // punkty na kafelkach (złote kropki), **…** = pogrubienie; spareAll – Enterprise. „W zapasie, bez dopłaty” zamiast
      // „miękki limit +10%” (Łukasz, 20.11.2026); twarde spacje (U+00A0) – „+2 graczy” i „bez dopłaty” nie rozdzielają się między liniami
      upTo: "do **{n} graczy**",
      spare: "**+{n} graczy** w zapasie, bez dopłaty",
      spareAll: "**+{pct}% graczy** w zapasie, bez dopłaty",
      over: "ponad **{n} graczy**",
      allFeatures: "**wszystkie funkcje** w cenie",
      recommended: "Polecany",
      buy: "Kup pakiet",
      order: "Zamów pakiet",
      ask: "Zapytaj o ofertę",
      orderSubject: "Zamówienie Bextip",
      names: { micro: "Micro", small: "Small", mid: "Mid", large: "Large", enterprise: "Enterprise" },
      includedTitle: "W każdym pakiecie:",
      // „W każdym pakiecie” w sześciu grupach (Łukasz, 20.11.2026 – sugestia audytora): nazwa (t), krótki opis (d) i funkcje
      // (items). Opis widać na komputerze i tablecie, na telefonie same nazwy; przycisk rozwija pełną listę – w każdej grupie
      // zamiast opisu jej funkcje. Funkcje: 19 z PDF-u „Oferta dla firm 2026” w brzmieniu Łukasza (10.11.2026), **…** =
      // pogrubienie jak w PDF-ie. {n} w includedShow = liczba funkcji (script.js liczy ją z grup)
      includedShow: "Pokaż wszystkie funkcje ({n})",
      includedHide: "Zwiń listę funkcji",
      includedGroups: [
        { t: "Automatyczne wyniki i tabele", d: "Wyniki, punkty i tabele liczą się same.", items: [
          "Automatyczna **aktualizacja wyników** rozgrywek",
          "Automatyczne **zliczanie zdobytych punktów** graczy",
          "Automatyczna **aktualizacja tabel** graczy i drużyn"] },
        { t: "Dodatkowe emocje", d: "Bonus za Mistrza, zdarzenia „Ekstra”, Joker i ukryte typy.", items: [
          "Dodatkowe punkty za **wytypowanie Mistrza** rozgrywek",
          "Możliwość typowania **zdarzeń „Ekstra”** w wybranych meczach",
          "Opcja **„Jokera”** (podwojenie zdobytych punktów) w wybranych meczach",
          "Możliwość **ukrycia swoich typowań** do godziny rozpoczęcia meczu"] },
        { t: "Statystyki i historia", d: "Statystyki graczy i pełna historia typowań.", items: [
          "Możliwość sprawdzania **historii typowań** graczy",
          "Rozbudowane **statystyki graczy**"] },
        { t: "Społeczność i drużyny", d: "Czat, własne zdjęcia i do 4 drużyn wewnętrznych.", items: [
          "**Czat** dostępny dla wszystkich graczy",
          "Możliwość wgrania swojego zdjęcia lub avatara",
          "Możliwość podzielenia graczy na maks. **4 wewnętrzne drużyny**"] },
        { t: "Twoja marka", d: "Logo, kolorystyka i własna nazwa gry.", items: [
          "Branding (**logo i kolorystyka**) firmy",
          "**Własna nazwa** gry"] },
        { t: "Dostęp i bezpieczeństwo", d: "Każda przeglądarka, 5 języków, SSL, priorytetowa obsługa i brak reklam.", items: [
          "Dostęp przez **dowolną przeglądarkę** z komputera lub smartfona",
          "**5 wersji językowych** (polska, angielska, niemiecka, hiszpańska, rosyjska)",
          "**Priorytetowa obsługa** użytkowników firmowych",
          "Bezpieczne połączenie protokołem **SSL**",
          "**Brak reklam**"] }
      ],
      note: "Podane ceny są cenami netto. Bezpieczne płatności on-line obsługuje Stripe. Do każdej transakcji wystawiamy fakturę VAT."
    },
    faq: {
      title: "Najczęstsze pytania",
      items: [
        { q: "Jakie rozgrywki można typować?", a: "Bextip obsługuje różne rozgrywki sportowe, np. Ligę Mistrzów UEFA, angielską Premier League, polską Ekstraligę czy amerykański NHL, a także wielkie turnieje, takie jak Mistrzostwa Świata. Dostępne rozgrywki zobaczysz przy tworzeniu gry." },
        { q: "Czy pracownicy muszą coś instalować?", a: "Nie. Bextip działa w każdej przeglądarce internetowej – na komputerze i smartfonie. Nie wymaga instalacji aplikacji ani integracji przez dział IT." },
        { q: "Jak szybko możemy zacząć?", a: "Dosłownie w kilka minut: wybierasz pakiet, tworzysz grę i przekazujesz pracownikom kod zaproszenia. Jeśli chcesz, pomożemy Ci przy każdym kroku." },
        { q: "Jak gracze dołączają do gry?", a: "Administrator gry otrzymuje 6-cyfrowy kod zaproszenia. Pracownik rejestruje się na bextip.com, potwierdza adres e-mail kodem weryfikacyjnym i wpisuje kod gry – to wszystko." },
        { q: "Jak liczone są punkty?", a: "Za dokładnie wytypowany wynik gracz otrzymuje 3 punkty, za wskazanie zwycięzcy – 1 punkt. Liczy się rezultat w regulaminowym czasie gry. Do tego dochodzą punkty za Jokera, zdarzenia Ekstra i bonus za wytypowanie mistrza." },
        { q: "Czy typer może wyglądać jak nasza firma?", a: "Tak. W każdym pakiecie możesz ustawić logo i kolorystykę firmy oraz własną nazwę gry." },
        { q: "Mamy kilka działów lub oddziałów. Czy mogą rywalizować między sobą?", a: "Tak. Graczy można podzielić na maksymalnie 4 wewnętrzne drużyny, które rywalizują ze sobą obok klasyfikacji indywidualnej." },
        { q: "Nasz zespół jest międzynarodowy. W jakich językach działa Bextip?", a: "W pięciu: polskim, angielskim, niemieckim, hiszpańskim i rosyjskim. Każdy gracz wybiera swój język." },
        { q: "Co, jeśli mamy więcej niż 200 graczy?", a: "Wybierz pakiet Enterprise – od 619 zł miesięcznie (netto). Napisz do nas, a przygotujemy ofertę." }
      ]
    },
    footer: {
      about: "Bextip to automatyczny typer on-line stworzony w celu angażowania użytkowników i integrowania społeczności poprzez ekscytujące, wciągające doświadczenie przewidywania rezultatów wydarzeń sportowych.",
      invite: "",
      contactTitle: "Kontakt", siteTitle: "Serwis", appTitle: "Aplikacja",
      login: "Zaloguj się", register: "Załóż konto",
      tagline1: "Stworzone z pasją w", tagline2: "Polsce,", tagline3: "dla zespołów, które typują na", tagline4: "świecie",
      rights: "Wszelkie prawa zastrzeżone.",
      terms: "Regulamin", privacy: "Polityka prywatności", langTitle: "Język"
    }
  },

  en: {
    meta: {
      title: "Bextip – the sports prediction game that brings your team together",
      description: "Bextip is an automated online sports prediction game for companies. Employees predict the results of sporting events while results, points, the leaderboard and statistics update themselves. Your company’s visual identity, no installation."
    },
    nav: { about: "What is Bextip", features: "Features", how: "How it works", pricing: "Pricing", faq: "FAQ", login: "Log in", cta: "Choose a package" },
    hero: {
      badge: "Automated office prediction game",
      title: "The sports prediction game that brings your team together.",
      lead: "Bextip engages and connects your employees through the thrill of predicting the results of sporting events for points.",
      lead2: "Results, points, the leaderboard and statistics update automatically.",
      chip1: "Not gambling: a points game, no money",
      chip2: "From {minPrice} per player a month",
      chip3: "Your company logo and colours",
      chip4: "Live in minutes",
      cta: "Choose a package",
      shotAlt: "Match prediction screen in Bextip"
    },
    inside: {
      title: "Every player can see their form",
      sub: "Bextip is more than just predicting. Statistics, prediction history and leaderboards make players come back after every match to check how they – and everyone else – are doing. There’s also a chat where players talk and swap opinions on match results, scoring and the state of the leaderboard.",
      items: ["Leaderboard position and total points, live", "Average points per match and from the Joker", "Chart of exact scores, correct winners and misses", "Full prediction history – your own and other players’", "Chat for all players – talk about results and the leaderboard"],
      shotAlt: "Player statistics screen in Bextip"
    },
    about: {
      title: "Team building for the whole competition, not just one evening",
      sub: "An office prediction game usually lives in a spreadsheet someone has to run by hand – or gets replaced by a one-off event whose buzz fades fast.",
      sub2: "Bextip gives everyone weeks, or even months, of shared fun – with no extra work for anybody.",
      a: {
        title: "Spreadsheet predictor",
        quote: "“A great idea, until someone has to do the maths.”",
        items: ["Results and points entered by hand", "One person has to run everything", "Mistakes and arguments over scoring", "No chat, no statistics", "Awkward on a phone"]
      },
      b: {
        tag: "Built for companies",
        quote: "“Shared excitement for the whole company – from reception to the boardroom.”",
        items: ["Match results, points and leaderboard calculated automatically", "Company branding: logo, colours and your own game name", "Competition between internal teams (up to 4)", "Chat, statistics and prediction history", "Works in any browser, on desktop and mobile", "Live in literally a few minutes"]
      },
      c: {
        title: "One-off event",
        quote: "“A great evening. Back to normal on Monday.”",
        items: ["One day instead of weeks, or even months, of excitement", "Hard to organise for distributed teams", "Needs logistics and a date that suits everyone", "Cost grows with every person", "Not everyone can take part"]
      }
    },
    features: {
      title: "Everything an office prediction game needs",
      sub: "Every package includes the full feature set – packages differ only in the number of players.",
      items: [
        { icon: "funkcja-wyniki.svg", t: "Automatic results and points", d: "Match results update on their own and points are counted automatically: 3 points for the exact score, 1 point for picking the winner." },
        { icon: "funkcja-tabela.svg", t: "Live leaderboard", d: "The ranking updates after every match. Everyone sees straight away who is leading and how far they are from the podium." },
        { icon: "funkcja-branding.svg", t: "Your company branding", d: "Logo, colours and your own game name." },
        { icon: "funkcja-druzyny.svg", t: "Internal teams", d: "Split players into up to 4 teams – departments, branches or offices – and let them compete against each other." },
        { icon: "funkcja-joker.svg", t: "Joker and Extra events", d: "The Joker doubles points in selected matches, and additional “Extra” events raise the stakes and shake up the table." },
        { icon: "funkcja-bonus.svg", t: "Champion bonus", d: "Bonus points for those who correctly predict the overall winner before the competition starts." },
        { icon: "funkcja-czat.svg", t: "Player chat", d: "A shared chat for all participants – the place for comments, congratulations and friendly banter." },
        { icon: "funkcja-statystyki.svg", t: "Statistics and prediction history", d: "Detailed player statistics, prediction history and the option to hide your picks until kick-off." },
        { icon: "funkcja-jezyki.svg", t: "5 languages, zero installation", d: "Polish, English, German, Spanish and Russian. Works in any browser – no app and no IT integration." }
      ]
    },
    how: {
      title: "From choosing a package to the first prediction in just four steps",
      sub: "No IT department, software installation or training needed.",
      sub2: "You can launch your Bextip game for all your employees in literally a few minutes.",
      steps: [
        { t: "Choose a package", d: "Pick the package that fits your number of players and pay online." },
        { t: "Create your game", d: "Name the game, upload your logo and choose company colours. You can change it all later." },
        { t: "Invite your employees", d: "Share the 6-digit game code with your players. Registering and joining the game takes them just a minute." },
        { t: "Predict and cheer", d: "Players predict scores until kick-off. Results, points and the leaderboard take care of themselves." }
      ]
    },
    who: {
      title: "Who is Bextip for?",
      items: [
        { icon: "who-firmy.svg", t: "Owners of small and medium businesses", d: "A simple, affordable way to lift team spirit. Set it up once – the fun runs itself for the whole competition." },
        { icon: "who-hr.svg", t: "HR departments", d: "A ready-made tool for team building and employer branding – including remote, distributed and international teams." },
        { icon: "who-liderzy.svg", t: "Managers and team leaders", d: "A shared talking point and healthy rivalry between departments, without pulling people away from work." }
      ]
    },
    pricing: {
      title: "Pricing that fits your team size",
      // ceny w euro (config.js); przy przełączniku (zawieszonym) bez znacznika „2 mies. gratis” – roczne ceny w euro były inne
      sub: "Pay monthly – the more players, the lower the price per player.",
      sub2: "Every package includes all features.",
      billing: { label: "Billing period", year: "Yearly", month: "Monthly", save: "" },
      from: "from",
      unitPerPlayer: "per player / month",
      perPeriod: { month: "from {p} / month", year: "from {p} / year" },
      upTo: "up to **{n} players**",
      spare: "**+{n} players** in reserve, at no extra cost",
      spareAll: "**+{pct}% players** in reserve, at no extra cost",
      over: "more than **{n} players**",
      allFeatures: "**all features** included",
      recommended: "Recommended",
      buy: "Buy package",
      order: "Order package",
      ask: "Ask for a quote",
      orderSubject: "Bextip order",
      names: { micro: "Micro", small: "Small", mid: "Mid", large: "Large", enterprise: "Enterprise" },
      includedTitle: "In every package:",
      // grupy jak w wersji polskiej (Łukasz, 20.11.2026)
      includedShow: "Show all features ({n})",
      includedHide: "Hide the feature list",
      includedGroups: [
        { t: "Automatic results and leaderboards", d: "Results, points and leaderboards update on their own.", items: [
          "Automatic **update of results**",
          "Automatic **counting of players’ points**",
          "Automatic **update of the player and team leaderboards**"] },
        { t: "More excitement", d: "Champion bonus, “Extra” events, the Joker and hidden picks.", items: [
          "Bonus points for **predicting the champion** of the competition",
          "Predicting **“Extra” events** in selected matches",
          "**“Joker”** option (double points) in selected matches",
          "Option to **hide your predictions** until kick-off"] },
        { t: "Statistics and history", d: "Player statistics and full prediction history.", items: [
          "Players’ **prediction history**",
          "Detailed **player statistics**"] },
        { t: "Community and teams", d: "Chat, your own photos and up to 4 internal teams.", items: [
          "**Chat** for all players",
          "Upload your own photo or avatar",
          "Split players into up to **4 internal teams**"] },
        { t: "Your brand", d: "Logo, colours and your own game name.", items: [
          "Branding (**company logo and colours**)",
          "**Your own game name**"] },
        { t: "Access and security", d: "Any browser, 5 languages, SSL, priority support and no ads.", items: [
          "Access from **any browser** on desktop or smartphone",
          "**5 languages** (Polish, English, German, Spanish, Russian)",
          "**Priority support** for company users",
          "Secure **SSL** connection",
          "**No ads**"] }
      ],
      note: "All prices are net, in euros (EUR). Secure online payments are handled by Stripe. We issue a VAT invoice for every transaction."
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { q: "Which competitions can we play?", a: "Bextip covers a range of sports competitions, e.g. the UEFA Champions League, the English Premier League, Poland’s Ekstraliga or the American NHL, as well as major tournaments such as the World Cup. You’ll see the available competitions when you create a game." },
        { q: "Do employees have to install anything?", a: "No. Bextip works in any web browser – on desktop and smartphone. No app to install and no integration by your IT department." },
        { q: "How quickly can we start?", a: "In literally a few minutes: choose a package, create your game and share the invitation code with your employees. If you like, we’ll help you with every step." },
        { q: "How do players join the game?", a: "The game administrator gets a 6-digit invitation code. An employee registers at bextip.com, confirms their e-mail with a verification code and enters the game code – that’s all." },
        { q: "How are points awarded?", a: "A player gets 3 points for the exact score and 1 point for picking the winner. The result in regular playing time counts. On top of that come points for the Joker, Extra events and the champion bonus." },
        { q: "Can the game look like our company?", a: "Yes. Every package lets you set your company logo and colours as well as your own game name." },
        { q: "We have several departments or branches. Can they compete with each other?", a: "Yes. Players can be split into up to 4 internal teams that compete alongside the individual ranking." },
        { q: "Our team is international. Which languages does Bextip support?", a: "Five: Polish, English, German, Spanish and Russian. Each player chooses their own language." },
        { q: "What if we have more than 200 players?", a: "Choose the Enterprise package – from €189 a month (net). Write to us and we will prepare an offer." }
      ]
    },
    footer: {
      about: "Bextip is an automated online prediction game designed to engage and bring people together through the exciting and immersive experience of forecasting the outcomes of sporting events.",
      invite: "",
      contactTitle: "Contact", siteTitle: "Site", appTitle: "App",
      login: "Log in", register: "Create an account",
      tagline1: "Made with passion in", tagline2: "Poland,", tagline3: "for teams that predict around the", tagline4: "world",
      rights: "All rights reserved.",
      terms: "Terms", privacy: "Privacy policy", langTitle: "Language"
    }
  }
};
