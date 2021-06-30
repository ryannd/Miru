import fetchData from "../../../utils/api/graphql/fetchNoVar";

export default async function handler(req,res) {
    if(!req.cookies.anilist) {
        res.redirect('http://localhost:5000/login/anilist');
    }
    else {
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
        res.cookie('user_id_anilist', data.data.Viewer.id);
        res.send(data);
    }
}

