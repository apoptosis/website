import { Sort } from "@flapper/gatsby-source-flapper"


export const SortByName = 
    Sort((a, b) => {
        return a.name.localeCompare(b.name)
    })

