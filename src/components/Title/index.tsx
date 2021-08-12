import React from "react"

import { Box } from "@chakra-ui/react"

import { Link } from "../Link"


export const Title = ({ children, to = undefined, className = undefined, ...props }) => {
    return (
        <Box fontSize="3em" className={className} {...props} display="inline-block">
            { to !== undefined ? <Link to={to}>{children}</Link> : children }
        </Box>
    )
}
