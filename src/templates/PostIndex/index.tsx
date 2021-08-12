
import * as React from "react"

import { MainLayout } from "@layouts"
import { SiteTemplate } from '@SiteTemplate'
import { PageTitle, PostListing } from "@ui"


const PostIndex = SiteTemplate(({context, asset}) => {
    return (
        <MainLayout context={context} asset={asset} >
            <PageTitle>Latest Posts</PageTitle>
            <PostListing posts={asset.assets} />
        </MainLayout>
    )
})

export default PostIndex