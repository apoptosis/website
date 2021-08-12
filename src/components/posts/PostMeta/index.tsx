

import React from 'react'

import moment from 'moment'

import { Flex } from '@chakra-ui/layout'
import { Tag } from '@ui'

import * as styles from './styles.module.scss'


export const PostMeta = ({ post }) => {
    return <> 
        <Flex className={styles.tags}>
            <Tag>{moment(post.publishDate || post.stats.ctimeMs).format("MMM Do YYYY")}</Tag>
            {post.category && <Tag to={post.category.target}>{post.category.name}</Tag>}
            {post.project && <Tag to={post.project.target}>{post.project.name}</Tag>}
        </Flex>
    </>
}
