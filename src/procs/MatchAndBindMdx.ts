import { BindMdx, SourceMatchedFiles } from "@flapper/gatsby-source-flapper"


export const MatchAndBindMdx = (path: string) =>
    async (ctx, type, assets) => {
        const procs = [
            SourceMatchedFiles(path),
            BindMdx('{{path}}'),
        ]
        for (const proc of procs) {
            await proc(ctx, type, assets)
        }
    }
