# Toskánsko 2026 – průvodce účastníka

Offline webová aplikace (PWA) pro účastníky akce **Moto Premium d’Italia 2026** (8.–11. 10. 2026, Villa Boscarello, Toskánsko).
Obsah je sestaven z Event Booku, Informačního balíčku a Info Sheetu 05 (CZ).

## Co umí

- **Teď** – co právě probíhá, co je další a za jak dlouho, odpočet do odletu, počasí u vily, rychlé kontakty.
- **Program** – všechny čtyři dny jako road book: časy, místa, popisy zastávek, fotky, jídelníček, odkaz do Map, vlastní poznámky.
- **Mapa** – schematická mapa obou tras a zastávek, funguje bez signálu.
- **Vozy** – 12 vozů flotily se specifikacemi, „Moje garáž“ (vyzkoušeno x / 8), vylosovaná skupina vozů pro každý den.
- **Info** – kontakty (volat / WhatsApp), seznam věcí s sebou, pravidla pro řidiče, vila, jídlo a pití, průvodce po vínech a kuchyni, pár slov italsky.
- **Offline** – service worker uloží stránku, fotky i ikony při prvním otevření.
- **Náhled v čase** – v Info → Aplikace a nastavení lze nasimulovat libovolný okamžik cesty.

Vše, co si v aplikaci zaškrtnete nebo napíšete, se ukládá jen v telefonu (localStorage).

## Zveřejnění přes GitHub Pages

1. Settings → Pages → *Build and deployment* → Source: **Deploy from a branch**.
2. Vyberte větev s aplikací a složku **/ (root)**, uložte.
3. Za minutu běží na `https://<uživatel>.github.io/TRIP/`.

## Instalace do telefonu

Otevřete adresu jednou s internetem a pak:

- **iPhone (Safari):** Sdílet → Přidat na plochu.
- **Android (Chrome):** ⋮ → Instalovat aplikaci.

## Úpravy

Data (program, jídelníček, vozy, kontakty, mapa) jsou na začátku skriptu v `index.html` (`DAYS`, `ITEMS`, `MENUS`, `CARS`, `CONTACTS`, `PLACES`).
Po změně souborů zvyšte `VERSION` v `sw.js`, aby si telefony stáhly novou verzi.
