
import * as React from "react"

import { MainLayout } from "@layouts"
import { SiteTemplate } from '@SiteTemplate'
import {
    MdxInsert,
    PageTitle,
    PostListing,
} from "@ui"


const PostCategory = SiteTemplate(({context, asset}) => {
    return <>
        <MainLayout context={context} asset={asset} >
            <PageTitle>Posts in category <span>{asset.name}</span></PageTitle>
            <MdxInsert context={context} asset={asset}/>
            <PostListing posts={asset.assets} />
        </MainLayout>
    </>
})

export default PostCategory