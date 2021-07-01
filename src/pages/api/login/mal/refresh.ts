import axios from 'axios'
import querystring from 'querystring'
import { CLIENT_ID_MAL, CLIENT_SECRET_MAL } from '../../../../../constants';

export default async function handler(req,res) {
    const data = await axios({
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: 'https://myanimelist.net/v1/oauth2/token',
        method: 'POST',
        data: querystring.stringify({
            'grant_type': 'refresh_token',
            'refresh_token': req.cookies['mal_refresh'],
            'client_id': CLIENT_ID_MAL,
            'client_secret': CLIENT_SECRET_MAL
        })
    }).then((res) => res.data);
    
    res.cookie('MAL Token',data.access_token,{
        maxAge: parseInt(data.expires_in),
        httpOnly: true
    });
    res.cookie('MAL Refresh Token',data.refresh_token);

    res.send(data);
}