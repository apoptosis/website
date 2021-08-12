import React from "react"

import { Flex } from "@chakra-ui/react"

import { Link } from ".."

import * as styles from './styles.module.scss'


export const SectionTitle = ({ children, to = undefined}) => {
    return (
        <Flex className={styles.sectionTitle}>
            { to ? <Link to={to}>{children}</Link> : children}
        </Flex>
    )
}
