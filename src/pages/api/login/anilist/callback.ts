
import axios from 'axios'
import Cookies from 'cookies'
import { CLIENT_ID_ANILIST, CLIENT_SECRET_ANILIST, ANILIST_CALLBACK } from '../../../../../constants';

export default async function handler(req,res) {
    let code = req.query.code;
    const cookies = new Cookies(req,res);
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
    }).then((res) => res.data).catch((e) => e.response.data);

    if(data.error){
        res.redirect('/')
    }
    else {
        cookies.set('anilist',data.access_token,{
            maxAge: parseInt(data.expires_in),
            httpOnly: true
        });
    
        cookies.set('anilist_refresh',data.refresh_token,{
            maxAge: parseInt(data.expires_in),
            httpOnly: true
        });
    
        res.redirect('/dashboard');
    }
}