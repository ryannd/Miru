const axios = require("axios");
const querystring = require("querystring");
const pkceChallenge = require("pkce-challenge");
const pkce = pkceChallenge(128);

const CLIENT_ID_MAL = process.env.REACT_APP_CLIENT_ID_MAL;
const MAL_CALLBACK = "http://localhost:5000/login/mal/callback";
const CLIENT_SECRET_MAL = process.env.REACT_APP_CLIENT_SECRET_MAL;

export default async function handler(req, res) {
  let code = req.query.code;
  const data = await axios({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    url: "https://myanimelist.net/v1/oauth2/token",
    method: "POST",
    data: querystring.stringify({
      grant_type: "authorization_code",
      client_id: CLIENT_ID_MAL,
      client_secret: CLIENT_SECRET_MAL,
      redirect_uri: MAL_CALLBACK,
      code: code,
      code_verifier: pkce.code_challenge,
    }),
  }).then((res) => res.data);

  res.cookie("mal", data.access_token, {
    maxAge: parseInt(data.expires_in),
    httpOnly: true,
  });

  res.cookie("mal_refresh", data.refresh_token);

  res.send(data);
}
