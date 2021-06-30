const Anime = require('4anime-scraper').default;

export default async function handler(req,res) {
    const { title } = req.query;
    let data = await Anime.getAnimeFromSearch(title).then((res) => res);
    res.send(data);
}