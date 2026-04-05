const express = require("express");
const cookieParser = require("cookie-parser");
const {
  getGoogleOAuthUrlController,
  exchangeGoogleCodeController,
  signUpController,
  signInController,
} = require("./auth/controller");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  return res.status(200).json({ message: "server is running" });
});

app.post("/auth/signup", signUpController);
app.post("/auth/signin", signInController);

app.get("/oauth/google/url", getGoogleOAuthUrlController);
app.post("/oauth/google/exchange", exchangeGoogleCodeController);

app.listen(3000, () => {
  console.log("Servidor is running");
});
