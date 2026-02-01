# Captchacat - Express.js Demo

Express.js example application demonstrating Captchacat integration.

## Setup

```bash
npm install
npm start
```

Server runs at http://localhost:4242

## Configuration

Edit values in `app.js`:

```javascript
const CAPTCHACAT_API_KEY = "your-api-key";
const CAPTCHACAT_SITE_KEY = "your-site-key";
```

## How It Works

1. The form loads the captcha widget via `<script src="https://challenge.captchacat.com/ray/widget.js">`
2. Widget renders in `<div class="captcha-widget" data-sitekey="...">`
3. On verification, widget adds hidden `captchacat-token` field to form
4. Server validates token by POSTing to `https://challenge.captchacat.com/validate_token`
