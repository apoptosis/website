import moment from "moment"

import {
    agg_attr,
    agg_fk,
    BindMdx,
    DeriveAggregateType,
    DeriveJoinedType,
    DeriveMultiAggregateType,
    DeriveUnifiedType,
    fk,
    MakeMenu,
    o2m,
    Plan,
    RenderIndex,
    RenderRSS,
    RenderTemplate,
    SetFields,
    SetRelativePath,
    SetUrl,
    Sort,
} from "@flapper/gatsby-source-flapper"
import {
    EnsureOne,
    MatchAndBindMdx,
    SetSpacedTitle,
    SortByName,
    SourceAndBindMdx,
} from "@procs"


const plan: Plan = {
    pages: {
        page: [
            SourceAndBindMdx('content/pages/', ['.mdx']),
            SetRelativePath('content/pages/'),
        ],
    },

    projects: {
        project: [
            MatchAndBindMdx('content/projects/{{category_name}}/{{name}}/index.mdx'),
            SortByName,
        ],
        project_category: [
            DeriveAggregateType('project', 'category_name', 'category'),
            BindMdx(`${process.cwd()}/content/projects/{{name}}/index.mdx`),
            SortByName,
            // sort projects within each category by name
            async (ctx, type, assets) => {
                assets.forEach(category => {
                    category.assets.sort((a, b) => {
                        a = ctx.index.get(a)
                        b = ctx.index.get(b)
                        return a.name.localeCompare(b.name)
                    })
                })
            },
        ],
    },

    project_posts: {
        project_post: [
            MatchAndBindMdx('content/projects/{{category_name}}/{{project_name}}/posts/{{series_name}}/{{part_number}}.mdx'),
            SetSpacedTitle("series_name"),
            SetFields({
                project: fk('project', 'name', 'project_name'),
                category: fk('project_category', 'name', 'category_name'),
            }),
        ],
        project: [
            SetFields({
                project_posts: o2m('project_post', 'project_name', 'name'),
                // let projects override their template
                template: (ctx, asset) => {
                    return asset.template || "src/templates/Project/index.tsx"
                },
            }),

        ],
        project_series: [
            DeriveMultiAggregateType('project_post', 'series', ['series_name', 'project_name'], '{{series_name}}'),
            SetSpacedTitle("name"),
            SetFields({
                'project': agg_fk('project', 'name', 'project_name'),
                'category': agg_fk('project_category', 'name', 'category_name'),
            }),
        ],
    },

    article_content: {
        article: [
            MatchAndBindMdx('content/articles/{{category_name}}/{{series_name}}/{{part_number}}.mdx'),
            SetSpacedTitle("series_name"),
        ],
        article_category: [
            DeriveAggregateType('article', 'category_name', 'category'),
        ],
        article_series: [
            DeriveAggregateType('article', 'series_name', 'series'),
            SetSpacedTitle("name"),
            SetFields({'category_name': agg_attr('category_name')}),
            // grab category_name from first article in series
            (ctx, type, assets) => {
                for (const asset of assets) {
                    const article = ctx.index.get(asset.assets[0])
                    asset.category_name = article.category_name
                }
            },
        ],
    },

    join_post_content: {
        post: [
            DeriveJoinedType('article', 'project_post'),
            Sort((a, b) => a['ctimeMs'] - b['ctimeMs']),
        ],
        post_category: [
            DeriveAggregateType('post', 'category_name', 'category'),
        ],
    },

    targetting_and_menus: {
        page: [
            SetUrl('{{relativePath}}'),
        ],
        project_index: [
            DeriveUnifiedType('project'),
            SetUrl('/projects/'),
            MakeMenu("projects", "main"),
        ],
        project_category: [
            EnsureOne,
            SetUrl('/projects/{{name}}/'),
            MakeMenu("{{name}}_projects", "projects", "{{name}}"),
        ],
        project: [
            SetUrl('/projects/{{category_name}}/{{name}}/'),
            MakeMenu("{{name}}", "{{category_name}}_projects"),
        ],
        project_post: [
            SetUrl('/projects/{{category_name}}/{{project_name}}/posts/{{series_name}}/{{part_number}}'),
            MakeMenu(
                "{{project_name}}_{{series_name}}_{{part_number}}",
                "{{project_name}}_{{series_name}}_series",
                "pt. {{part_number}}"
            ),
            Sort((a, b) => a.stats.ctimeMs - b.stats.ctimeMs),
        ],
        project_series: [
            SetUrl('/projects/{{category_name}}/{{project_name}}/posts/{{name}}/'),
            MakeMenu(
                "{{project_name}}_{{name}}_series",
                "{{project_name}}_posts",
                "{{name}}"
            ),
        ],
        project_post_index: [
            DeriveJoinedType('project'),
            BindMdx('projects/{{name}}/posts/index.mdx'),
            SetUrl('/projects/{{category_name}}/{{name}}/posts/'),
            MakeMenu("{{name}}_posts", "{{name}}", "posts"),
        ],
        article_category: [
            EnsureOne,
            SetUrl('/articles/{{name}}/'),
            MakeMenu("{{name}}_articles", "articles", "{{name}}"),
        ],
        article: [
            SetUrl('/articles/{{category_name}}/{{series_name}}/{{part_number}}'),
            MakeMenu(
                "{{series_name}}_{{part_number}}",
                "{{series_name}}_series",
                "pt. {{part_number}}"
            ),
        ],
        article_series: [
            SetUrl('/articles/{{category_name}}/{{name}}/'),
            MakeMenu(
                "{{name}}_series",
                "{{category_name}}_posts",
                "{{name}}"
            ),
        ],
        post_index: [
            DeriveUnifiedType('post'),
            SetUrl('/posts/'),
            MakeMenu("posts", "main"),
        ],
        post_category: [
            EnsureOne,
            SetUrl('/categories/{{name}}/'),
            MakeMenu("{{name}}_posts", "posts", "{{name}}"),
        ],
    },

    rss: {
        post: [
            RenderRSS("/rss.xml",  {
                title: "Apoptosis",
                description: "Co-edification in tinkering, dialectic and reference",
                feed_url: "/rss.xml",
                site_url: "http://apop.ldlework.com",
                pubDate: moment().toISOString(),
                ttl: 60,
            }, asset => ({
                title: asset.title,
                description: asset.summary,
                url: asset.target,
                categories: [asset.category_name],
                author: [asset.author],
                date: moment(asset.stats.ctimeMs).toISOString(),
            })),
        ],
    },

    indexing: {
        "@": [
            async (ctx) => {
                for (const type of ctx.assets.keys()) {
                    const assets = ctx.assets.get(type)
                    RenderIndex()(ctx, type, assets)
                }
            },
        ],
    },

    writing: {
        page: [
            RenderTemplate('src/templates/MdxPage/index.tsx'),
        ],
        resume: [
            RenderTemplate('src/templates/Resume/index.tsx'),
        ],
        article_series: [
            RenderTemplate('src/templates/ArticleSeries/index.tsx'),
        ],
        article: [
            RenderTemplate('src/templates/Article/index.tsx'),
        ],
        article_category: [
            RenderTemplate('src/templates/ArticleCategory/index.tsx'),
        ],
        project_index: [
            RenderTemplate('src/templates/ProjectIndex/index.tsx'),
        ],
        project_category: [
            RenderTemplate('src/templates/ProjectCategory/index.tsx'),
        ],
        project: [
            RenderTemplate('{{template}}'),
        ],
        project_post_index: [
            RenderTemplate('src/templates/ProjectPostIndex/index.tsx'),
        ],
        project_post: [
            RenderTemplate('src/templates/ProjectPost/index.tsx'),
        ],
        project_series: [
            RenderTemplate('src/templates/ProjectSeries/index.tsx'),
        ],
        post_category: [
            RenderTemplate('src/templates/PostCategory/index.tsx'),
        ],
        post_index: [
            RenderTemplate('src/templates/PostIndex/index.tsx'),
        ],
    },
}

export default plan
