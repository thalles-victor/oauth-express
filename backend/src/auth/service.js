const crypto = require("node:crypto");
const jwt = require("../utils/jwt");
const { hashPassword, verifyPassword } = require("../utils/hash");
const {
  getUserInfo,
  exchangeCodeToGetAccessToken,
} = require("../utils/oauth.google");

const users = [
  {
    id: crypto.randomUUID(),
    name: "thalles",
    email: "thalles@gmail.com",
    password: hashPassword("#Senha123"),
  },
];

function buildGoogleOAuthUrlService(state) {
  const permissions = ["openid", "email", "profile"].join(" ");

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: permissions,
    state,
    access_type: "online",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

async function handleGoogleCallbackService(code) {
  const oauthAccessToken = await exchangeCodeToGetAccessToken(code);
  const userInfo = await getUserInfo(oauthAccessToken);

  let user = users.find((u) => u.email === userInfo.email);

  if (!user) {
    user = {
      id: crypto.randomUUID(),
      name: userInfo.name,
      email: userInfo.email,
      password: null,
    };
    users.push(user);
  }

  const token = jwt.generateJWT(
    { sub: user.id, email: user.email },
    process.env.JWT_SECRET || "SECRET",
  );

  return token;
}

function signUpService(name, email, password) {
  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    throw new Error("email já cadastrado");
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    password: hashPassword(password),
  };

  users.push(user);

  const token = jwt.generateJWT(
    { sub: user.id, email: user.email },
    process.env.JWT_SECRET || "SECRET",
  );

  return token;
}

function signInService(email, password) {
  const user = users.find((u) => u.email === email);

  if (user?.password == null) {
    throw new Error("credenciais inválidas");
  }

  if (!verifyPassword(password, user.password)) {
    throw new Error("credenciais inválidas");
  }

  const token = jwt.generateJWT(
    { sub: user.id, email: user.email },
    process.env.JWT_SECRET || "SECRET",
  );

  return token;
}

function getMeService(userId) {
  const user = users.find((u) => u.id === userId);

  if (!user) {
    throw new Error("usuário não encontrado");
  }

  return { id: user.id, name: user.name, email: user.email };
}

module.exports = {
  buildGoogleOAuthUrlService,
  handleGoogleCallbackService,
  signUpService,
  signInService,
  getMeService,
};
