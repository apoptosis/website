import { SetTitle } from "@flapper/gatsby-source-flapper"


export const SetSpacedTitle = (source_field: string) =>
    SetTitle(source_field, "title", false)