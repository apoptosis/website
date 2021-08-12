import React from "react"

import { Link as GatsbyLink } from "gatsby"

import { Box } from "@chakra-ui/react"

import * as styles from "./styles.module.scss"


export const Link = ({ children, to, ...props }) => {
    const { inline, ...rest } = props
    return <GatsbyLink to={to} className={styles.link} style={{display: inline ? "inline-flex" : "flex"}} >
        <Box>
            <Box {...rest}>{children}</Box>
        </Box>
    </GatsbyLink>
}
