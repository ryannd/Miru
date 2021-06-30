
const CLIENT_ID_ANILIST = process.env.REACT_APP_CLIENT_ID_ANILIST
const ANILIST_CALLBACK = "http://localhost:5000/login/anilist/callback"

export default function handler(req,res) {
    res.redirect(`https://anilist.co/api/v2/oauth/authorize?client_id=${CLIENT_ID_ANILIST}&redirect_uri=${ANILIST_CALLBACK}&response_type=code`);
}