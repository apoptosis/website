
import * as React from "react"

import { Box } from "@chakra-ui/react"
import { MdxInsert, PostItem } from "@ui"


export const Post = ({context, post}) => {
    return (
        <Box>
            <PostItem post={post} />
            <MdxInsert context={context} asset={post} />
        </Box>
    )
}
