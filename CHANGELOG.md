# v2.7.0

-   Switch to `kjua-revived` for qr codes
-   Add auth config option
-   Render changelog at build time

# v2.6.1

-   Fix internal error caused by incorrect timestamp

# v2.6.0

-   Use better mocking system in dev
-   Utilise KV expiration to automatically delete old links

# v2.5.0

-   Make QR Codes follow the theme colour
-   Fix modal width on mobile
-   Add QR Code image option

# v2.4.0

-   Make short links be alphanumeric
-   Make links case insensitive
-   Fix skeleton animation not being removed on qr codes
-   Fix not reloading data after account uuid changes

# v2.3.2

-   Update PWA icons

# v2.3.1

-   Fix style issue with link cards on mobile
-   Remove destination link length limit in a link card
-   Fix issue with CSRF and SW in **dev**

# v2.3.0

-   Prevent robots indexing a short link
-   Make short a PWA
-   Add a QR code to the link cards
-   Add visual confirmation that you copied a link
-   Show the same link card when you create a new link
-   Improve link card design in account/create page
-   Created a more intuitive nav

# v2.2.0

-   Add title to page
-   Update favicon
-   Fix the `account:link_id` mapping not being removed
-   Add missing titles (tooltips) to buttons

# v2.1.2

-   Update deps
-   Fix bug leaking links

# v2.1.1

-   Add robots.txt
-   Fix colours

# v2.1.0

-   Add Changelog
-   Tooltips on nav items

# v2.0.0

-   Update deps
-   Remove need for separate backend worker
-   Improve uuid change ux
-   Update documentation
-   Truncate links on account page
-   Properly remove keys in places
-   Add no links made hint
-   Colour personalisation

# v1.0.0

Initial Release
