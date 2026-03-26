const express = require("express");
const path = require("path");

const app = express();

// Configuration - update these values for your setup
const BYEBOT_API_KEY = "";
const BYEBOT_SITE_KEY = "bd1cc81b04564d3f899e"; // Just an example sitekey so the widget shows up
const PORT = 4242;

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

// Validate CAPTCHA token
async function validateCaptchaToken(token) {
  try {
    const response = await fetch("https://challenge.byebot.de/validate_token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: BYEBOT_API_KEY, token }),
    });
    if (response.ok) {
      return { valid: true };
    }
    return { valid: false, message: `Server error: ${response.status}` };
  } catch (error) {
    return { valid: false, message: error.message };
  }
}

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    siteKey: BYEBOT_SITE_KEY,
    error: null,
  });
});

app.post("/submit", async (req, res) => {
  const { username, password, "byebot-token": token } = req.body;

  if (!token) {
    return res.render("index", {
      siteKey: BYEBOT_SITE_KEY,
      error: "Please complete the CAPTCHA",
    });
  }

  const result = await validateCaptchaToken(token);

  if (result.valid) {
    return res.render("result", {
      success: true,
      username,
      message: "Login successful!",
    });
  }

  res.render("index", {
    siteKey: BYEBOT_SITE_KEY,
    error: `CAPTCHA validation failed: ${result.message || "Unknown error"}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
