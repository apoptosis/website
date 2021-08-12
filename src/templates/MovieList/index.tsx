import React, { useCallback, useEffect } from "react"
import Select from 'react-select'

import * as _ from "lodash"

import {
    Box,
    Flex,
    Input,
    Radio,
    RadioGroup,
    Stack,
} from "@chakra-ui/react"
import { MainLayout } from "@layouts"
import { SiteTemplate } from '@SiteTemplate'
import {
    Movie,
    PageTitle,
    SectionTitle,
} from "@ui"


const TitleGroup = { value: "title", label: "Title" }
const DirectorGroup = { value: "director", label: "Director" }
const YearGroup = { value: "year", label: "Year" }


// parse tokens from string, handle double quotes
const parseTokens = (str) => {
    const tokens = []
    let token = ""
    let i = 0
    let inQuotes = false
    while (i < str.length) {
        const c = str[i]
        if (c === '"') {
            if (inQuotes) {
                inQuotes = false
                tokens.push(token)
                token = ""
            } else {
                inQuotes = true
            }
        } else if (c === " " && !inQuotes) {
            tokens.push(token)
            token = ""
        } else {
            token += c
        }
        i += 1
    }
    tokens.push(token)
    return tokens
}


const filterMovies = (movies, tokens) => {
    return movies.filter(movie => {
        const { title, directors, stars, year, plot } = movie.omdb
        const lowerTitle = title.toLowerCase()
        const lowerDirectors = directors.toLowerCase()
        const lowerStars = stars.toLowerCase()
        const lowerPlot = plot.toLowerCase()
        return tokens.some(token => {
            const lowerToken = token.toLowerCase()
            return lowerTitle.includes(lowerToken) ||
            lowerDirectors.includes(lowerToken) ||
            lowerStars.includes(lowerToken) ||
            year.toString().includes(lowerToken) ||
            lowerPlot.includes(lowerToken)
        })
    })
}

const SearchInput = ({ value, onChange, bounceTime }) => {
    const [input, setInput] = React.useState(value)
    const debounced = useCallback(_.debounce(onChange, bounceTime), [onChange, bounceTime])
    const onInput = v => {
        debounced(v)
        setInput(v)
    }

    return <Box
        bg="whitesmoke"
        borderRadius="2px"
        display="flex"
        height="3em"
        justifyContent="center"
        alignItems="center"
        width="100%">
        <Input
            padding=".5em"
            autoFocus
            placeholder="Filter..."
            type="search"
            value={input}
            onChange={(e) => onInput(e.target.value)} />
    </Box>
}

// horizontal radio buttons
const OptionGroup = ({ options, current, onChange, ...props }) => {
    return <RadioGroup
        {...props}
        onChange={onChange}
        value={current}
    >
        <Stack direction="row">
            {options.map(({ label, value }) => <Radio value={value}>{label}</Radio>)}
        </Stack>
    </RadioGroup>
}

const MultiSelect = ({ options, current, onChange, ...props }) => {
    return <>
        <Select isMulti
            styles={{ container: (provided) => ({...provided, ...props })}}
            options={options.map(o => ({ value: o, label: o }))}
            onChange={(e) => onChange([...e.values()].map(v => v.value))}
            value={current.map(d => ({ value: d, label: d}))} />
    </>
}

const getDirectors = (movies) => {
    // reduce movie directors to flat array after splitting on ", "
    return movies.reduce((acc, movie) => {
        if (movie.omdb && movie.omdb.directors) {
            let directors = movie.omdb.directors.split(", ")
            directors = directors.map(director => director.trim())
            acc = acc.concat(directors)
        }
        return acc
    }, [])
}

const getStars = (movies) => {
    // reduce movie stars to flat array after splitting on ", "
    return movies.reduce((acc, movie) => {
        if (movie.omdb && movie.omdb.stars) {
            let stars = movie.omdb.stars.split(", ")
            stars = stars.map(star => star.trim())
            acc = acc.concat(stars)
        }
        return acc
    }, [])
}

