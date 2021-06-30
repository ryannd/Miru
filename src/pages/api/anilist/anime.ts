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
}

async function fetchDataWithVar(req,res,query,variables){
    let options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + req.cookies.anilist,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

    let data = await fetch(ANILIST_API, options).then(handleResponse).then(handleData).catch(handleError)

    function handleResponse (response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleData(data) {
        console.log(data);
        return data;
    }
    
    function handleError(error) {
        console.log(error);
        return error;
    }

    return data;
}