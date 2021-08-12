import React from "react"

import { Flex } from "@chakra-ui/layout"
import { CheckMenu } from "@flapper/gatsby-source-flapper/src/ui/"

import { Belt } from "../Belt"
import { Link } from "../Link"

import * as styles from './styles.module.scss'


const SubHeaderItem = ({ label, path, active }) =>
    <Link
        to={path}
        textDecoration={active ? "underline" : "none"}
        lineHeight="1.1em"
        marginLeft="1em">
        {label}
    </Link>


export const Subheader = ({ menus, asset }) => {
    return (
        <Flex className={styles.subheader} alignItems='stretch'>
            <Belt>
                <Flex>
                    {menus.main.children.map(p =>
                        CheckMenu(p, asset.id) && p.children.map(c =>
                            <SubHeaderItem label={c.label} path={c.asset_target} active={CheckMenu(c, asset.id)}/>))}
                </Flex>
            </Belt>
        </Flex>
    )
}
