import React from 'react'

import {PostItem} from '../PostItem'


export const PostListing = ({ posts }) => {
    posts = posts ? posts.sort((a, b) => b.stats.ctimeMs - a.stats.ctimeMs) : []
    return <>
        {posts.map(post => <PostItem post={post} />)}
    </>
}