import { ANILIST_CALLBACK, CLIENT_ID_ANILIST } from './../../../../../constants';

export default function handler(req,res) {
    res.redirect(`https://anilist.co/api/v2/oauth/authorize?client_id=${CLIENT_ID_ANILIST}&redirect_uri=${ANILIST_CALLBACK}&response_type=code`);
}