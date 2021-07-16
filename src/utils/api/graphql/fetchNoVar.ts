import { ANILIST_API } from "../../../../constants";

export default async function fetchData(req,res,query){
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
        return data;
    }
    
    function handleError(error) {
        return error;
    }

    return data;
}