
import * as React from "react"

import { MainLayout } from "@layouts"
import { SiteTemplate } from '@SiteTemplate'
import { MdxInsert, PostListing } from "@ui"


const ProjectSeries = SiteTemplate(({context, asset}) => {
    return <>
        <MainLayout context={context} asset={asset} >
            <h1>{asset.title} Series</h1>
            <MdxInsert context={context} asset={asset} />
            <PostListing posts={asset.assets} />
        </MainLayout>
    </>
})

export default ProjectSeries