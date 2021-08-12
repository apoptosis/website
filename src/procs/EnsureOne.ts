import { NewAsset } from "@flapper/gatsby-source-flapper"


export const EnsureOne = (ctx, type, assets) => {
    if (assets.length === 0) {
        assets.push(NewAsset(type, { name: "Generated" }))
    }
}
