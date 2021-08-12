import React from "react"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Icon } from "@ui"


library.add(faGithub)

export const GithubIcon = ({ to, className = undefined }) => {
    return <Icon icon={['fab', 'github']} to={to} className={className} />
}
