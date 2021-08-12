
import * as React from "react"

import { MainLayout } from "@layouts"
import { SiteTemplate } from '@SiteTemplate'
import {
    MdxInsert,
    ProjectItem,
    ProjectLatestPosts,
} from "@ui"


const Project = SiteTemplate(({context, asset}) => {
    return (
        <MainLayout context={context} asset={asset} >
            <ProjectItem project={asset} />
            <MdxInsert context={context} asset={asset} />
            {asset.project_posts.length > 0 && <ProjectLatestPosts project={asset} />}
        </MainLayout>
    )
})

export default Project