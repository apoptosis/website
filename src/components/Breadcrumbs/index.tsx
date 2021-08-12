
import React from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { CheckMenu } from "@flapper/gatsby-source-flapper/src/ui/"

import { Belt, Link } from '..'

import * as styles from './styles.module.scss'


export const WalkMenu = (menu, asset) => {
    const next = menu.children.find(c => CheckMenu(c, asset.id))
    return next &&
        <>
            <Flex><Link to={next.asset_target}>{next.label}</Link></Flex>
            {WalkMenu(next, asset)}
        </>
}


export const Breadcrumbs = ({ menus, asset }) => {
    const first = menus.main.children.find(c => CheckMenu(c, asset.id))
    const second = first && first.children.find(c => CheckMenu(c, asset.id))
    return (
        <Belt>
            <Box className={styles.crumbs}>
                {second && WalkMenu(second, asset)}
            </Box>
        </Belt>
    )
}
