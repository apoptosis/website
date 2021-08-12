import React from "react"

import { Flex } from "@chakra-ui/react"


export const h1 = ({ children, ...rest }) =>
    <Flex 
        alignItems="center"
        mb=".5em" mt="1em"
        className="h1"
        height="2.5em"
        textTransform="uppercase" 
        fontSize="2em" 
        color="white"
        paddingLeft=".8em"
        backgroundColor="black"
        {...rest}
    >
        {children}
    </Flex>