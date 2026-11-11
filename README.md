# host-site-kit

**A fast, bilingual showcase website for small holiday-rental hosts — built to turn platform guests into direct, informed bookings, at zero hosting cost.**

Live demo: **[bella-reggio.pages.dev](https://bella-reggio.pages.dev)** · second property: **[/vista-monte](https://bella-reggio.pages.dev/vista-monte)**

Built for two family-run apartments next to Reggio Calabria airport (Italy), and designed to be reused for any host with one to a handful of properties.

---

## What it does

| Feature | Why it matters for a host |
|---|---|
| **Vertical video tour** per property | Guests see the place before booking; works on Google Maps, social and messaging |
| **Book buttons with live ratings** (Airbnb, Booking.com) | The site sends guests to the platforms the host already uses, with no new booking engine to run |
| **Area & transport guide** | Ready-made Google Maps routes, city buses, trains and ferries, linked to official timetables |
| **Guest tips, moderated** | Guests submit tips on the site; they land in a Google Sheet and go live only when the host ticks "Publish" |
| **Italian / English** with automatic language detection | One site for domestic and international guests |
| **SEO-ready** | Structured data (`LodgingBusiness`), canonical URLs, sitemap, Open Graph previews, Search Console verified |
| **Private welcome page** (`/benvenuto`, `noindex`) | Practical info for booked guests, kept out of search results |
| **Multi-property** | Each property is one HTML page sharing one stylesheet and one script |

## Stack

- **Static HTML + one CSS + one JS file.** No framework and no build step: it loads fast on any phone.
- **Cloudflare Pages** for hosting: free tier, unlimited bandwidth, auto-deploy on every push to `main`.
- **Google Apps Script + Google Sheets** as a tiny serverless backend for guest tips:
  - `doPost` saves each tip;
  - `doGet` returns only approved, consented tips;
  - the owner gets an email for each new tip.
- **Privacy by design.** Tips collect no email or phone number, publication requires explicit consent, and the welcome page never contains door codes or Wi-Fi passwords.

```
index.html          property 1 (home)
vista-monte.html    property 2
consigli.html       guest tips blog + submission form
benvenuto.html      private welcome page (noindex)
assets/site.css     shared design system (light theme, CSS variables)
assets/site.js      language switch, map-on-click, approved tips loader
sitemap.xml · robots.txt
```

## Adapt it to another property

1. Copy `vista-monte.html` to `your-property.html`.
2. Update the text, the platform links and ratings, the video and poster, and the JSON-LD block.
3. Add the page to `sitemap.xml` and push. Cloudflare publishes it in under a minute.

Brand colours and fonts live in the `:root` variables at the top of `assets/site.css`.

## Results so far

- Two properties live on one site, with no monthly cost.
- Both pages verified and submitted on Google Search Console and Bing Webmaster Tools.
- A moderated guest-tips flow that the host manages from the Google Sheets phone app.

---

Built by **Andrea Fascì** (data scientist). I help small hosts with booking-data analysis, pricing, and a better online presence.
Open to freelance work: get in touch via [GitHub](https://github.com/andre1012345).
