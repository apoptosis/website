import React from 'react'

import { Flex } from '@chakra-ui/layout'
import { Box } from '@chakra-ui/react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import {
    BookIcon,
    GithubIcon,
    IconMenu,
    Link,
    LinkIcon,
} from '@ui'

import * as styles from './styles.module.scss'


library.add(faGithub, faLink)

const ProjectTitle = ({ children }) =>
    <Flex fontSize="3em" fontWeight='700'>
        {children}
    </Flex>

export const ProjectItem = ({ project }) => {
    return (
        <Flex className={styles.projectItem}>
            <Flex>
                <Link to={project.target}>
                    <ProjectTitle>{project.name}</ProjectTitle>
                </Link>
                <Box flexGrow={1} />
                <IconMenu className={styles.iconMenu}>
                    {project.url && <LinkIcon to={project.url} />}
                    {project.docsUrl && <BookIcon to={project.docsUrl} />}
                    {project.githubUrl && <GithubIcon to={project.githubUrl} />}
                </IconMenu>

            </Flex>
            <Box className={styles.summary}>
                {project.summary}
            </Box>
        </Flex>
    )
}
