
import * as React from "react"

import { MainLayout } from "@layouts"
import { SiteTemplate } from '@SiteTemplate'
import {
    MdxInsert,
    PageTitle,
    PostListing,
} from "@ui"


const ArticleCategory = SiteTemplate(({context, asset}) => {
    return <>
        <MainLayout context={context} asset={asset} >
            <PageTitle>Articles in category <span>{asset.name}</span></PageTitle>
            <MdxInsert context={context} asset={asset}/>
            <PostListing posts={asset.assets} />
        </MainLayout>
    </>
})

export default ArticleCategory