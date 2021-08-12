import React from "react"

import {SectionTitle} from "../SectionTitle"
import { PostListing } from ".."


export const ProjectLatestPosts = ({ project }) => {
    if (!project.project_posts) return null
    return <>
        <SectionTitle>latest posts</SectionTitle>
        <PostListing posts={project.project_posts}></PostListing>
    </>
}
