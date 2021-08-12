import React from "react"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { Icon } from "@ui"


library.add(faBook)

export const BookIcon = ({ to, className = undefined }) => {
    return <Icon icon={['fas', 'book']} to={to} className={className} />
}
