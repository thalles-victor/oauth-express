const crypto = require("node:crypto");
const {
  buildGoogleOAuthUrlService,
  handleGoogleCallbackService,
  signUpService,
  signInService,
} = require("./service");

function getGoogleOAuthUrlController(_req, res) {
  const state = crypto.randomUUID();

  res.cookie("oauth_state", state, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 5 * 60 * 1000,
  });

  const url = buildGoogleOAuthUrlService(state);
  return res.redirect(url);
}

async function exchangeGoogleCodeController(req, res) {
  try {
    const { code, state } = req.body;

    if (!code || !state) {
      return res.status(400).json({ message: "code e state são obrigatórios" });
    }

    const storedState = req.cookies?.oauth_state;
    if (!storedState || storedState !== state) {
      return res
        .status(400)
        .json({ message: "state foi expirado ou não foi encontrado" });
    }

    res.cookie("oauth_state", "", { expires: new Date(0) });

    const token = await handleGoogleCallbackService(code);

    return res.status(200).json({ token });
  } catch (err) {
    console.warn("google exchange failed:", err);
    return res.status(401).json({ message: "falha na autenticação com Google" });
  }
}

function signUpController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email e password são obrigatórios" });
    }

    const token = signUpService(name, email, password);

    return res.status(201).json({ token });
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
}

function signInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email e password são obrigatórios" });
    }

    const token = signInService(email, password);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
}

module.exports = {
  getGoogleOAuthUrlController,
  exchangeGoogleCodeController,
  signUpController,
  signInController,
};
