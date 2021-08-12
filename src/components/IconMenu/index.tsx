

import React from 'react'

import { Box } from '@chakra-ui/react'

import * as styles from './styles.module.scss'


export const IconMenu = ({ children, ...props }) => {
    return (
        <Box className={styles.iconMenu} {...props}>
            {children}
        </Box>
    )
}
