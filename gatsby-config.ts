import path from 'path'

import plan from './gatsby-plan'


const siteMetadata = {
    title: `apop.ldlework.com`,
    description: `Co-edification in tinkering, dialectic and reference`,
    author: `@dlacewell`,
}

const metadata_plugins = [
    'gatsby-plugin-react-helmet',
]

const graphql_plugins = [
    {
        resolve: `gatsby-plugin-graphql-codegen`,
        options: {
            fileName: `./gatsby-graphql.ts`,
            documentPaths: [
                './src/**/*.{ts,tsx}',
            ],
        },
    },
]

const image_plugins = [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
        resolve: "gatsby-plugin-react-svg",
        options: {rule: {include: /content/ }},
    },
]

const style_plugins = [
    `gatsby-plugin-fontawesome-css`,
    'gatsby-plugin-dts-css-modules',
    `@chakra-ui/gatsby-plugin`,
    {
        resolve: 'gatsby-plugin-sass',
        options: {additionalData: `@import "~/src/styles/styles";`},
    },
]

const typescript_plugins = [
    {
        resolve: `gatsby-plugin-alias-imports`,
        options: {
            alias: {
                "@ui": path.resolve(__dirname, 'src/components'),
                "@typedoc": path.resolve(__dirname, 'src/typedoc'),
                "@layouts": path.resolve(__dirname, 'src/layouts'),
                "@SiteTemplate": path.resolve(__dirname, 'src/SiteTemplate'),
                "@templates": path.resolve(__dirname, 'src/templates'),
            },
            extensions: ['ts', 'tsx', 'scss'],
        },
    },
]

const filesystem_plugins = [
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `pages`,
            path: `${__dirname}/content/pages`,
        },
    },
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            name: 'authors',
            path: `${__dirname}/content/authors`,
        },
    },
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            name: 'articles',
            path: `${__dirname}/content/articles`,
        },
    },
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            name: 'projects',
            path: `${__dirname}/content/projects`,
        },
    },
]

const mdx_plugins = [
    {
        resolve: `gatsby-plugin-mdx`,
        options: {
            defaultLayouts: {
                pages: require.resolve("./src/layouts/MainLayout/index.tsx"),
                default: require.resolve("./src/layouts/MainLayout/index.tsx"),
            },
            gatsbyRemarkPlugins: [
                {resolve: `gatsby-remark-copy-linked-files`},
                {
                    resolve: `gatsby-remark-autolink-headers`,
                    options: {isIconAfterHeader: false},
                },
                {resolve: 'gatsby-remark-local-videos'},
                {
                    resolve: `gatsby-remark-images`,
                    options: {maxWidth: 1440},
                },
            ],
        },
    },
]

module.exports = {
    siteMetadata,
    flags: {PARALLEL_SOURCING: false},
    plugins: [
        ...typescript_plugins,
        ...metadata_plugins,
        ...graphql_plugins,
        ...image_plugins,
        ...style_plugins,
        ...filesystem_plugins,
        ...mdx_plugins,
        {
            resolve: "@flapper/gatsby-source-flapper",
            options: { plan },
        },
    ],
}
