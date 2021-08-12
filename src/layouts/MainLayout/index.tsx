/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"

import PropTypes from "prop-types"

import { Box  } from "@chakra-ui/layout"

import "@fontsource/fira-mono"

import { Belt } from "../../components/Belt"
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"

import "./styles.scss"


export const MainLayout = ({ context, asset, children, ...props }) => {
    const { menus } = context
    console.log(asset.toc)
    return (
        <>
            <Header menus={menus} asset={asset} title="Apoptosis" />
            <Belt>
                <Box
                    padding="1em 0em"
                    minH="calc(100vh - 109px - 146px)">
                    <main {...props}>
                        {children}
                    </main>
                </Box>
            </Belt>
            <Footer toc={asset.toc} />
        </>
    )
}

MainLayout.propTypes = {children: PropTypes.node.isRequired}


