import React from "react"

import { Box } from "@chakra-ui/react"
import { CheckMenu } from "@flapper/gatsby-source-flapper/src/ui/"
import {
    Belt,
    Breadcrumbs,
    Canvas,
    Link,
    Subheader,
    VectorField,
} from "@ui"

import * as styles from "./styles.module.scss"


const HeaderItem = ({ label, path, active }) =>
    <Box className={styles.headerItem}>
        <Link to={path}>
            {label}
        </Link>
        {active && <Box className={styles.marker} />}
    </Box>


export const Header = ({ title, menus, asset }) => {
    return <>
        <Belt className={styles.header}>
            <Box>
                <Box position="absolute" left="0" top="0" h="64px" w="100%" zIndex={-10}>
                    <Canvas>
                        {(ctx, width, height) => <VectorField density={7} ctx={ctx} width={width} height={height} />}
                    </Canvas>
                </Box>

                <HeaderItem label={title || "Title"} path="/" active={false} />

                <Box flexGrow={[2, 2, 1]} />
                {menus.main.children.map(c =>
                    <HeaderItem label={c.label} path={c.asset_target} active={CheckMenu(c, asset.id)} />)}

            </Box>
        </Belt>
        <Subheader menus={menus} asset={asset} />
        <Breadcrumbs menus={menus} asset={asset} />
    </>
}
