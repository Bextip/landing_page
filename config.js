/* Bextip – konfiguracja pakietów i płatności.
   Ceny: netto, jednorazowo za jedną grę na wybrane rozgrywki (wg „Oferta dla firm 2026”).
   Ten sam cennik obowiązuje dla wszystkich rozgrywek: MŚ 2026, Liga Mistrzów 2026/27
   (potwierdzone 10.11.2026).
   Po skonfigurowaniu Stripe wklej w polu "stripe" adres Payment Link
   danego pakietu (Stripe Dashboard → Payment Links).
   Pusty link = przycisk otwiera e-mail z zamówieniem. */
window.BEXTIP_CONFIG = {
  contactEmail: "kontakt@bextip.com",
  phone: "+48 603 197 858",
  appUrl: "https://bextip.com/login",
  plans: [
    { id: "p20",  players: 20,  price: 850,  stripe: "" },
    { id: "p30",  players: 30,  price: 1150, stripe: "" },
    { id: "p50",  players: 50,  price: 1690, stripe: "", recommended: true },
    { id: "p100", players: 100, price: 2850, stripe: "" },
    { id: "p250", players: 250, price: 3950, stripe: "" },
    // Bez limitu: 3950 zł + 1,25 zł / os. – cena zmienna, zamówienie przez kontakt
    { id: "unlimited", players: null, price: 3950, perPlayer: 1.25, stripe: null }
  ]
};
