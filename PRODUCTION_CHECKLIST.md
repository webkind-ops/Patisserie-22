# Patisserie'22 Production Launch Checklist

This document outlines everything completed by the automated production readiness audit and the remaining manual steps required before or after launch.

## A. Things Already Completed Automatically by Code

1.  **SEO Metadata**: Added unique <title> and <meta name="description"> across important routes (Home, Menu, Gifting, Festive).
2.  **Open Graph & Twitter Cards**: Implemented dynamic Open Graph (og:title, og:image, og:url, etc.) and Twitter card metadata for rich social sharing.
3.  **LocalBusiness JSON-LD Schema**: Implemented full Bakery structured data in the useSEO hook, utilizing dynamic data from ppConfig.ts.
4.  **Performance Optimization**: 
    - Added loading="lazy" to product images, gifting hampers, and festive occasion images to improve LCP and initial load time.
    - Preserved high priority loading for above-the-fold hero content.
5.  **Centralized Configuration**: All store details (phone, WhatsApp, hours, links) are now centralized in src/constants/appConfig.ts.
6.  **Production URLs**: Purged all localhost and 127.0.0.1 URLs from the production configuration. Everything defaults strictly to https://patisserie22.in.
7.  **Sitemap & Robots.txt**: Created public/sitemap.xml mapping the core production routes and a public/robots.txt pointing to it.
8.  **QR Code**: Generated a fresh QR code targeting https://patisserie22.in/menu.

## B. Things You Must Manually Configure

Right now, the codebase uses placeholders for your physical address and map coordinates because I didn't have them.
You must update src/constants/appConfig.ts with:
- The actual physical address of the bakery.
- Actual business hours (if different from 11 AM - 10 PM).
- Your official Instagram link.

You must also update src/hooks/useSEO.ts with:
- The actual latitude and longitude of the bakery in the JSON-LD schema (currently "28.5355", "77.1558").

## C. Things the Client Must Provide

- **Actual Product Images**: The codebase is ready. Once they provide photos, name them properly and replace the placeholders in public/images/.
- **Actual Menu Excel/CSV**: Once provided, update the menu.json via the parsing script.
- **Brand Logo**: Ensure the high-res logo is saved at public/images/patisserie-22-logo.jpg (used for SEO).

## D. Things to do inside GoDaddy

*Completed!* The DNS A record and CNAME have been correctly configured to point to Vercel. No further action needed here unless the domain expires.

## E. Things to do inside Vercel

*Completed!* The domain patisserie22.in is actively assigned and redirecting from the apex to www (or vice versa). 
- Ensure you have a standard SPA rewrite rule configured in ercel.json (which we added previously: {"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]}).

## F. Things to do inside Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property**.
3. Choose **Domain** and enter patisserie22.in.
4. Google will give you a TXT record. Go back to GoDaddy DNS and add this TXT record to verify you own the domain.
5. Once verified, go to **Sitemaps** in the left menu.
6. Enter https://patisserie22.in/sitemap.xml and click Submit.
7. Click **URL Inspection**, enter https://patisserie22.in/, and click **Request Indexing**.

## G. Things to do inside Google Business Profile

1. Log into your Google Business Profile manager.
2. Ensure the "Website" button points EXACTLY to https://patisserie22.in.
3. Ensure the phone number matches the one in ppConfig.ts (+917011352004).
4. Ensure the opening hours exactly match what is displayed on the website.

## H. How to Replace Images Later

When the client sends actual photos:
1. Optimize the photos to JPEG or WebP (keep them under 200KB each if possible).
2. For products, place them in public/images/products/ and update the image path in your menu.json data.
3. For hampers, replace public/images/hampers/hamper1.jpg etc. 
4. The website will automatically use the new images without breaking layout due to the responsive aspect-ratio classes we used.

## I. How to Update Menu Data Later

1. Add your new menu Excel/CSV to the scripts/ folder.
2. Run your existing data parser script.
3. The website reads directly from menu.json, so no React code needs to change.

## J. How to Regenerate the QR Code (If Needed)

The QR code is already pointing to https://patisserie22.in/menu.
If you ever change the domain again:
1. Open terminal in the website folder.
2. Run 
pm run generate-qr.
3. The new QR code will be saved at public/qr/menu-qr.png.

## K. How to Test the Website on Mobile

1. Simply open https://patisserie22.in on your actual phone.
2. Test the swipe gestures on the Gifting carousel.
3. Test the Category Tabs horizontal scroll on the Menu page.
4. Click the "Add to Cart" and checkout button to verify the WhatsApp redirect opens correctly.

## L. How to Run Lighthouse

1. Open Google Chrome.
2. Go to https://patisserie22.in (Do NOT test on localhost for final numbers, as Vercel's CDN and compression affect the score).
3. Open Developer Tools (F12) -> Go to the **Lighthouse** tab.
4. Select **Mobile** device and click **Analyze page load**.

## M. How to Verify Sitemap / Robots

- Visit https://patisserie22.in/robots.txt
- Visit https://patisserie22.in/sitemap.xml
Both should load as plain text/XML in your browser immediately.

## N. How to Verify Indexing

Go to Google and type: site:patisserie22.in
If your pages show up, Google has successfully indexed the site. (This can take a few days after submitting to Search Console).

## O. Final Pre-Launch Checklist

- [ ] Check the website on Wi-Fi and mobile data.
- [ ] Send a test WhatsApp order to ensure the number receives it.
- [ ] Verify the Instagram link in the footer opens the correct profile.
- [ ] Ensure the Google Maps "Get Directions" link in the footer opens the exact right pin.
- [ ] Post on social media that the new website is live!
