
import React from 'react'

import { Box,Flex } from '@chakra-ui/react'
import { MainLayout } from '@layouts'
import { SiteTemplate } from '@SiteTemplate'
import {
    Anchor,
    Link,
    MdxInsert,
    SectionTitle,
} from '@ui'

import * as styles from "./styles.module.scss"


const Resume = SiteTemplate(({context, asset}) => {
    return (
        <MainLayout context={context} asset={asset} className={styles.resume}>
            <Flex mb="2em">
                <h1>Dustin Lacewell</h1>
                <Box flexGrow={1} />
                <Flex alignItems="start" flexDir="column">
                    <Box width="auto" display="inline-block"><Anchor to="mail:dlacewell@gmail.com">dlacewell@gmail.com</Anchor></Box>
                    <Box display="inline-block"><Link to="https://github.com/dustinlacewell">github.com/dustinlacewell</Link></Box>
                    <Box display="inline-block"><Link to="https://linkedin.com/dustinlacewell">linkedin.com/dustinlacewell</Link></Box>
                </Flex>
            </Flex>
            {asset.assets.map(e =>
                <>
                    <SectionTitle>{e.employer}</SectionTitle>
                    <Flex fontWeight={700}>
                        <Box>{e.position}</Box>
                        <Box flexGrow={1}></Box>
                        <Box>{e.start_year} to {e.end_year}</Box>
                    </Flex>
                    <MdxInsert context={context} asset={e} />
                </>
            )}
        </MainLayout>
    )
})

export default Resume