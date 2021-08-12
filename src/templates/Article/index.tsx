
import * as React from "react"

import { MainLayout as Layout } from "@layouts"
import { SiteTemplate } from '@SiteTemplate'
import { Post } from "@ui"


const Article = SiteTemplate(({context, asset}) => {
    return (
        <Layout context={context} asset={asset} >
            <Post context={context} post={asset} />
        </Layout>
    )
})

export default Article