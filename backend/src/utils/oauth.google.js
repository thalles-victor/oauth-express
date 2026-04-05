/**
 * @param {string} accessToken
 * @returns {Promise<string>}
 */
async function exchangeCodeToGetAccessToken(code) {
  const body = new URLSearchParams({
    code: code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const raw = await response.text();
    throw new Error(
      `google token endpoint returned ${response.status}: ${raw}`,
    );
  }

  const result = await response.json();

  return result.access_token;
}

/**
 * @param {string} accessToken
 * @returns {Promise<{ id: string, email: string, name: string }>}
 */
async function getUserInfo(accessToken) {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    const raw = await response.text();
    throw new Error(`google userinfo returned ${response.status}: ${raw}`);
  }

  const info = await response.json();

  // validação (equivalente ao TrimSpace)
  if (!info.id?.trim() || !info.email?.trim()) {
    throw new Error("google userinfo missing required fields");
  }

  return info;
}

module.exports = { getUserInfo, exchangeCodeToGetAccessToken };
