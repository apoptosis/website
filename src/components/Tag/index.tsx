import React from "react"

import { Box } from "@chakra-ui/react"

import { Link } from "../Link"


export const Tag = (props) => {
    const { children } = props
    return <Box
        display="flex"
        alignItems="stretch"
        position="relative"
        fontWeight="bold"
        textTransform="uppercase"
        borderRadius="3px"
        padding=".3em .5em"
        fontSize=".8em"
        marginLeft=".5em"
        color="white"
        backgroundColor="black">
        {props.to ? <Link to={props.to}>{children}</Link> : children}
    </Box>
}