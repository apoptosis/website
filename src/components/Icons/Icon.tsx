import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Link } from ".."


export const Icon = ({ to, icon, className = undefined }) => {
    const iconElement = <FontAwesomeIcon className={className} icon={icon} />
    if (to)  {
        return (
            <Link to={to}>
                {iconElement}
            </Link>
        )
    } else {
        return iconElement
    }
}
