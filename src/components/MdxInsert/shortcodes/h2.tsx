import React from "react"

import { Flex } from "@chakra-ui/react"


export const h2 = ({ children, ...rest }) =>
    <Flex 
        className="h2"
        fontSize="1.5em" 
        {...rest}
    >
        {children}
    </Flex>