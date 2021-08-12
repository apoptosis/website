
import * as React from "react"

import { Box } from "@chakra-ui/layout"
import { MainLayout } from "@layouts"
import { SiteTemplate } from '@SiteTemplate'
import {
    MdxInsert,
    ProjectItem,
    ProjectLatestPosts,
} from "@ui"


const Card = SiteTemplate(({context, asset}) => {
    console.log(asset.toc)
    return (
        <MainLayout context={context} asset={asset} >
            <ProjectItem project={asset} />
            <Box className="card-article">
                <MdxInsert context={context} asset={asset} />
            </Box>
            {asset.project_posts.length > 0 && <ProjectLatestPosts project={asset} />}
        </MainLayout>
    )
})

export default Card