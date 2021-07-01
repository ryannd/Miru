import axios from 'axios'
import querystring from 'querystring'
import pkce from 'pkce-challenge'
import Cookies from 'cookies'
import { CLIENT_ID_MAL, CLIENT_SECRET_MAL, MAL_CALLBACK } from '../../../../../constants';

export default async function handler(req,res) {
    let code = req.query.code;
    const cookies = new Cookies(req,res);
    const data = await axios({
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: 'https://myanimelist.net/v1/oauth2/token',
        method: 'POST',
        data: querystring.stringify({
            'grant_type': 'authorization_code',
            'client_id': CLIENT_ID_MAL,
            'client_secret': CLIENT_SECRET_MAL,
            'redirect_uri': MAL_CALLBACK, 
            'code': code,
            'code_verifier': pkce().code_challenge
        })
    }).then((res) => res.data);

    cookies.set('mal',data.access_token,{
        maxAge: parseInt(data.expires_in),
        httpOnly: true
    });

    cookies.set('mal_refresh',data.refresh_token);

    res.send(data);
}