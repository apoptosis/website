import * as React from "react"

import { MainLayout } from "@layouts"
import { SiteTemplate } from '@SiteTemplate'
import { MdxInsert } from "@ui"


const MdxPage = SiteTemplate(({ context, asset }) => {
    return (
        <MainLayout context={context} asset={asset} >
            <MdxInsert context={context} asset={asset} />
        </MainLayout>
    )
})

export default MdxPage