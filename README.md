# Taufer Tales – Frontend

**Taufer Tales Web** is the Angular frontend for managing the books you read, want to read, and review.  
It provides a modern, responsive interface to browse tales, manage your bookshelf, and write reviews.

---

##  Features

-  Manage your personal bookshelf (want to read, reading, read, discontinued)
-  Rate and review tales
-  User authentication (login & registration with confirm password)
-  Multi-language support (EN/DE via `assets/i18n`)

---




## Development

### Prerequisites
- Node.js (>= 18)
- npm (>= 9)

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm start
```
This runs `ng serve --proxy-config proxy.conf.json`.  
The app will be available at **http://localhost:4200**.  
API requests to `/api/*` are proxied to **http://localhost:8080**.

### Build for production
```bash
npm run build
```
Outputs optimized files to `dist/taufer-tales-web/`.

### Run tests
```bash
npm test
```

---

##  Internationalization (i18n)

- English translations: `src/assets/i18n/en.json`
- German translations: `src/assets/i18n/de.json`

---

## Deployment

In production, serve the built files with a static web server (e.g., nginx).  
Example nginx config (simplified):

```nginx
server {
  listen 80;
  server_name taufer-tales.example.com;

  root /var/www/taufer-tales/dist/taufer-tales-web;

  location / {
    try_files $uri /index.html;
  }

  location /api {
    proxy_pass https://backend.example.com;
  }
}
```

---

##  License

This project is licensed under the Apache License. See [LICENSE](LICENSE) for details.
