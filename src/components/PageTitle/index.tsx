import React from "react"

import { Box } from "@chakra-ui/react"


export const PageTitle = ({ children }) => {
    return (
        <Box position="relative" fontSize="3em" mb=".3em">
            {children}
        </Box>
    )
}

