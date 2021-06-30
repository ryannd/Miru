import fetchDataWithVar from "../../../utils/api/graphql/fetchWithVar";

const fetch = require('node-fetch');
const ANILIST_API = 'https://graphql.anilist.co'

export default async function handler(req,res) {
    if(!req.cookies.anilist) {
        res.redirect('http://localhost:5000/login/anilist');
    }
    else {
        let userId = req.cookies.user_id_anilist;
        console.log(userId);
        let query = `
        query($userId: Int){
            MediaListCollection(userId: $userId , status_in: [CURRENT,PLANNING,COMPLETED,DROPPED,PAUSED], type: ANIME) {
                lists {
                    name
                    entries {
                        media {
                            id
                            title {
                                english
                                romaji
                            }
                            description
                            season
                            seasonYear
                            episodes
                            duration
                            coverImage {
                                extraLarge
                            }
                            bannerImage
                            siteUrl
                        }
                        score
                        progress
                        status
                    }
                }
            }
        }`

        let variables = {
            userId: userId
        }

        let data = await fetchDataWithVar(req,res,query,variables)
        res.send(data);
    }
}
