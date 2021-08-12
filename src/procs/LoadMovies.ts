import fs from 'fs'
import path from "path"

import * as rc from "typed-rest-client"

import { Processor, SetTitle } from "@flapper/gatsby-source-flapper"


const imdb_token = process.env.IMDB_TOKEN

const user_agent =
    'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'

const client =
    new rc.RestClient(user_agent, 'http://www.omdbapi.com/')

const cachePath =
    path.join(process.cwd(), '.site-cache/movies/')

const getCachePath = (slug: string) =>
    path.join(cachePath, slug + '.json')

const getCached = (slug: string) => {
    const fileName = getCachePath(slug)
    // check if file exists
    if (fs.existsSync(fileName)) {
        const data = fs.readFileSync(fileName, 'utf8')
        return JSON.parse(data)
    }
    return null
}

const fetchMovieDetails = async (imdb_id: string) => {
    const url = `https://imdb-api.com/en/API/Title/${imdb_token}/${imdb_id}/FullCast,Posters,Ratings,`
    const response = await client.get(url)
    const data = response.result as any
    const { id, title, year, directors, plot, posters, stars, runtimeStr  } = data
    return { id, title, year, directors, plot, posters: posters.posters, stars, runtimeStr }
}

const fetchMoveData = async (slug: string, title: string, year: string = null) => {
    // url encode title
    title = encodeURIComponent(`${title}${year ? ` ${year}` : ''}`)
    const url = `https://imdb-api.com/en/API/SearchMovie/${imdb_token}/${title}`
    const response = await client.get(url)
    if (response.result) {
        const results = response.result['results']
        const data = results[0]
        const { id } = data
        const details = await fetchMovieDetails(id)
        const filePath = getCachePath(slug)
        // check cachePath directory exists
        if (!fs.existsSync(cachePath)) {
            fs.mkdirSync(cachePath, { recursive: true })
        }
        fs.writeFileSync(filePath, JSON.stringify(details))
        return details
    }
    return null
}

export const LoadMovies = (): Processor => {
    return async (context, type, assets) => {
        const titler = SetTitle("name", "title", false)
        await titler(context, type, assets)
        for (const asset of assets) {
            const { name, title, year } = asset
            let data = getCached(name)
            if (data === null) {
                data = await fetchMoveData(name, title, year)
            }            
            if (!data) {
                console.log(`No data for movie: ${title}`)
            }
            asset.omdb = data
        }
    }
}