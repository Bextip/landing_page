/* Bextip – konfiguracja pakietów i płatności.
   Cennik od 11.11.2026 (Łukasz, nowa strategia cenowa): abonament miesięczny (month) albo roczny (year), ceny netto.
   Wersja polska pokazuje ceny w złotych (pln), pozostałe języki w euro (eur) – currencyByLang.
   W złotych cena roczna = 10 × miesięczna (2 miesiące gratis); w euro ceny roczne są inne – celowo (Łukasz potwierdził 11.11.2026),
   dlatego wersja angielska nie pisze o „2 miesiącach gratis”.
   perPlayer = cena za gracza miesięcznie przy płatności rocznej – wpisana tak, jak podał Łukasz (nie liczona).
   softLimit = miękki limit: tyle graczy ponad limit pakietu bez dopłaty (10% → +2 / +5 / +10 / +20).
   Pakiety z limitem graczy (players) to kafelki w rzędzie (4 – tyle mieści układ); Enterprise (players: null, ceny „od”)
   jest pod nimi na całą szerokość, z wyceną indywidualną i przyciskiem „Zapytaj o ofertę”.
   recommended: true wyróżnia pakiet (kafelek z gradientem i etykietą „Polecany”) – Mid (Łukasz, 11.11.2026).
   Stripe: wklej adresy Payment Links (Stripe Dashboard → Payment Links) – osobno dla płatności miesięcznej i rocznej,
   w każdej walucie. Pusty link = przycisk otwiera e-mail z zamówieniem (pakiet, okres i waluta w temacie).
   Poprzedni cennik (do 11.11.2026): jednorazowo za grę na wybrane rozgrywki – Pakiet 20 / 30 / 100 / 250 (850 /
   1150 / 2850 / 3950 zł) i Bez Limitu (3950 zł + 1,25 zł za osobę). */
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
  softLimit: 0.1,
  plans: [
    { id: "micro", players: 20,
      pln: { month: 99, year: 990, perPlayer: 4.13 }, eur: { month: 29, year: 239, perPlayer: 0.99 },
      stripe: { pln: { month: "", year: "" }, eur: { month: "", year: "" } } },
    { id: "small", players: 50,
      pln: { month: 199, year: 1990, perPlayer: 3.32 }, eur: { month: 59, year: 479, perPlayer: 0.79 },
      stripe: { pln: { month: "", year: "" }, eur: { month: "", year: "" } } },
    { id: "mid", players: 100, recommended: true,
      pln: { month: 299, year: 2990, perPlayer: 2.49 }, eur: { month: 89, year: 689, perPlayer: 0.57 },
      stripe: { pln: { month: "", year: "" }, eur: { month: "", year: "" } } },
    { id: "large", players: 200,
      pln: { month: 499, year: 4990, perPlayer: 2.08 }, eur: { month: 149, year: 1199, perPlayer: 0.50 },
      stripe: { pln: { month: "", year: "" }, eur: { month: "", year: "" } } },
    // Enterprise: ponad 200 graczy, ceny „od”, wycena indywidualna – zamówienie przez kontakt
    { id: "enterprise", players: null,
      pln: { month: 790, year: 7900 }, eur: { month: 179, year: 1990 },
      stripe: null }
  ]
};
