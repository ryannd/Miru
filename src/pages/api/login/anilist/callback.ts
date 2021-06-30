
const axios = require('axios');

const CLIENT_ID_ANILIST = process.env.REACT_APP_CLIENT_ID_ANILIST
const ANILIST_CALLBACK = "http://localhost:5000/login/anilist/callback"
const CLIENT_SECRET_ANILIST = process.env.REACT_APP_CLIENT_SECRET_ANILIST

export default async function handler(req,res) {
    let code = req.query.code;
    const data = await axios({
        url: 'https://anilist.co/api/v2/oauth/token',
        method: 'post',
        data: {
            'grant_type': 'authorization_code',
            'client_id': CLIENT_ID_ANILIST,
            'client_secret': CLIENT_SECRET_ANILIST,
            'redirect_uri': ANILIST_CALLBACK, 
            'code': code
         }
    }).then((res) => res.data).catch((e) => res.status(401).send("Authentication Failed."));

    res.cookie('anilist',data.access_token,{
        maxAge: parseInt(data.expires_in),
        httpOnly: true
    });

    res.cookie('anilist_refresh',data.refresh_token,{
        maxAge: parseInt(data.expires_in),
        httpOnly: true
    });

    res.redirect('api/anilist/user');
}