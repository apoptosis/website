import * as React from "react"

import { MainLayout } from "@layouts"
import { SiteTemplate } from '@SiteTemplate'
import {
    MdxInsert,
    PageTitle,
    ProjectItem,
} from "@ui"


const ProjectCategory = SiteTemplate(({context, asset}) => {
    return <>
        <MainLayout context={context} asset={asset} >
            <PageTitle>{asset.name} projects</PageTitle>
            <MdxInsert context={context} asset={asset} />
            {asset.assets.map(project => <ProjectItem project={project} />)}
        </MainLayout>
    </>
})

export default ProjectCategory