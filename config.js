/* Bextip – konfiguracja pakietów i płatności.
   Cennik od 20.11.2026 (Łukasz): na start promocji tylko abonament miesięczny (dla rozgrywek ligowych); większe
   turnieje (np. finały MŚ, EURO 2028) – jednorazowe opłaty, poza tym cennikiem. Ceny netto (dopisek pod kafelkami).
   Wersja polska pokazuje ceny w złotych (pln), pozostałe języki w euro (eur) – currencyByLang.
   billingPeriods = okresy płatności: ["month"] – sam miesięczny, przełącznik „Rocznie / Miesięcznie” ukryty. Powrót do
   płatności rocznej (Łukasz: „kiedyś do niego wrócę”): ["year", "month"] (pierwszy jest domyślny), w planach ceny
   year i perPlayerYear, a w stripe linki year. Poprzedni cennik roczny (11–20.11.2026, w złotych 10 × miesięczna,
   „2 mies. gratis”) jest w historii gita.
   perPlayer = cena za gracza miesięcznie – wpisana tak, jak podał Łukasz (nie liczona); na kafelku to duża cena
   (Łukasz, 20.11.2026: akcent na cenę za gracza, bo jest niższa), a cena pakietu za miesiąc stoi pod nią.
   Przed obiema cenami „od”: to ceny minimalne – niektóre turnieje i rozgrywki będą droższe (Łukasz, 20.11.2026).
   softLimit = gracze w zapasie: tyle graczy ponad limit pakietu bez dopłaty (10% → +2 / +5 / +10 / +20).
   Pakiety z limitem graczy (players) to kafelki w rzędzie (4 – tyle mieści układ); Enterprise (players: null) jest pod
   nimi na całą szerokość, z przyciskiem „Zapytaj o ofertę”.
   recommended: true wyróżnia pakiet (niebieski kafelek z etykietą „Polecany”) – Mid (Łukasz, 11.11.2026).
   Stripe: wklej adresy Payment Links (Stripe Dashboard → Payment Links) – na razie tylko miesięczne, w obu walutach
   (8 linków). Pusty link = przycisk otwiera e-mail z zamówieniem (pakiet, okres i waluta w temacie). */
window.BEXTIP_CONFIG = {
  contactEmail: "kontakt@bextip.com",
  phone: "+48 603 197 858",
  appUrl: "https://bextip.com/login",
  registerUrl: "https://bextip.com/register",
  // Języki w rozwijanej liście (nazwa w danym języku, flaga z assets/flags/). Na stronie pojawiają się tylko te,
  // które mają teksty w i18n.js – nowy język = jego teksty w i18n.js pod tym samym kodem.
  languages: [
    { code: "pl", name: "Polski", flag: "pl" },
    { code: "en", name: "English", flag: "gb" },
    { code: "de", name: "Deutsch", flag: "de" },
    { code: "es", name: "Español", flag: "es" },
    { code: "ru", name: "Русский", flag: "ru" }
  ],
  currencyByLang: { pl: "pln" },   // pozostałe języki: "eur"
  billingPeriods: ["month"],
  softLimit: 0.1,
  plans: [
    { id: "micro", players: 20,
      pln: { month: 129, perPlayer: 6.45 }, eur: { month: 39, perPlayer: 1.95 },
      stripe: { pln: { month: "" }, eur: { month: "" } } },
    { id: "small", players: 50,
      pln: { month: 249, perPlayer: 4.98 }, eur: { month: 79, perPlayer: 1.58 },
      stripe: { pln: { month: "" }, eur: { month: "" } } },
    { id: "mid", players: 100, recommended: true,
      pln: { month: 379, perPlayer: 3.79 }, eur: { month: 119, perPlayer: 1.19 },
      stripe: { pln: { month: "" }, eur: { month: "" } } },
    // Large: 499 / 200 = 2,495 – Łukasz podał 2,49 zł (w euro 149 / 200 = 0,745 → 0,75)
    { id: "large", players: 200,
      pln: { month: 499, perPlayer: 2.49 }, eur: { month: 149, perPlayer: 0.75 },
      stripe: { pln: { month: "" }, eur: { month: "" } } },
    // Enterprise: ponad 200 graczy (bez górnej granicy), zamówienie przez kontakt. Ceny jak podał Łukasz 20.11.2026:
    // 619 zł i 2,06 zł za gracza, 189 EUR i 0,69 EUR za gracza – potwierdzone, mimo że 189 / 0,69 ≠ 619 / 2,06
    { id: "enterprise", players: null,
      pln: { month: 619, perPlayer: 2.06 }, eur: { month: 189, perPlayer: 0.69 },
      stripe: null }
  ]
};
