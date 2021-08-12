import React from 'react'

import _ from 'lodash'

import {ProjectItem} from '../ProjectItem'
import {SectionTitle} from '../SectionTitle'


export const ProjectListing = ({ projects }) => {
    const categories = _.groupBy(projects, project => project.category_name)
    return <>
        {Object.entries(categories).map(([category_name, projects]) => <>
            <SectionTitle to={projects[0].category.target}>{category_name}</SectionTitle>
            {projects.map(project => <ProjectItem project={project} />)}
        </>)}
    </>
}