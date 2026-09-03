# Shokat Ali Motors - Car Showroom Website

Premium car showroom website with Admin Panel for managing cars and uploading pictures.

## Features

- Modern responsive design
- Car inventory with New/Used badges
- Contact form (redirects to WhatsApp)
- **Admin Panel** (password protected)
  - Add / Delete cars
  - Upload car pictures
  - Update About section image
- Floating WhatsApp button
- Mobile friendly

## Admin Login

1. Open the website
2. Click **Admin Login** in the footer (or go to `#admin`)
3. Password: `admin123`

## How to use Admin

- **Add New Car**: Fill name, details, price, badge + optional photo
- **Upload Photo**: Click "Upload Photo" on any existing car
- **Delete Car**: Remove any car from inventory
- **About Image**: Change the image in About section

> Note: Pictures are saved in browser localStorage (same device/browser).

## How to run

Just open `index.html` in any browser.  
No server required.

## Deploy on GitHub Pages

1. Upload these files to a new GitHub repository
2. Go to **Settings → Pages**
3. Select branch `main` and folder `/ (root)`
4. Your site will be live at `https://yourusername.github.io/repo-name`

## Change Admin Password

Open `script.js` and change this line:

```js
const ADMIN_PASSWORD = "admin123";
```

## Contact

- Phone / WhatsApp: +92 306 3178718
