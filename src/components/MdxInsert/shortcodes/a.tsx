import React from "react"

import { Link } from "@ui"


export const a = ({ children, ...props }) =>
    <Link to={props.href} inline={true} fontWeight="bold">{children}</Link>
