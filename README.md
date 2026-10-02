# Falah

A calm, mobile-friendly prayer times app: prayer times, fasting countdowns, a Qibla compass, and a Tasbeeh Garden that grows as you make dhikr. It works offline and can be installed to your home screen.

**Live app:** https://queen-haliyas.github.io/falah/

> **Level 1 · App #2** of my 20-app learning series.

## Features

**Prayer times**
- Today's Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha, with the next prayer highlighted and a live countdown.
- Hijri date shown alongside today's date.
- A scrollable monthly timetable with Hijri dates, today highlighted, and month-by-month navigation.
- Your location from the browser's geolocation, with a city-name search as a fallback. Your choice is remembered.
- Choose from 23 calculation methods (Muslim World League, ISNA, Moonsighting Committee, Umm al-Qura and more) or "Automatic", plus Standard or Hanafi Asr.

**Fasting**
- Suhoor end (Fajr) and Iftar (Maghrib) with a live countdown and a progress bar for the fast.
- In Ramadan, the Fasting tab becomes the main focus automatically: it opens first, gets a gold highlight, and a countdown strip appears on the Prayer tab.

**Qibla**
- Bearing and distance to the Kaaba from your location.
- A live compass using your phone's sensor, with a "Turn X° left/right" hint and a highlight when you face the Qibla.

**Tasbeeh Garden**
- A large, easy-to-tap counter with a progress ring. Choose SubhanAllah, Alhamdulillah, Allahu Akbar, La ilaha illallah, Astaghfirullah, Salawat, or your own custom dhikr, shown in Arabic with transliteration and meaning.
- Targets of 33, 99, 100 or a custom number. A gentle vibration on each tap and a stronger one when you reach your target.
- Every tasbeeh grows an animated SVG garden: bare soil, then seeds, sprouts, grass, wildflowers, bushes, trees, butterflies, birds, and finally a flowing fountain.
- Today's count, an all-time total and a daily dhikr streak.
- If you miss several days the garden wilts gently, and it recovers as you return.
- No sounds and no flashing effects.

**Offline mode and install**
- A service worker keeps the app available without a connection.
- The current and next month of prayer times are saved in localStorage, so countdowns, fasting times and the month view keep working offline.
- A small "Offline — using saved times" note appears when you're offline.
- Changing the calculation or Asr method re-fetches the times. If you're offline at that moment, the old times keep working until you reconnect.
- A web app manifest and icons let you install Falah to your home screen.

**Design**
- Light and dark themes (follows your device, or choose one), bottom navigation, and a calm cream-and-sage look.
- Respects the "reduce motion" setting.

## Tech

- Plain HTML, CSS and JavaScript. No frameworks, no build step, and the whole app is one `index.html`.
- [Aladhan API](https://aladhan.com/prayer-times-api) for prayer times, the monthly calendar and Hijri dates.
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) for city search, and [BigDataCloud](https://www.bigdatacloud.com/free-api/free-reverse-geocode-to-city-api) for naming your location.
- Browser APIs: Geolocation, DeviceOrientation (compass), Vibration, `Intl` (time zones), `localStorage`.
- Inline SVG and CSS animation for the garden and compass.
- Service Worker, Cache API and a Web App Manifest for offline use and installation.

## Run it locally

Service workers and installation need `http://localhost` or `https://`, so serve the folder rather than opening the file directly:

```bash
python -m http.server 8000
```

Then open http://localhost:8000. For offline mode, load it once while online, reload once, then try it with the network off.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole app: markup, styles and scripts |
| `sw.js` | Service worker that caches the app files |
| `manifest.json` | Web app manifest for installing to the home screen |
| `icons/` | App icons (192, 512, maskable, Apple touch, SVG) |

All paths are relative, so the app works from a subfolder such as GitHub Pages' `/falah/`.

## Build log

1. **Core app.** Aladhan API for prayer times, geolocation with a city-search fallback, highlight of the next prayer, live countdown, location saved in localStorage.
2. **Settings.** Calculation method and Asr method, saved. Found that Aladhan's city lookup returns wrong coordinates, so city search now uses the Open-Meteo geocoder and Aladhan is only used for times.
3. **Fasting, timetable, Qibla.** Bottom navigation, Ramadan auto-focus, monthly timetable, a Qibla compass, and light/dark themes.
4. **Tasbeeh Garden.** Counter, dhikr choices, targets, vibration, streaks and an animated SVG garden that grows, wilts and recovers.
5. **Offline and install.** Service worker, two months of saved times with a fallback note, re-fetch on settings change, manifest and icons. Tested with a simulated offline page and a service worker harness. Not yet tested on a real phone.

## License

[MIT](LICENSE)
