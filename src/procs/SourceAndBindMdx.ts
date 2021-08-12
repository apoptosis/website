import { BindMdx, SourceFilesRecursively } from "@flapper/gatsby-source-flapper"


export const SourceAndBindMdx = (path: string, extensions: string[] = null) =>
    async (ctx, type, assets) => {
        const procs = [
            SourceFilesRecursively(path, extensions),
            BindMdx('{{path}}'),
        ]
        for (const proc of procs) {
            await proc(ctx, type, assets)
        }
    }
