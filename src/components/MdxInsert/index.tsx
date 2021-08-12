import React from "react"

import { MDXRenderer } from "gatsby-plugin-mdx"

import { Box } from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"

import * as shortcodes from "./shortcodes"


export const MdxInsert = ({ context, asset, ...rest }) => {
    const _shortcodes = rest.shortcodes ? { ...shortcodes, ...rest.shortcodes } : shortcodes
    return asset.mdx ? (
        <Box className="mdx" ml="1em">
            <MDXProvider components={_shortcodes}>
                <MDXRenderer context={context} asset={asset}>{asset.mdx.body}</MDXRenderer>
            </MDXProvider>
        </Box>
    ) : null
}