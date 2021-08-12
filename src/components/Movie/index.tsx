import * as React from "react"

import {
    Box,
    Flex,
    Image,
} from "@chakra-ui/react"


const MovieIcon = () => <Box
    width="170px"
    display="flex"
    fontSize="5em"
    justifyContent="center"
    alignItems="center"
>🎥</Box>

const Poster = ({ src }) => {
    return <Image
        bgRepeat="no-repeat"
        maxWidth="170px"
        marginRight="1em"
        src={src} />
}

export const Movie = ({ data }) => (
    data &&
    <Flex alignItems="flex-start">
        <Box pt="1em">
            <React.Suspense fallback={<MovieIcon />}>
                {!data.posters || data.posters.length === 0 ?
                    <MovieIcon /> :
                    <Poster src={data.posters.sort((a, b) => a.width - b.width)[0].link} />
                }
            </React.Suspense>
        </Box>
        <Box pl="1em">
            <Flex>
                <h1>{data.title}</h1>
            </Flex>
            <Flex
                fontSize="1.2em">
                <b>{data.directors}</b>&nbsp;<i>{data.year}</i>
            </Flex>
            <Flex
                fontSize=".9em">
                <b>{data.stars}</b>
            </Flex>
            <Flex mt="1em">
                <p>
                    {data.plot}
                </p>
            </Flex>
        </Box>
    </Flex>
)