const MovieList = SiteTemplate(({context, asset}) => {
    const [directors, setDirectors] = React.useState([])
    const [stars, setStars] = React.useState([])
    const [query, setQuery] = React.useState('')
    const [selectedDirectors, setSelectedDirectors] = React.useState([])
    const [selectedStars, setSelectedStars] = React.useState([])

    const [tokens, setTokens] = React.useState([])
    const [groupBy, setGroupBy] = React.useState<"title" | "year" | "director">("year")
    const [movies, setMovies] = React.useState([])
    const [groupedMovies, setGroupedMovies] = React.useState({})
    const [allMovies, setAllMovies] = React.useState([])

    useEffect(() => {
        // http fetch url at context.movie_json as json
        const fetchMovies = async () => {
            const { movie_json } = context
            const response= await fetch(movie_json) 
            const data = await response.json()
            setAllMovies(data.filter(m => !!m.omdb))
        }
        fetchMovies()
    }, [context.movie_json])

    // extract all directors and stars
    useEffect(() => {
        const directors = getDirectors(allMovies)
        const stars =  getStars(allMovies)
        setDirectors(directors)
        setStars(stars)
    }, [allMovies])

    // calculate search tokens
    useEffect(() => {
        const queryParts = [
            ...parseTokens(query),
            ...selectedDirectors,
            ...selectedStars,
        ].filter(t => t.length > 0)
        setTokens(queryParts)
    }, [query, selectedDirectors, selectedStars])

    // filter movies
    useEffect(() => {
        if (tokens.length > 0) {
            const filteredMovies = filterMovies(movies, tokens)
            setMovies(filteredMovies)
        } else {
            setMovies(allMovies)
        }
    }, [allMovies, tokens])

    useEffect(() => {
        const groupedMovies = {}

        switch (groupBy) {
            case "title":
                // group by first letter of title
                movies.forEach(movie => {
                    const title = movie.omdb.title.substr(0, 1)
                    if (!groupedMovies[title]) {
                        groupedMovies[title] = []
                    }
                    groupedMovies[title].push(movie)
                })
                break
            case "director":
                movies.forEach(movie => {
                    const directors = movie.omdb.directors.split(", ")
                    directors.forEach(director => {
                        director = director.trim() || "Unknown"
                        if (!groupedMovies[director]) {
                            groupedMovies[director] = []
                        }
                        groupedMovies[director].push(movie)
                    })
                })
                break
            case "year":
                movies.forEach(movie => {
                    const year = movie.omdb.year
                    if (!groupedMovies[year]) {
                        groupedMovies[year] = []
                    }
                    groupedMovies[year].push(movie)
                })
                break
            default:
        }
        setGroupedMovies(groupedMovies)
    }, [movies, groupBy])

    const Movies = ({ movies }) => movies.map(asset =>
        <Movie key={asset.omdb.id} data={asset.omdb} />
    )

    const GroupedMovies = () => <>
        {Object.keys(groupedMovies)
            .sort()
            .filter(key => {
                if (groupBy === "director") {
                    if (selectedDirectors.length === 0)
                        return true
                    if (selectedDirectors.includes(key))
                        return true
                    return false
                }
                return true
            })
            .map(key =>
                <Box key={key}>
                    <SectionTitle>{key}</SectionTitle>
                    <Movies movies={groupedMovies[key]} />
                </Box>
            )}
    </>

    const SearchLabel = ({ children }) => <Box width="7em" textAlign="right">{children}</Box>

    return (
        <MainLayout context={context} asset={asset} >
            <PageTitle>{asset.title}</PageTitle>
            <h2>{asset.subtitle}</h2>
            <SearchInput value={query} onChange={setQuery} bounceTime={300} />
            <Flex alignItems="center">
                <SearchLabel>Directors: </SearchLabel>
                <MultiSelect flexGrow={1} current={selectedDirectors} onChange={setSelectedDirectors} options={directors} />
            </Flex>
            <Flex alignItems="center">
                <SearchLabel>Actors: </SearchLabel>
                <MultiSelect flexGrow={1} current={selectedStars} onChange={setSelectedStars} options={stars} />
            </Flex>

            <Flex height="3em" alignItems="center">
                <SearchLabel>Group by: </SearchLabel>
                <OptionGroup 
                    paddingLeft="1em"
                    current={groupBy}
                    options={[YearGroup, TitleGroup, DirectorGroup]} 
                    onChange={(value) => { setGroupBy(value) }} />
            </Flex>
            
            <GroupedMovies />
        </MainLayout>
    )
})

export default MovieList