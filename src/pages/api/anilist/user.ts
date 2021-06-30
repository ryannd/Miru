const fetch = require('node-fetch');
const ANILIST_API = 'https://graphql.anilist.co'

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

async function fetchData(req,res,query){
    let options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + req.cookies.anilist,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query
        })
    };

    let data =  await fetch(ANILIST_API, options).then(handleResponse).then(handleData).catch(handleError)

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