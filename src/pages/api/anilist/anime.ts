import fetchDataWithVar from "../../../utils/api/graphql/fetchWithVar";

export default async function handler(req,res) {
    let userId = req.cookies.user_id_anilist;
        let query = `
        query($id: Int){
            Media(id: $id, type: ANIME) {
                id
                title {
                    romaji
                    english
                    native
                }
                status
                description
                season
                seasonYear
                episodes
                duration
                coverImage {
                    extraLarge
                }
                bannerImage
                averageScore
                siteUrl
                mediaListEntry {
                    status
                    score
                    progress
                    repeat
                }
            }
        }`

        let variables = {
            id: req.params.id
        }

        let data = await fetchDataWithVar(req,res,query,variables)
        res.send(data);
}

