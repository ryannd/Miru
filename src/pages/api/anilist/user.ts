import fetchData from "../../../utils/api/graphql/fetchNoVar";
import Cookies from 'cookies'

export default async function handler(req,res) {
    const cookie = new Cookies(req,res)
    let query = `
        query {
            Viewer {
                id,
                name,
                avatar{
                    large
                },
                bannerImage,
                statistics {
                    anime {
                        count,
                        meanScore,
                        minutesWatched,
                        episodesWatched
                    }
                },
                siteUrl
            }
        }
    `;
    let data = await fetchData(req,res,query);
    cookie.set('user_id_anilist', data.data.Viewer.id);
    res.send(data);
}

