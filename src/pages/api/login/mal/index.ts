import pkce from 'pkce-challenge'
import { CLIENT_ID_MAL, MAL_CALLBACK } from '../../../../../constants';

export default function handler(req,res) {
    res.redirect(`https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${CLIENT_ID_MAL}&code_challenge=${pkce().code_challenge}&state=req42&redirect_uri=${MAL_CALLBACK}`);
}