const lost = require('lost')
const pxtorem = require('postcss-pxtorem')

const url = 'https://www.hjf.io'

module.exports = {
	siteMetadata: {
		url,
		siteUrl: url,
		title: "Harry's Tech Blog",
		subtitle: 'Personal development. Tech. Bugs.',
		copyright: '(copyleft) no rights reserved.',
		disqusShortname: '',
		menu: [
			{
				label: 'Posts',
				path: '/',
			},
			{
				label: 'About',
				path: '/about/',
			},
			{
				label: 'Uses',
				path: '/uses/',
			},
		],
		author: {
			name: 'Harry Fitzgerald',
			email: 'harry@hjf.io',
			github: '@hjfitz',
			telegram: '#',
			twitter: '#',
			rss: '/rss.xml',
			vk: '#',
		},
	},
	plugins: [
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/pages`,
				name: 'pages',
			},
		},
		{
			resolve: 'gatsby-plugin-feed',
			options: {
				query: `
					{
						site {
							siteMetadata {
								url
								title
								description: subtitle
							}
						}
					}
				`,
				feeds: [
					{
						serialize: ({query: {site, allMarkdownRemark}}) =>
							allMarkdownRemark.edges.map(edge =>
								Object.assign({}, edge.node.frontmatter, {
									description: edge.node.frontmatter.description,
									date: edge.node.frontmatter.date,
									url: site.siteMetadata.url + edge.node.fields.slug,
									guid: site.siteMetadata.url + edge.node.fields.slug,
									custom_elements: [{'content:encoded': edge.node.html}],
								})),
						query: `
							{
								allMarkdownRemark(
									limit: 1000,
									sort: { order: DESC, fields: [frontmatter___date] },
									filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
								) {
									edges {
										node {
											html
											fields {
												slug
											}
											frontmatter {
												title
												date
												layout
												draft
												description
											}
										}
									}
								}
							}
						`,
						output: '/rss.xml',
					},
				],
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 960,
						},
					},
					{
						resolve: 'gatsby-remark-responsive-iframe',
						options: {wrapperStyle: 'margin-bottom: 1.0725rem'},
					},
					'gatsby-remark-prismjs',
					'gatsby-remark-copy-linked-files',
					'gatsby-remark-smartypants',
				],
			},
		},
		{
			resolve: 'gatsby-plugin-google-fonts',
			options: {
				fonts: ['roboto:400,400i,500,700'],
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-plugin-sitemap',
		// 'gatsby-plugin-offline',
		'gatsby-plugin-catch-links',
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-sass',
			options: {
				postCssPlugins: [
					lost(),
					pxtorem({
						rootValue: 16,
						unitPrecision: 5,
						propList: [
							'font',
							'font-size',
							'line-height',
							'letter-spacing',
							'margin',
							'margin-top',
							'margin-left',
							'margin-bottom',
							'margin-right',
							'padding',
							'padding-top',
							'padding-left',
							'padding-bottom',
							'padding-right',
							'border-radius',
							'width',
							'max-width',
						],
						selectorBlackList: [],
						replace: true,
						mediaQuery: false,
						minPixelValue: 0,
					}),
				],
				precision: 8,
			},
		},
	],
}
