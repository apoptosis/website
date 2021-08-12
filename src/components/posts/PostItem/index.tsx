import React from 'react'

import { Box, Flex } from '@chakra-ui/layout'
import { Link, PostMeta } from '@ui'

import * as styles from './styles.module.scss'


export const PostItem = ({ post }) => {
    return <>{
        <Flex className={styles.post}>
            <Flex className={styles.titleRow}>
                <Link to={post.target}>
                    {post.title}{post.series.assets.length > 1 ? ` Pt. ${post.part_number}` : null}
                </Link>
            </Flex>
            <Box className={styles.summary} >
                {post.summary}
            </Box>
            <PostMeta post={post} />
        </Flex>
    }</>
}