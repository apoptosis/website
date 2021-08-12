import React from "react"

import { Box } from "@chakra-ui/react"


export const p = ({children, ...props}) =>
    <Box className="p" mb="1em" maxW="800px" fontSize="1.2em">
        {children}
    </Box>
