import * as React from "react"

import { MainLayout } from "@layouts"
import { SiteTemplate } from '@SiteTemplate'
import {
    MdxInsert,
    PageTitle,
    PostListing,
} from "@ui"


const ProjectPostIndex = SiteTemplate(({context, asset}) => {
    return (
        <MainLayout context={context} asset={asset} >
            <PageTitle>{asset.name}'s Latest Posts</PageTitle>
            <MdxInsert context={context} asset={asset} />
            <PostListing posts={asset.project_posts}></PostListing>
        </MainLayout>
    )
})

export default ProjectPostIndex