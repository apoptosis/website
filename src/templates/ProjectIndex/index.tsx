
import * as React from "react"

import { MainLayout } from "@layouts"
import { SiteTemplate } from '@SiteTemplate'
import { PageTitle, ProjectListing } from "@ui"


const ProjectIndex = SiteTemplate(({context, asset}) => {
    return (
        <MainLayout context={context} asset={asset} >
            <PageTitle>Projects</PageTitle>
            <ProjectListing projects={asset.assets} />
        </MainLayout>
    )
})

export default ProjectIndex