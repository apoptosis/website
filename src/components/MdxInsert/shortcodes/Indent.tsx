import React from "react"

import { Box } from "@chakra-ui/react"


export const Indent = ({children, ...props}) =>
    <Box ml={props.amount}>{children}</Box>