const CLIENT_ID_MAL = process.env.REACT_APP_CLIENT_ID_MAL
import pkce from 'pkce-challenge'

export default function handler(req,res) {
    res.redirect(`https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${CLIENT_ID_MAL}&code_challenge=${pkce.code_challenge}&state=req42&redirect_uri=${MAL_CALLBACK}`);
}