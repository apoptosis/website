import React from "react"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { Icon } from "@ui"


library.add(faLink)

export const LinkIcon = ({ to, className = undefined }) => {
    return <Icon icon={['fas', 'link']} to={to} className={className} />
}
